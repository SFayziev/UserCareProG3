package com.sh.db.service.bill;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.bill.OrderDTO;
import com.sh.db.map.bill.OrderStatus;
import com.sh.db.map.bill.TariffDTO;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by Admin on 15.03.2016.
 */
@Controller
@Transactional
public class OrderDAO extends GenericDaoImpl<OrderDTO> {

    private static final Logger LOG = Logger.getLogger( OrderDAO.class);

    @Autowired
    public OrderDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }


    @Cacheable(value = "orderDTO")
    public List<OrderDTO> getOrderByProjId( Integer projid) {

        return  getOrder(projid, null, null, null);

    }

    private List<OrderDTO> getOrder(Integer projId, Integer tariffid,  Integer status, Date date1){
        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(OrderDTO.class, "od");
        cr.add(Restrictions.eq("projid", projId));
        if (tariffid != null) { cr.add(Restrictions.eq("tariffDTO.id", tariffid));}
        if (status != null) {
            cr.add(Restrictions.eq("status", status));
        } else {
            cr.add(Restrictions.eq("status", OrderStatus.Payed));
        }

        if (date1 != null) {
            cr.add(Restrictions.eq("date1", date1));
        } else {
            cr.add(Restrictions.eq("date1", new Date()));
        }
        return cr.list();
    }


    @Cacheable(value = "orderDTO")
    public OrderDTO getOrderByTariffid( Integer projid, Integer tariffid) {
        List<OrderDTO> orderDTOList = getOrder(projid, tariffid, null, null);

        return orderDTOList.size() == 0 ? null : orderDTOList.get(0);

    }

    @CacheEvict(value = "orderDTO",  allEntries = true)
    public OrderDTO saveOrder(OrderDTO orderDTO) {
        makePersistent(orderDTO);
        return orderDTO;
    }

    @CacheEvict(value = "orderDTO",  allEntries = true)
    public OrderDTO createOrder(Integer projid, TariffDTO tariffDTO){
        OrderDTO orderDTO = getOrderByTariffid(projid, tariffDTO.getId());
         if (orderDTO != null) return orderDTO;
         orderDTO = new OrderDTO(projid, tariffDTO);
         return  saveOrder(orderDTO);
    }

    public TariffDTO getTariffById(final Integer id){
        return (TariffDTO) currentSession().createQuery("from TariffDTO  tf where tf.status=1 and tf.id=:tarid")
                .setParameter("tarid", id).uniqueResult();
    }


}

package com.sh.db.service.bill;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.bill.OrderDTO;
import com.sh.db.map.bill.TariffDTO;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

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


    @Cacheable( value = "orderDTO" )
    public List<OrderDTO> getOrderByProjId(Integer projid){

        return  currentSession().createQuery("from OrderDTO  od where od.projid=:projid")
            .setParameter("projid", projid).list();

    }



    @Cacheable( value = "orderDTO" )
    public OrderDTO getOrderByTariffid(Integer projid, Integer tariffid){
        return (OrderDTO) currentSession().createQuery("from OrderDTO  od where od.projid=:projid and od.tariffid=:tariffid")
                .setParameter("projid", projid)
                .setParameter("tariffid", tariffid)
                .uniqueResult();

    }

    @CacheEvict(value = "orderDTO",  allEntries = true)
    public OrderDTO saveOrder(OrderDTO orderDTO){
        makePersistent(orderDTO);
        return orderDTO;
    }

    @CacheEvict(value = "orderDTO",  allEntries = true)
    public OrderDTO createOrder(Integer projid, TariffDTO tariffDTO){
        OrderDTO orderDTO = getOrderByTariffid(projid, tariffDTO.getId());
         if (orderDTO != null) return orderDTO;
         orderDTO = new OrderDTO(projid, tariffDTO.getId());
         return  saveOrder(orderDTO);
    }

    public TariffDTO getTariffById(final Integer id){
        return (TariffDTO) currentSession().createQuery("from TariffDTO  tf where tf.status=1 and tf.id=:tarid")
                .setParameter("tarid", id).uniqueResult();
    }
}

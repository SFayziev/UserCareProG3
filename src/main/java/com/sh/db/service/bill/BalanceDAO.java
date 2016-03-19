package com.sh.db.service.bill;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.ProjectDTO;
import com.sh.db.map.bill.BalanceDTO;
import com.sh.db.map.bill.InvoiceDTO;
import com.sh.db.map.bill.OrderDTO;
import com.sh.db.map.bill.PaymentDTO;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by Lenovo on 17.03.2016.
 */
@Controller
@Transactional
public class BalanceDAO extends GenericDaoImpl<BalanceDTO> {


    @Value("${default.user.topic.count.in.page}")
    private  Integer defaultRecordsCount;

    @Autowired
    OrderDAO orderDAO;

    private static final Logger LOG = Logger.getLogger( BalanceDAO.class);

    @Autowired
    public BalanceDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    public BalanceDTO getBalance(Integer projid){

        return (BalanceDTO) currentSession().createQuery("from BalanceDTO  bd where bd.projid=:projid")
                .setParameter("projid",projid).uniqueResult();

    };

    public BalanceDTO createBalance(Integer projid){
        BalanceDTO balanceDTO = new  BalanceDTO(projid);
        currentSession().save(balanceDTO);
        return balanceDTO;
    }


    public List<PaymentDTO> getPayments(Integer projid,Integer start){
        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(PaymentDTO.class, "od");
        cr.add(Restrictions.eq("projid", projid));
        cr.setFirstResult(start == 0 ? 0 : start);
        cr.setMaxResults(defaultRecordsCount);
        return  cr.list();

    }

    public List<InvoiceDTO> getInvoice(Integer balanceid, Integer start) {
        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(InvoiceDTO.class, "od");
        cr.add(Restrictions.eq("balanceDTO.id", balanceid));
        cr.setFirstResult(start == 0 ? 0 : start);
        cr.setMaxResults(defaultRecordsCount );
        return  cr.list();

    }

    public InvoiceDTO createInvoice(Integer projid, Date date2){
        BalanceDTO balanceDTO = getBalance(projid);
        if (balanceDTO == null) balanceDTO = createBalance(projid);
        List<OrderDTO> orderDTOList = orderDAO.getOrderByProjId(projid);
        InvoiceDTO invoiceDTO = new InvoiceDTO(balanceDTO, date2);

        for (OrderDTO orderDTO: orderDTOList){

// TODO: math invoice price
        }

        return invoiceDTO;
    }
}

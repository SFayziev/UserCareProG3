package com.sh.db.service.bill;

import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import static org.junit.Assert.*;

/**
 * Created by Lenovo on 15.03.2016.
 */
public class OrderDAOTest extends IntegrationTest {

    @Autowired
    OrderDAO orderDAO;



    @Test
//    @Rollback (false)
    public void testCreateOrder() throws Exception {
        System.out.println(orderDAO.createOrder(2, orderDAO.getTariffById(1)));

    }

    @Test
    public void testGetTariffById() throws Exception {
        System.out.println( orderDAO.getTariffById(2) );
    }
}
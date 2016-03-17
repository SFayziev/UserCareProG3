package com.sh.db.service.bill;

import com.sh.db.map.bill.BalanceDTO;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static org.junit.Assert.*;

/**
 * Created by Lenovo on 18.03.2016.
 */
public class BalanceDAOTest extends IntegrationTest {

    @Autowired
    BalanceDAO balanceDAO;

    @Test
    public void testGetBalance() throws Exception {
        System.out.println(balanceDAO.getBalance(testProjectid));
    }

    @Test
    public void testCreateBalance() throws Exception {
        System.out.println( balanceDAO.createBalance(testProjectid) );
    }

    @Test
    public void testGetPayments() throws Exception {
        System.out.println( balanceDAO.getPayments(testProjectid, 0 ) );
    }

    @Test
    public void testGetInvoice() throws Exception {
        System.out.println( balanceDAO.getInvoice( testProjectid, 0) );
    }

    @Test
    public void testCreateInvoice() throws Exception {
        System.out.println( balanceDAO.createInvoice(testProjectid , new Date()) );
    }
}
package db.controller;

import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;

/**
 * User: Shuhrat Fayziev
 * Date: 6/8/13
 * Time: 1:00 PM
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:resources-test.xml")
@TransactionConfiguration( transactionManager = "transactionManager", defaultRollback = true)
@Transactional
public class IntegrationTest {
    @Resource(name =  "sessionFactory")
    SessionFactory sessionFactory ;

    public  Integer testProjectid=2;

    @Before
    @After
    public void befor(){
        System.out.println(new Date());
    }
}

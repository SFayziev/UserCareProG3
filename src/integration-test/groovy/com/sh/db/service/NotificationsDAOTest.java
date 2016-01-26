package com.sh.db.service;

import com.sh.db.map.ForumDTO;
import com.sh.db.map.NotificationsDTO;
import com.sh.db.map.NotificationsForumDTO;
import db.controller.IntegrationTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import static org.junit.Assert.*;

/**
 * Created by Lenovo on 08.01.2016.
 */
public class NotificationsDAOTest extends IntegrationTest{


    @Autowired
    private NotificationsDAO notificationsDAO;
    @Autowired
    private ForumDAO forumDAO;


    @Test
    @Rollback(false)
    public void testAddnewNotify() throws Exception {
        ForumDTO forumDTO=forumDAO.getForumById(2,1);
        NotificationsDTO notificationsDTO= notificationsDAO.getNotifyByUserId(2,1);
        notificationsDTO.addForumToList(forumDTO.getId());

        notificationsDAO.save(notificationsDTO);

        System.out.println("crete notify" + notificationsDTO );
    }

    @Test
    @Rollback(false)
    public void testgetuserNotifyForums() throws Exception {
        for (NotificationsForumDTO notificationsForumDTO: notificationsDAO.getUserNotifyForums(2,1)){
            System.out.println(notificationsForumDTO );
        }

    }

    @Test
    public  void getNotificationForumList(){
        for (NotificationsForumDTO notificationsForumDTO: notificationsDAO.getNotificationArticleCreatedList(2,2 )){
            System.out.println( notificationsForumDTO.getNotificationsDTO() );

        }


    }
}
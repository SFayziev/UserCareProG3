package com.sh.db.service;

import com.sh.db.map.user.UserDTO;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by shuhrat on 27.09.2015.
 */
public class UserDAOTest extends IntegrationTest{
    @Autowired
    UserDAO userDAO;

    @Test
//    @Rollback(false)
    public void testCreateAvatar() throws Exception {
        System.out.println(System.getProperty("user.home"));
//        userDAO.createAvatar(2 , "C:\\Users\\shuhrat\\IdeaProjects\\UserCare\\grails-app\\assets\\images\\skin\\database_edit.png" );
    }

    @Test
    public void getUserpermission() throws Exception {
        UserDTO userDTO= userDAO.getProjectUserByUsername(2, "admin");
        userDTO.setPosition("admin");
        userDTO.getUserPermissionsDTO().setManager(!userDTO.getUserPermissionsDTO().getManager());
        userDTO.getUserPermissionsDTO().setShowinteamlist(true);
        userDAO.saveUserPermission(userDTO.getUserPermissionsDTO() );

        System.out.println( userDTO.getUserPermissionsDTO() );
    }

    @Test
    public void getUserList() throws Exception {
        userDAO.getUsersList(2, null, null, null, "sh", 0, 0, "").forEach(System.out::println);
    }

    @Test
    public void getUserListByregDate() throws Exception {
        System.out.println("User order by registration Date ");
        userDAO.getUsersList(2, null, null, null, null , 0, 0, "regdate").forEach(System.out::println);
    }

    @Test
    public void getUserListBycomments() throws Exception {
        System.out.println("User order by comments ");
        userDAO.getUsersList(2, null, null, null, null, 0, 0, "bycomment").forEach(System.out::println);
    }


    @Test
    public void getUserListbyReitng() throws Exception {
        System.out.println("User order by raitings  ");
        userDAO.getUsersList(2, null, null, null, null, 0, 0, "byraitings").forEach(System.out::println);
    }


    @Test

    public void createUserAgent(){
        userDAO.createAgentUser(2, "sfshuhrat@mail.ru");


    }


}
package com.sh.db.service;

import com.sh.db.map.UserDTO;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

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
    @Rollback(false)
    public void getUserList() throws Exception {
        for (UserDTO userDTO: userDAO.getUsersList(2,null, null , null, "sh")){
            System.out.println( userDTO);
        }
    }
    @Test
    @Rollback(false)
    public void createUserAgent(){
        userDAO.createAgentUser(2, "fshuhrat@mail.ru");


    }
}
package com.sh.db.service;

import com.sh.db.map.file.ImgDTO;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Lenovo on 15.11.2015.
 */
public class FileDAOTest extends IntegrationTest{

    @Autowired
    FileDAO fileDAO;

    @Test
    public void testGetLocalImage() throws Exception {
        fileDAO.getLocalImageByType(3);
        for (ImgDTO imgDTO : fileDAO.getLocalImageByType(3)){
            System.out.println( imgDTO.getOvalue() );
        }

    }

    @Test
    public void testGetLocalImageByKey() throws Exception {
        System.out.println(fileDAO.getLocalImageByKey(2,"a").getOvalue() );
    }
}
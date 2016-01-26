package com.sh.db.service;

import com.sh.db.map.I18nMessageDTO;
import com.sh.db.map.I18nMessageValueDTO;
import com.sh.db.map.ProjectDTO;
import db.controller.IntegrationTest;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import static org.junit.Assert.*;

/**
 * Created by Admin on 18.11.2015.
 */
public class I18nMessageDAOTest extends IntegrationTest{
    @Autowired
    I18nMessageDAO i18nMessageDAO;
    @Autowired
    ProjectDAO projectDAO;


    @Test
    @Rollback(false)
    public void CreateMassage(){
        ProjectDTO projectDTO=projectDAO.getProjectbyId(2);
        I18nMessageDTO i18nMessageDTO= new I18nMessageDTO("default.doesnt.match.message", projectDTO );
        i18nMessageDAO.saveI18nMessage(projectDTO , i18nMessageDTO);
    }

    @Test
    public void ListMassage(){
    for (I18nMessageDTO i18nMessageDTO: i18nMessageDAO.findAll()){
        System.out.println( i18nMessageDTO);
    }


    }

    @Test
    @Rollback(false)
    public void AddMessageValue(){
        ProjectDTO projectDTO=projectDAO.getProjectbyId(2);
        I18nMessageDTO i18nMessageDTO= projectDTO.getI18nMessages().get( "default.doesnt.match.message");
        I18nMessageValueDTO i18nMessageValueDTO= new I18nMessageValueDTO(i18nMessageDTO,2, "Значение [{2}] поля [{0}] класса [{1}] не соответствует образцу [{3}]" );
        i18nMessageDTO.setI18nMessageValue(i18nMessageValueDTO);
        i18nMessageDAO.saveI18nMessage(projectDTO , i18nMessageDTO);
        for (I18nMessageDTO newi18: projectDTO.getI18nMessageDTOList()){
            for (I18nMessageValueDTO i18nMessageValueDTO1: newi18.getI18nMessageValueDTOs()){
                System.out.println( i18nMessageValueDTO1 );
            }
        }
    }

    @Test
    @Ignore
    public void AddMessageFromFileValue() throws IOException {
        ProjectDTO projectDTO=projectDAO.getProjectbyId(2);
        Integer langid=3;
        File file = new File("C:\\Users\\Admin\\IdeaProjects\\UserCareProj\\grails-app\\i18n\\messages_es.properties");
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
               String val[]= line.split("=");
                if (val.length>1 && val[0].substring(0,1)!= "#" ){
                    I18nMessageDTO i18nMessageDTO= projectDTO.getI18nMessages().get(val[0]);
                    if (i18nMessageDTO== null){
                        i18nMessageDTO= new I18nMessageDTO(val[0],projectDTO );
                        i18nMessageDAO.saveI18nMessage(projectDTO , i18nMessageDTO);
                    }
                    I18nMessageValueDTO i18nMessageValueDTO= new I18nMessageValueDTO(i18nMessageDTO,langid,  val[1] );
                    i18nMessageDTO.setI18nMessageValue(i18nMessageValueDTO);
                    i18nMessageDAO.saveI18nMessage(projectDTO , i18nMessageDTO);

                }
            }
        }

    }
}
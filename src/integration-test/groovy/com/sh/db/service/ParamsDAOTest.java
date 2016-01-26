package com.sh.db.service;

import com.sh.db.map.*;

import db.controller.IntegrationTest;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by Lenovo on 05.11.2015.
 */
public class ParamsDAOTest extends IntegrationTest{
    @Autowired
    ParamsDAO paramsDAO;

    @Autowired
    ModuleDAO moduleDAO;

    @Test
    @Rollback(false)
    public void getPrams(){
        List<ModuleParamsDTO> moduleParamsDTOList = new ArrayList<ModuleParamsDTO>();
        ModuleDTO moduleDTO= moduleDAO.getModuleById(2,52);

//
        ModuleParamsDTO moduleParamsDTO= new ModuleParamsType3DTO(moduleDTO , "title" , "44444444444Privet 55sad sa");
        moduleParamsDTO.setModuleDTO(moduleDTO);
        moduleParamsDTOList.add(moduleParamsDTO);

//        paramsDAO.save(moduleParamsDTO);
        moduleDAO.addModuleParams(2, moduleDTO.getId(), moduleParamsDTOList);

        for (ModuleParamsDTO paramsDTO2: moduleDAO.getModuleById(2,52).getModuleParamDTOList() ){
            System.out.println(paramsDTO2.getValue());

        }

    }


}
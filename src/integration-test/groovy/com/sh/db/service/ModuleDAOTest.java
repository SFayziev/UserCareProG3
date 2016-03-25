package com.sh.db.service;

import com.sh.db.map.*;
import com.sh.utils.ForumType;
import com.sh.utils.ModuleDisplay;
import com.sh.utils.ModulePosType;
import db.controller.IntegrationTest;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

/**
 * Created by Admin on 01.10.2015.
 */
public class ModuleDAOTest extends IntegrationTest {
    @Autowired
    ModuleDAO moduleDAO;

    ModuleDTO moduleDTO1;
    ModuleDTO moduleDTO2;


//    @Before
    public void prepareData(){
         moduleDTO1 = new ModuleDTO();
//        moduleDTO1.setDisplaypos(1);
        moduleDTO1.setStatus(1);

         moduleDTO2 = new ModuleDTO();
//        moduleDTO2.setDisplaypos(0);
        moduleDTO2.setStatus(1);

        moduleDTO1 = moduleDAO.saveModule(moduleDTO1);
        System.out.println("create test widget 1 ");
        System.out.println(moduleDTO1);
        moduleDTO2 = moduleDAO.saveModule(moduleDTO2);
        System.out.println("create test widget 2 ");
        System.out.println(moduleDTO2);

    }




    @Test
    public void testSwapPos() throws Exception {
        System.out.println("widget 1 pos " + moduleDTO1.getPos() );
//        moduleDAO.s .swapPos(moduleDTO1, moduleDTO2);
        System.out.println("widget 1 pos after swaping  " + moduleDTO1.getPos());
    }

    @Test
    public void testGetWidgetById() throws Exception {
        System.out.println( moduleDAO.getModuleById(2 , moduleDTO1.getId() ) );
    }



    @Test
    public void testGetModuleParams() throws Exception {
        for(String val: moduleDAO.getModuleById(2,50).getParams().keySet() ){
            System.out.println(val );
        }
    }

    @Test
    public void testGetModuleTypebyDispos(){
        for (ModuleTypeDTO moduleTypeDTO:moduleDAO.getModuleType(ModulePosType.Mini )){
            System.out.println(moduleTypeDTO );
        }

    }


    @Test
//    @Rollback(false)
    public void testdelModule(){
        moduleDAO.delete(moduleDAO.getModuleById(2,276));

    }
    @Test
//    @Rollback(false)
    public void createModule(){
        ModuleDTO module=moduleDAO.getModuleById(0,1);
        module.getModuleParamDTOList().add(new ModuleParamsType1DTO(module, "maxRecords", 10));
        module.getModuleParamDTOList().add(new ModuleParamsType3DTO( module, "filtertype" , "filterUserStats"));
        moduleDAO.saveModule(module);

    }
}
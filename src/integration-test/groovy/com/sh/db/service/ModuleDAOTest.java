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
import sun.security.pkcs11.Secmod;

/**
 * Created by Admin on 01.10.2015.
 */
public class ModuleDAOTest extends IntegrationTest {
    @Autowired
    ModuleDAO moduleDAO;

    ModuleDTO moduleDTO1;
    ModuleDTO moduleDTO2;


    @Before
    public void prepareData(){
        moduleDTO1 = moduleDAO.getModuleById(testProjectid, 67);
        moduleDTO2 = moduleDAO.getModuleById(testProjectid, 68);

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

    @Test
    public void testGetModuleLinksDTObyModuleId() throws Exception {
        ModuleLinkDTO moduleLinkDTO = new ModuleLinkDTO(moduleDTO1.getId(), "dsdsds" , "sd sd s", true);
        moduleDAO.saveModuleLinksDTO(moduleLinkDTO);
        System.out.println( moduleDAO.getModuleLinksDTObyModuleId(moduleLinkDTO.getModid() )  );

    }



    @Test
    public void testGetModuleLinksDTObyId() throws Exception {
        ModuleLinkDTO moduleLinkDTO = new ModuleLinkDTO(moduleDTO1.getId(), "dsdsds" , "sd sd s", true);
        moduleDAO.saveModuleLinksDTO(moduleLinkDTO);
        System.out.println( moduleDAO.getModuleLinksDTObyId(moduleLinkDTO.getModid(), moduleLinkDTO.getId() )  );

    }

    @Test
    public void testDeleteModuleLinksDTO() throws Exception {
        ModuleLinkDTO moduleLinkDTO = new ModuleLinkDTO(moduleDTO1.getId(),  "dsdsds" , "sd sd s", true);
        moduleDAO.saveModuleLinksDTO(moduleLinkDTO);
        moduleDAO.deleteModuleLinksDTO(moduleLinkDTO.getModid(), moduleLinkDTO.getId());

    }

    @Test
    public void testSaveModuleLinksDTO() throws Exception {

        ModuleLinkDTO moduleLinkDTO= new ModuleLinkDTO(moduleDTO1.getId(),  "dsdsds" , "sd sd s", true);
        moduleDAO.saveModuleLinksDTO(moduleLinkDTO);

    }
}
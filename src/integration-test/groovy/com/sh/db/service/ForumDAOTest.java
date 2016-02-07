package com.sh.db.service;

import com.sh.db.map.*;
import com.sh.utils.ForumType;
import com.sh.utils.ModuleDisplay;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Lenovo on 22.11.2015.
 */
public class ForumDAOTest extends IntegrationTest{

    @Autowired
    ForumDAO forumDAO;

    @Autowired
    ModuleDAO moduleDAO;

    @Autowired
    ProjectDAO projectDAO;

    @Test
  @Rollback(false)
    public void testCreateForum() throws Exception {
        ProjectDTO projectDTO= projectDAO.getProjectbyId(6);
        forumDAO.createForum(projectDTO, ForumType.Community, "test ");
    }

    @Test
    public void getForumType(){
        ForumTypeDTO forumTypeDTO3= new ForumTypeDTO(2,"test");

        forumDAO.saveForumType(forumTypeDTO3);

        for (ForumTypeDTO forumTypeDTO: forumDAO.getForumTypeByForumid(2,2,-1)){
            System.out.println(forumTypeDTO);
        }
    }

    @Test
//    @Rollback(false)
    public void getForumTypeByid(){
        forumDAO.delTypeStatusDTOs(2,2,1 );
        ForumStatusDTO forumStatusDTO= forumDAO.getForumStatusByid(2,21,true);
        ForumTypeDTO forumTypeDTO3= forumDAO.getForumTypeByid(2, 1);
        ForumTypeStatusDTO forumTypeStatusDTO=new ForumTypeStatusDTO(2, forumStatusDTO , forumTypeDTO3, "Test:  3" );
        forumTypeDTO3.addTypeStatusDTO(forumTypeStatusDTO);

        forumDAO.saveForumType(forumTypeDTO3);

        List<ForumStatusDTO> forumStatusDTOs= forumDAO.getForumStatusByForumId(2, 2 );
       for (ForumStatusDTO forumStatusDTO1:forumTypeDTO3.markIsinType(forumStatusDTOs)  ){
           System.out.println( forumStatusDTO1);
           System.out.println( forumStatusDTO1.getArticleStatusDTO().getIsInForumType());

       }
    }

    @Test
    public void getForumStatus(){
        ForumStatusDTO forumStatusDTO= new ForumStatusDTO(2, forumDAO.getArticleStatusById(2,2,2) );
        forumDAO.saveForumStatus(forumStatusDTO);
        for (ForumStatusDTO forumStatusDTO1: forumDAO.getForumStatusByForumId(2, 4)){
            System.out.println(forumStatusDTO1);
        }
    }



    @Test
    @Rollback(false)
    public void testDelCategoryById() throws Exception {
        forumDAO.delCategoryById(2,13);

    }
}
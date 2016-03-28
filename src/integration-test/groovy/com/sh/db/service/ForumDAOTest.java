package com.sh.db.service;

import com.sh.db.map.forum.TopicTypeDTO;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.map.topics.ArticleStatusDTO;
import com.sh.utils.ForumType;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

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
//  @Rollback(false)
    public void testCreateForum() throws Exception {
        ProjectDTO projectDTO = projectDAO.getProjectbyId(testProjectid) ;
        forumDAO.createForum(projectDTO, ForumType.Community, "test ");
    }

    @Test
    public void getForumType() {
        TopicTypeDTO topicTypeDTO3 = new TopicTypeDTO(2, "test");

        forumDAO.saveForumType(topicTypeDTO3);

        for (TopicTypeDTO topicTypeDTO: forumDAO.getForumTypeByForumid(2, 2, -1)) {
            System.out.println(topicTypeDTO);
        }
    }




    @Test
    @Rollback(false)
    public void testDelCategoryById() throws Exception {
        forumDAO.delCategoryById(2,13);

    }

    @Test
     public  void getArticleStatusByTopicTypeId(){
        for(ArticleStatusDTO articleStatusDTO: forumDAO.getArticleStatusByTopicTypeId(testProjectid, 2,null )){
            System.out.println( articleStatusDTO );
        }

     }
//    @Test
//    public void testgetForumType() throws Exception {
//        forumDAO.getForumbyType( )
//
//    }
}
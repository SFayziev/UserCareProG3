package com.sh.db.service;

import com.sh.db.map.CategoriesDTO;
import com.sh.db.map.ForumDTO;
import com.sh.utils.ForumType;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by shuhrat on 23.09.2015.
 */
public class CategoriesDAOTest  extends IntegrationTest {
@Autowired
ForumDAO forumDAO;

    @Test
    public void testGetCategoryByType() throws Exception {
        for(CategoriesDTO categoriesDTO: forumDAO.getCategoryByForumId(2, 2)){
            System.out.println(categoriesDTO);
        }
    }

    @Test
    public void testGetCategoryWithArticle() throws Exception {
        CategoriesDTO categoriesDTO = forumDAO.getCategoryById(2,1);
     }

    @Test
    public void testGetForumById() throws Exception {
        System.out.println(forumDAO.getForumById(2, 1));
    }

    @Test
    public void testGetForumbyType() throws Exception {
        for (ForumDTO forumDTO: forumDAO.getForumbyType(2, ForumType.Community)){
            System.out.println(forumDTO);
            for (CategoriesDTO categoriesDTO: forumDAO.getCategoryByForumId(2,2)){
                System.out.println(categoriesDTO);
            }

        }
    }



}
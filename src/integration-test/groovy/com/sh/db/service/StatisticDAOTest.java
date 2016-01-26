package com.sh.db.service;

import com.sh.db.map.ArticleDTO;
import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import static org.junit.Assert.*;

/**
 * Created by shuhrat on 28.09.2015.
 */
public class StatisticDAOTest extends IntegrationTest{

    @Autowired
    StatisticDAO statisticDAO;
        @Autowired
    ArticleDAO articleDAO;


    @Test
    @Rollback(false)
    public void testArticleChange() throws Exception {
        ArticleDTO articleDTO= articleDAO.getArticle(2,150);
        statisticDAO.increaseArticleComments(articleDTO );
        statisticDAO.increaseArticleVotes(articleDTO);
        statisticDAO.increaseArticleViews(articleDTO);
        statisticDAO.increaseForumArticles(articleDTO.getForumDTO());
        statisticDAO.decreaseForumArticles(articleDTO.getForumDTO());
    }
}
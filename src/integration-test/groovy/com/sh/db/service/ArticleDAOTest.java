package com.sh.db.service;

import com.sh.db.map.*;

import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.forum.TopicTypeStatusDTO;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.topics.CommentDTO;
import com.sh.utils.ForumType;
import db.controller.IntegrationTest;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by shuhrat on 27.08.2015.
 */
public class ArticleDAOTest extends IntegrationTest{
    @Autowired
    ArticleDAO articleDAO;

     @Autowired
     ForumDAO forumDAO;


//    @Test
////    @Rollback(false)
//    public void getArticleUser(){
//        ArticleDTO articleDTO= articleDAO.find(151);
//        System.out.println(articleDTO.getUserDTO());
//        System.out.println(articleDTO.getType());
//        articleDTO.getArticleStatsDTO().votesPlus();
//        articleDTO= articleDAO.save(articleDTO);
//        System.out.println(articleDTO.getArticleStatsDTO());
//    }

    @Test
    public void getLastArticle(){
        int topicTypeid=3 ;
        int forumid=2 ;
        System.out.println(ForumType.Community.ordinal());

        List<ForumDTO> forumDTOs = forumDAO.getForumbyProject(testProjectid);

        ItemCount rowCount = articleDAO.getLastArticleRecCount(testProjectid, -1, topicTypeid , -1, forumDTOs , -1, -1);

        List<TopicTypeStatusDTO> topicTypeStatusDTOs=forumDAO.getTopicTypeStatusByTopicId(testProjectid, topicTypeid);

        System.out.println("Active topics : " +  rowCount.getActiveTopic());
        System.out.println("Closed topic: " + rowCount.getClosedTopic());
        System.out.println("Unmarked topic: " + rowCount.getUnmarkedTopic());


        System.out.println("All: " +  rowCount.getCountByStatus(-1 ));
        System.out.println("New: " + rowCount.getCountByStatus(0));
        for(TopicTypeStatusDTO topicTypeStatusDTO: topicTypeStatusDTOs ){
            System.out.println("Status  " +  topicTypeStatusDTO.getArticleStatusDTO().getName() + "  : " +  rowCount.getCountByStatus(topicTypeStatusDTO.getArticleStatusDTO().getId() )   );
        }
//        System.out.println("Status 1: " + rowCount.getCountByStatus(1));
//        System.out.println("Status 2: " + rowCount.getCountByStatus(2));
//        System.out.println("Status 3: " + rowCount.getCountByStatus(3));
//        System.out.println("Status 4: " + rowCount.getCountByStatus(4));
//        System.out.println("Status 5: " + rowCount.getCountByStatus(5));
//        System.out.println("Status 6: " + rowCount.getCountByStatus(6));


        System.out.println("All: " +  rowCount.getCountByType(-1));
        System.out.println("New: " + rowCount.getCountByType(0));
        System.out.println("Type 1: " + rowCount.getCountByType(1));
        System.out.println("Type 2: " + rowCount.getCountByType(2));
        System.out.println("Type 3: " + rowCount.getCountByType(3));
        System.out.println("Type 4: " + rowCount.getCountByType(4));
        System.out.println("Type 5: " + rowCount.getCountByType(5));
        System.out.println("Type 6: " + rowCount.getCountByType(6));

//        for( ItemStatDTO itemStatDTO: rowCount.getItemStatDTOList()) {
//
//            System.out.println("rowCounts : " + itemStatDTO.getCount());
//        }
    }

//    @Test
//    @Rollback(false)
//    public void getProjectArticle(){
//        ArticleDTO articleDTO= articleDAO.getArticle(2,150);
//        System.out.println(articleDTO.getArticleStatsDTO());
//
//    }

//    @Test
//    @Rollback(false)
//    public void ArticleVote(){
//        ArticleStatsDTO articleStatsDTO =articleDAO.articleVote(151, 3, "admin", "127.0.0.2");
//        articleDAO.articleVote(151, -3, "admin", "127.0.0.2");
//        articleDAO.articleVote(151, 0, "admin", "127.0.0.1");
//        System.out.println(articleStatsDTO );
//    }

    @Ignore
//    @Test
   public void Commentvote(){
       System.out.println(articleDAO.commentVote(460, 3, "admin", "127.0.0.2"));
//       articleDAO.delArticleComment(articleDAO.getCommentbyId(460) );

    }


    @Test
    public void getComment(){
        for(CommentDTO commentDTO: articleDAO.getArticleComments(150)){
            System.out.println( commentDTO);
        }
    }


    @Test
    public void testFindTextInArticle() throws Exception {
        for(ArticleDTO articleDTO:articleDAO.findTextInArticle(2, "sso", 2, ForumType.Community, 5, null)){
            System.out.println(articleDTO.getTitle());
        }
    }

    @Test
    public void testAddtags(){
        articleDAO.addTagtoArticle(2,665,1);

    }

    @Test
    public void testGetCommentbyUserId() throws Exception {
        System.out.println("count : " +  articleDAO.getCommentbyUserCounts(2,2) );

        for(CommentDTO commentDTO:articleDAO.getCommentbyUserId(2,2,0,4)){
            System.out.println( commentDTO );
        }
    }

    @Test
    public void testMoveToArticle() throws Exception {
        ArticleDTO articleDTO= articleDAO.getArticle(6, 672);
        articleDAO.moveToArticle(articleDTO, 38,1,0);

    }
}
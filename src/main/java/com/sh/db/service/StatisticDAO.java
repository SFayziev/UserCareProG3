package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.*;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

/**
 * Created by Admin on 28.09.2015.
 */
@Controller
@Transactional
public class StatisticDAO extends GenericDaoImpl<ArticleDTO> {
    @Autowired
    ForumDAO forumDAO;

    @Autowired
    ArticleDAO articleDAO;

    private static final Logger LOG = Logger.getLogger(StatisticDAO.class);

    private final int pageRecords=10;


    @Autowired
    public StatisticDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }


    protected Integer increaseProject(Integer projid, String column, Integer val){
        return  currentSession().createQuery("update ProjectStatsDTO as ps set ps." + column + "=ps." + column + "+" + val + " where ps.id=:projid")
                .setParameter("projid", projid).executeUpdate();
    }

    protected Integer increaseArticle(Integer articid, String column, Integer val){
        return  currentSession().createQuery("update ArticleDTO as ps set ps." + column + "=ps." + column + "+" + val + " where ps.id=:articid")
                .setParameter("articid", articid).executeUpdate();
    }
    protected Integer increaseForum(Integer forumid, String column, Integer val){
        return  currentSession().createQuery("update ForumDTO as ps set ps." + column + "=ps." + column + "+" + val + " where ps.id=:forumid")
                .setParameter("forumid", forumid).executeUpdate();
    }

    public Integer increaseArticleComments(ArticleDTO articleDTO ){
        increaseProjectComments( articleDTO.getProjid() );
        increaseForumComments(articleDTO.getForumDTO());
        return  increaseArticle(articleDTO.getId(), "comments", 1);


    }
    public Integer decreaseArticleComments(ArticleDTO  articleDTO ){
        decreaseProjectComments(articleDTO.getProjid());
        decreaseForumComments(articleDTO.getForumDTO());
        return  increaseArticle(articleDTO.getId(), "comments", -1);
    }
    public Integer increaseArticleVotes(ArticleDTO  articleDTO){
        increaseProjectVotes(articleDTO.getProjid());
        increaseForumVotes(articleDTO.getForumDTO());
        return  increaseArticle(articleDTO.getId(), "votes", 1);
    }
    public Integer decreaseArticleVotes(ArticleDTO  articleDTO ){
        decreaseProjectVotes(articleDTO.getProjid());
        decreaseForumVotes( articleDTO.getForumDTO() );
        return  increaseArticle(articleDTO.getId(), "votes", -1);
    }
    public Integer increaseArticleViews(ArticleDTO  articleDTO){  return  increaseArticle(articleDTO.getId(), "views", 1); }
    public Integer increaseArticleFollowers(Integer articid){  return  increaseArticle( articid, "followers", 1); }
    public Integer decreaseArticleFollowers(Integer articid ){return  increaseArticle(articid, "followers", -1);}

    public Integer increaseProjectUser(Integer projid ){  return  increaseProject(projid, "people", 1); }
    public Integer decreaseProjectUser(Integer projid ){return  increaseProject(projid, "people", -1);}
    public Integer increaseProjectComments(Integer projid ){  return  increaseProject(projid, "comments", 1); }
    public Integer decreaseProjectComments(Integer projid ){return  increaseProject(projid, "comments", -1);}
    public Integer increaseProjectVotes(Integer projid ){  return  increaseProject(projid, "votes", 1); }
    public Integer decreaseProjectVotes(Integer projid ){return  increaseProject(projid, "votes", -1);}
    public Integer increaseProjectArticles(Integer projid ){  return  increaseProject(projid, "articles", 1 ); }
    public Integer decreaseProjectArticles(Integer projid ){return  increaseProject(projid, "articles", -1 );}

    public Integer increaseForumComments(ForumDTO forumDTO ){  return  increaseForum(forumDTO.getId(), "comments", 1); }
    public Integer decreaseForumComments(ForumDTO forumDTO ){return  increaseForum(forumDTO.getId(), "comments", -1);}
    public Integer increaseForumVotes(ForumDTO forumDTO ){  return  increaseForum(forumDTO.getId(), "votes", 1); }
    public Integer decreaseForumVotes(ForumDTO forumDTO ){return  increaseForum(forumDTO.getId(), "votes", -1);}
    public Integer increaseForumArticles(ForumDTO forumDTO ){
        increaseProjectArticles(forumDTO.getProjectDTO().getId());
        return  increaseForum(forumDTO.getId(), "articles", 1);
    }
    public Integer decreaseForumArticles(ForumDTO forumDTO ){
        decreaseProjectArticles(forumDTO.getProjectDTO().getId());
        return  increaseForum(forumDTO.getId(), "articles", -1 );
    }




}

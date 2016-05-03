package com.sh.db.bl;

import com.sh.db.map.ItemCount;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.topics.CommentDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.service.ArticleDAO;
import com.sh.db.service.ForumDAO;
import com.sh.db.service.StatisticDAO;
import com.sh.utils.exception.N18IErrorCodes;
import com.sh.utils.exception.N18iException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Admin on 26.04.2016.
 */
@Component
public class ArticleBL {

    @Autowired
    private PermissionBL permissionBL;

    @Autowired
    private ArticleDAO articleDAO;

   @Autowired
   private ForumBL forumBL;

    @Autowired
    private StatisticDAO statisticDAO;



    public List<ArticleDTO> getArticleList(ProjectDTO project, final Integer[] forumids,  HashMap params) {

        List<ForumDTO> forumDTOList=forumBL.getForumByIds(project.getId(), forumids);
        return articleDAO.getArticleList(project, forumDTOList, params);
    }

    public ItemCount getLastArticleRecCount(ProjectDTO project, final Integer[] forumids, HashMap params, Boolean forcache) {
        List<ForumDTO> forumDTOList=forumBL.getForumByIds(project.getId(), forumids);
        return articleDAO.getLastArticleRecCount(project, forumDTOList, params, true);
    }

    public ArticleDTO toggleNeedreview(Integer projid, Integer articleId) {
        ArticleDTO articleDTO = articleDAO.getArticle(projid, articleId);
        articleDTO.toggleNeedreview();
        return articleDAO.saveArticle(articleDTO,articleDTO.getForumDTO().getId() );

    }

    public boolean followArticle(Integer projid, Integer articid) throws N18iException {
        UserDTO userDTO = null;
        try {
            userDTO = permissionBL.getCurrentLoggedUser();
        } catch (Exception ignored) {
        }

        if (userDTO == null) throw new N18iException(projid, N18IErrorCodes.AJAX_YOU_MUST_SIGNIN);
        return articleDAO.followArticle(projid, articid, userDTO);

    }

    public Boolean isfollow(Integer articid) throws N18iException {
        UserDTO userDTO = null;
        try {
            userDTO = permissionBL.getCurrentLoggedUser();

        } catch (Exception ignored) {
        }
        if (userDTO == null) return false;

        return  articleDAO.isfollow(articid, userDTO);
    }


    public ArticleDTO saveArticle(ArticleDTO articleDTO) {
        ForumDTO forumDTO = articleDTO.getForumDTO();
        if (articleDTO.getId() == null) {
            articleDTO.setUserDTO(permissionBL.getCurrentLoggedUser());
            statisticDAO.increaseForumArticles(articleDTO.getProjid(),  forumDTO);
        }
        return  articleDAO.saveArticle(articleDTO, forumDTO.getId() );
    }

    @Transactional
    public CommentDTO saveArticleComment(CommentDTO commentDTO){
        commentDTO.setUserDTO(permissionBL.getCurrentLoggedUser());
        commentDTO.getArticleDTO().setUpdatedUserDTO(permissionBL.getCurrentLoggedUser());
        return  articleDAO.saveArticleComment(commentDTO);
    }
}
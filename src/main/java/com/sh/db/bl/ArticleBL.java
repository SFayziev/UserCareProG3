package com.sh.db.bl;

import com.sh.db.map.ItemCount;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.service.ArticleDAO;
import com.sh.db.service.ForumDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Admin on 26.04.2016.
 */
@Component
public class ArticleBL {

    @Autowired
    PermissionBL permissionBL;

    @Autowired
    ArticleDAO articleDAO;

    @Autowired
    ForumBL forumBL;


    public final List<ArticleDTO> getArticleList(final ProjectDTO project, final Integer[] forumids, final HashMap params) {
        return articleDAO.getArticleList(project, forumBL.getForumByIds(project.getId(), forumids), params);
    }

    public ItemCount getLastArticleRecCount(ProjectDTO project, final Integer[] forumids, HashMap params, Boolean forcache) {
        return articleDAO.getLastArticleRecCount(project, forumBL.getForumByIds(project.getId(), forumids), params, true);
    }
}

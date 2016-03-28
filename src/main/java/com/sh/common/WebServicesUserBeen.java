package com.sh.common;

import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.NotificationsDTO;
import com.sh.db.map.NotificationsForumDTO;
import com.sh.db.service.NotificationsDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Lenovo on 10.01.2016.
 */
public class WebServicesUserBeen {
    private static final Logger LOG = Logger.getLogger(WebServicesUserBeen.class);

    @Autowired
    NotificationsDAO notificationsDAO;
// Notification

    public NotificationsDTO getNotifyByUserId(Integer projid,  Integer userid){return notificationsDAO.getNotifyByUserId(projid, userid );}
    public NotificationsForumDTO changeNotifyUserForum(Integer projid, Integer userid, Integer forumid  ){ return notificationsDAO.changeNotifyUserForum( projid, userid, forumid);}
    public void addnotifyUserForum(Integer projid, Integer userid, Integer forumid ){notificationsDAO.addnotifyUserForum(projid, userid, forumid);}
    public List<ArticleDTO> getUserFollowsArticles(Integer projid,Integer  userid) {return notificationsDAO.getUserFollowsArticles(projid, userid);}
    public List<NotificationsForumDTO> getUserNotifyForums(Integer projid, Integer userid) {return  notificationsDAO.getUserNotifyForums(projid, userid);}
    public NotificationsDTO saveNotificationsDTO(NotificationsDTO notificationsDTO){ return  notificationsDAO.saveNotificationsDTO( notificationsDTO);}
}

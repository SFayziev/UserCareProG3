package com.sh.messaging.amqp;

import com.sh.db.map.*;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.service.*;
import org.apache.log4j.Logger;
import org.grails.web.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Lenovo on 10.01.2016.
 */

@Component
public class TopicListener  extends MassageListenerImpl{

    private static final Logger LOG = Logger.getLogger(TopicListener.class);

    private String topicCreatedUrl="/messaging/topicCreated/";
    private String topicUpdatedUrl="/messaging/topicUpdated/";
    private String topicMergedUrl="/messaging/topicMerged/";
    private String commentCreatedUrl="/messaging/commentCreated/";

    @Autowired
    ArticleDAO articleDAO;

    @Autowired
    ForumDAO forumDAO;


    public void onCommentCreated (String message) {
        try {
            JSONObject resultJson = new JSONObject(message);

            Integer projoid=resultJson.getInt("projectid");
            ProjectDTO projectDTO=projectDAO.getProjectbyId(projoid);
            if (projectDTO==null){
                LOG.error("project not found " + projoid);
                return;
            }
            Integer forumid=resultJson.getInt("forumid");
            Integer commentid=resultJson.getInt("commentid");

            Integer topicid=resultJson.getInt("topicid");
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);

            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid );
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleCreatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(commentCreatedUrl, projectDTO, commentid , notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(getNoreplayEmailAddress(projectDTO), userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }


    public void onCreated (String message) {
        try {
            JSONObject resultJson = new JSONObject(message);

            Integer projoid=resultJson.getInt("projectid");
            ProjectDTO projectDTO=projectDAO.getProjectbyId(projoid);
            if (projectDTO==null){
                LOG.error("project not found " + projoid);
                return;
            }
            Integer forumid=resultJson.getInt("forumid");
            Integer topicid=resultJson.getInt("topicid");

            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid );
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleCreatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicCreatedUrl, projectDTO, topicid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(getNoreplayEmailAddress(projectDTO), userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }





    public void onUpdated (String message) {
        try {
            JSONObject resultJson = new JSONObject(message);

            Integer projoid=resultJson.getInt("projectid");
            ProjectDTO projectDTO=projectDAO.getProjectbyId(projoid);
            if (projectDTO==null){
                LOG.error("project not found " + projoid);
                return;
            }
            Integer forumid=resultJson.getInt("forumid");
            Integer topicid=resultJson.getInt("topicid");
            Integer commentid=resultJson.getInt("commentid");

            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid);
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleUpdatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicUpdatedUrl, projectDTO, commentid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(getNoreplayEmailAddress(projectDTO), userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }

    public void onMerged (String message) {
        try {
             JSONObject resultJson = new JSONObject(message);

            Integer projoid=resultJson.getInt("projectid");
            ProjectDTO projectDTO=projectDAO.getProjectbyId(projoid);
            if (projectDTO==null){
                LOG.error("Project not found " + projoid);
                return;
            }
            Integer forumid=resultJson.getInt("forumid");
            Integer topicid=resultJson.getInt("topicid");
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid);
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleMergedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicMergedUrl, projectDTO, topicid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(getNoreplayEmailAddress(projectDTO), userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }





}

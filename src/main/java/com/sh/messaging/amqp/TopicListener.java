package com.sh.messaging.amqp;

import com.sh.db.map.*;
import com.sh.db.service.*;
import groovy.transform.AutoClone;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.grails.web.json.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lenovo on 10.01.2016.
 */

@Component
public class TopicListener  {

    @Value("${domain.main.url}")
    String domainUrl;

    @Value("${domain.protocol}")
    String domainProtocol;


    @Value("${email.noreply.address}")
    String emailNoreplay;

    String topicCreatedUrl="/messaging/topicCreated/";
    String topicUpdatedUrl="/messaging/topicUpdated/";
    String topicMergedUrl="/messaging/topicMerged/";
    String commentCreatedUrl="/messaging/commentCreated/";


    @Autowired
    private AmqpTemplate template;

    private static final Logger LOG = Logger.getLogger(TopicListener.class);
    @Autowired
    NotificationsDAO notificationsDAO;

    @Autowired
    ProjectDAO projectDAO;

    @Autowired
    UserDAO userDAO;

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
            String fromEmail=emailNoreplay+ "@"+ projectDTO.getAlias()+"."+ domainUrl;

            Integer topicid=resultJson.getInt("topicid");
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);

            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid );
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleCreatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(commentCreatedUrl, projectDTO, commentid , notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(fromEmail, userDTO.getEmail(), subject , emailContent );
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
            String fromEmail=emailNoreplay+ "@"+ projectDTO.getAlias()+"."+ domainUrl;
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid );
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleCreatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicCreatedUrl, projectDTO, topicid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(fromEmail, userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }


    private  String getEmailTemplate(String partUrl, ProjectDTO projectDTO, Integer contentcid,  Integer userid) throws IOException {
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            List<NameValuePair> arguments = new ArrayList();
            arguments.add(new BasicNameValuePair("charset", "utf-8"));
            arguments.add(new BasicNameValuePair("userid", ""+userid));
            arguments.add(new BasicNameValuePair("id", "" + contentcid));
            HttpPost post = new HttpPost(domainProtocol+ "://" + projectDTO.getAlias() +"."+ domainUrl + partUrl) ;
            post.addHeader("content-type", "application/x-www-form-urlencoded; charset=utf-8");
            post.setEntity(new UrlEncodedFormEntity(arguments, "utf-8"));
            // use httpClient (no need to close it explicitly)

            HttpResponse response = null;
            response  =httpClient.execute(post);
            if (response.getStatusLine().getStatusCode()!=HttpStatus.SC_OK ){
                LOG.error("get status " + response.getStatusLine().getStatusCode());
                return null;
            }
            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            return result.toString();

        } catch (IOException e) {
            LOG.error(e.getMessage());
        }
        return null;

    }

    private void sendEmailtoAmqp(String from , String to, String subject, String emailText  ){
        JSONObject resultJson = new JSONObject();
        resultJson.put("from",from);
        resultJson.put("to",to);
        resultJson.put("subject", subject);
        resultJson.put("text", emailText );
        template.convertAndSend("mail.send", resultJson.toString());
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
            String fromEmail=emailNoreplay+ "@"+ projectDTO.getAlias()+"."+ domainUrl;
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid);
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleUpdatedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicUpdatedUrl, projectDTO, commentid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(fromEmail, userDTO.getEmail(), subject , emailContent );
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
            String fromEmail=emailNoreplay+ "@"+ projectDTO.getAlias()+"."+ domainUrl;
            ArticleDTO articleDTO=articleDAO.getArticle(projoid, topicid);
            ForumDTO forumDTO=forumDAO.getForumById(projoid, forumid);
            String subject = "[" + projectDTO.getName()+" / " + forumDTO.getName() +"  ]  " + articleDTO.getTitle() ;

            for ( NotificationsForumDTO notificationsForumDTO: notificationsDAO .getNotificationArticleMergedList(projoid, forumid)){
                UserDTO userDTO=userDAO.getProjectUserByid(projoid, notificationsForumDTO.getNotificationsDTO().getUserid());
                if (userDTO== null) continue;
                String emailContent=getEmailTemplate(topicMergedUrl, projectDTO, topicid, notificationsForumDTO.getNotificationsDTO().getUserid() );

                if (emailContent!= null){
                    sendEmailtoAmqp(fromEmail, userDTO.getEmail(), subject , emailContent );
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }

    public void sendTopicAmqpCommand(String command, Integer projid , Integer forumid, Integer topicid ){
        template.convertAndSend(command, toJson(projid, forumid, topicid, null) );
    }

    public void sendCommentAmqpCommand(String command, Integer projid , Integer forumid, Integer topicid, Integer commentid ){
        template.convertAndSend(command, toJson(projid, forumid, topicid, commentid) );
    }
    private String toJson(Integer projid , Integer forumid, Integer topicid, Integer commentid){
        JSONObject resultJson = new JSONObject();
        resultJson.put("projectid",projid);
        resultJson.put("forumid",forumid);
        resultJson.put("topicid",topicid);
        if (commentid!=null)  resultJson.put("commentid",commentid);
        return resultJson.toString();
    }



}

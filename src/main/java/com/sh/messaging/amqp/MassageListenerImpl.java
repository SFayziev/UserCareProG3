package com.sh.messaging.amqp;

import com.sh.db.map.ProjectDTO;
import com.sh.db.service.NotificationsDAO;
import com.sh.db.service.ProjectDAO;
import com.sh.db.service.UserDAO;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.grails.web.json.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Admin on 11.03.2016.
 */
public class MassageListenerImpl extends MailListener {
    private static final Logger LOG = Logger.getLogger(TopicListener.class);


    @Value("${domain.main.url}")
    String domainUrl;

    @Value("${domain.protocol}")
    String domainProtocol;


    @Value("${email.noreply.address}")
    String emailNoreplay;

    @Autowired
    private AmqpTemplate template;

    @Autowired
    NotificationsDAO notificationsDAO;

    @Autowired
    ProjectDAO projectDAO;

    @Autowired
    UserDAO userDAO;



    public String getNoreplayEmailAddress(final ProjectDTO projectDTO) {
        return projectDTO.getName() + " <" + emailNoreplay+ "@"+ projectDTO.getAlias()+"."+ domainUrl + ">" ;
    }

    public   String getEmailTemplate(String partUrl, ProjectDTO projectDTO, Integer contentcid,  Integer userid) throws IOException {
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            List<NameValuePair> arguments = new ArrayList();
            arguments.add(new BasicNameValuePair("charset", "utf-8"));
            arguments.add(new BasicNameValuePair("userid", ""+ userid));
            arguments.add(new BasicNameValuePair("id", "" + contentcid));
            HttpPost post = new HttpPost(domainProtocol + "://" + projectDTO.getAlias() +"."+ domainUrl + partUrl) ;
            post.addHeader("content-type", "application/x-www-form-urlencoded; charset=utf-8");
            post.setEntity(new UrlEncodedFormEntity(arguments, "utf-8"));
            // use httpClient (no need to close it explicitly)

            HttpResponse response = null;
            response  = httpClient.execute(post);
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK ) {
                LOG.error("get status " + response.getStatusLine().getStatusCode());
                return null;
            }
            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            StringBuilder result = new StringBuilder();
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

    public void sendEmailtoAmqp(String from, String to, String subject, String emailText  ) {
        JSONObject resultJson = new JSONObject();
        resultJson.put("from", from);
        resultJson.put("to", to);
        resultJson.put("subject", subject);
        resultJson.put("text", emailText);
        template.convertAndSend("mail.send", resultJson.toString());
    }

    public void sendTopicAmqpCommand(String command, Integer projid , Integer forumid, Integer topicid ) {
        template.convertAndSend(command, toJson(projid, forumid, topicid, null) );
    }

    public void sendCommentAmqpCommand(String command, Integer projid , Integer forumid, Integer topicid, Integer commentid ){
        template.convertAndSend(command, toJson(projid, forumid, topicid, commentid) );
    }

    private String toJson(Integer projid , Integer forumid, Integer topicid, Integer commentid) {
        JSONObject resultJson = new JSONObject();
        resultJson.put("projectid", projid);
        resultJson.put("forumid", forumid);
        resultJson.put("topicid", topicid);
        if (commentid != null)  resultJson.put("commentid", commentid);
        return resultJson.toString();
    }

}

package com.sh.messaging;

import com.sh.messaging.amqp.AmqpConstants;
import db.controller.IntegrationTest;
import org.apache.commons.io.IOUtils;
import org.grails.web.json.JSONObject;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.util.Date;

/**
 * Created by Admin on 29.12.2015.
 */
public class rabbitMGTest extends IntegrationTest {

    @Autowired private AmqpAdmin admin;

    @Autowired
    private AmqpTemplate template;

    @Test
    @Ignore
    public void simpleProducerConsumerTest() {
        try {
            String sent = "Catch the rabbit! " + new Date();
            template.convertAndSend("mail.send", "Message # " + 1 +" on "+ new Date());// send

        } catch (AmqpException e) {
            Assert.fail("Test failed: " + e.getLocalizedMessage());
        }
    }

    @Ignore
    @Test
    public void amqpSendEmailTest() {
        Resource resource = new ClassPathResource("emailtemplate.htm");
        String theString="";
//          resource.getFile()

        try {
            System.out.println(resource.getFile());
            InputStream in= new FileInputStream(resource.getFile());
            StringWriter writer = new StringWriter();
            IOUtils.copy(in, writer);
            theString = writer.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }


        JSONObject resultJson = new JSONObject();
        resultJson.put("from","feedback@feedback.usercare.info");
        resultJson.put("to","fayziev.shuhrat@gmail.com");
        resultJson.put("subject", "amqp Test");
        resultJson.put("text", theString );
        template.convertAndSend("mail.send", resultJson.toString());


    }

    @Test
    public void testTopicCreated() throws Exception {
        JSONObject resultJson = new JSONObject();
        resultJson.put("projectid",2);
        resultJson.put("forumid",2);
        resultJson.put("topicid",158);

        template.convertAndSend(AmqpConstants.TOPICCREATED, resultJson.toString() );
        template.convertAndSend(AmqpConstants.TOPICUPDATED, resultJson.toString() );
        template.convertAndSend(AmqpConstants.TOPICMERGED, resultJson.toString());

    }
}

package com.sh.messaging.amqp;

import org.apache.log4j.Logger;

import org.grails.web.json.JSONObject;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Lenovo on 07.01.2016.
 */
@Component
public class MailListener implements MessageListener {
    private static final Logger LOG = Logger.getLogger(MailListener.class);

    @Autowired
    @Qualifier("mailSender")
    private JavaMailSender mailSender;

    public void onMessage(Message message) {

        System.out.println(new String(message.getBody()) );
        MimeMessage emessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;

        try {
            JSONObject resultJson = new JSONObject(new String(message.getBody()));
            helper = new MimeMessageHelper(emessage, true);
            helper.setFrom(resultJson.getString("from"));
            helper.setTo(resultJson.getString("to"));
            helper.setSubject(resultJson.getString("subject"));
            helper.setText(resultJson.getString("text"), true);
            mailSender.send(emessage);

        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }


}

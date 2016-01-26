package com.sh.db.service;

import db.controller.IntegrationTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Created by Admin on 12.10.2015.
 */

public class MailSendTest extends IntegrationTest{

    @Autowired
    JavaMailSender mailSender;

    @Test
    public void sendTest() throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("feedback@usercare.info");
        helper.setTo("fshuhrat@mail.ru");
        helper.setSubject("test");
        helper.setText("test text ");
        mailSender.send(message);

    }
}

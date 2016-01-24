package com.sh.messaging;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

/**
 * Created by Admin on 29.12.2015.
 */
public class MailSender  implements Messanger {
    private static final Logger LOG = Logger.getLogger(MailSender.class);


//    @Value("${content.email.address}")
    private  String from;

    private JavaMailSender mailSender;
    private SimpleMailMessage simpleMailMessage;

//    private MailSender mailSender;

    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String from, String to, String subject, String msg, String attachmentFile) {

        if (from!=null && !from.equals("") ){
            this.from=from;
        }
//        SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(this.from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(msg);
            if (attachmentFile !=  null ){
                File f = new File(attachmentFile);
                if (f.exists()) {

                    FileSystemResource file = new FileSystemResource(attachmentFile);
                    helper.addAttachment(file.getFilename(), file);
                }
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        mailSender.send(message);


    }

    @Override
    public void send(String from, String to, String subject, String msg) {
        sendMail(from, to,subject, msg, null);
        LOG.info("send message: to  " + to + "  with text'" + msg );
    }

    @Override
    public void send(String from, String to, String subject, String msg, String attachmentFile) {
        sendMail(from, to,subject, msg, attachmentFile);
        LOG.info("send message: to  " + to + "  with text'" + msg);
    }
}
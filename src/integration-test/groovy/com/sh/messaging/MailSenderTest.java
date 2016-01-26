package com.sh.messaging;

import db.controller.IntegrationTest;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;
import java.util.Locale;
import java.util.Properties;

import static org.junit.Assert.*;

/**
 * Created by Admin on 29.12.2015.
 */
public class MailSenderTest extends IntegrationTest{

   @Autowired
    MailSender mailSender;

    @Test
//    @Ignore
    public void testSendMail() throws Exception {
        mailSender.send("feedback@usercare.info" , "fshuhrat@mail.ru" , "test" , "test message ");

    }

    @Test
    public void testResiveMail() throws Exception {
        // mail server connection parameters
        String host = "usercare.info";
        String user = "feedback";
        String password = "olim";

        // connect to my pop3 inbox
        Properties properties = System.getProperties();
        Session session = Session.getDefaultInstance(properties);
        Store store = session.getStore("imap");
        store.connect(host, user, password);

        Folder inbox = store.getFolder("INBOX");
        inbox.open(Folder.READ_ONLY);

        // get the list of inbox messages
        Message[] messages = inbox.getMessages();

        if (messages.length == 0) System.out.println("No messages found.");

        for (int i = 0; i < messages.length; i++) {
            // stop after listing ten messages
            if (i > 100) {
                System.exit(0);
                inbox.close(true);
                store.close();
            }

            System.out.println("Message " + (i + 1));
            System.out.println("From : " + messages[i].getFrom()[0]);
            System.out.println("Subject : " + messages[i].getSubject());
            System.out.println("Sent Date : " + messages[i].getSentDate());
            System.out.println();
        }

        inbox.close(true);
        store.close();


    }


}
package com.sh.messaging;

/**
 * User: Shuhrat Fayziev
 * Date: 8/5/13
 * Time: 4:43 PM
 */
public interface Messanger {

    public void send(String from, String to, String subject, String msg);
    public void send(String from, String to, String subject, String msg, String attacjmentFile);

}

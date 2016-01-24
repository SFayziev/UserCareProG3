package com.sh.messaging.amqp;

import org.grails.web.json.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * Created by Lenovo on 10.01.2016.
 */
public class AmqpEvents {


    private AmqpTemplate template;

    public AmqpEvents(AmqpTemplate template) {
        this.template=template;
    }


    public void topicUpdated(Integer projid, Integer forumid, Integer topicid ){
        topicEvent(AmqpConstants.TOPICUPDATED, projid, forumid,topicid);// send
    }

    public void topicCreated(Integer projid, Integer forumid, Integer topicid ){
        topicEvent(AmqpConstants.TOPICCREATED, projid, forumid, topicid);// send
    }

    private void topicEvent( String event,  Integer projid, Integer forumid, Integer topicid ){
        JSONObject resultJson = new JSONObject();
        resultJson.put("projid",projid);
        resultJson.put("forumid",forumid);
        resultJson.put("topicid", topicid);
        template.convertAndSend(event , resultJson.toString());// send
    }

}

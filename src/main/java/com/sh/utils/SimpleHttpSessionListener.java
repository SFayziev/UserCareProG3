package com.sh.utils; /**
 * Created by shuhrat on 26.08.2015.
 */

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.*;
import java.util.Enumeration;


/**
 * Used to track when HTTP sessions come and go.
 */
public class SimpleHttpSessionListener implements HttpSessionListener{

    public void sessionCreated( final HttpSessionEvent event )
    {
        final HttpSession session = event.getSession();

        System.out.println(String.format("HTTP session {%s} has just been created with an isNew value of {%s}. ", session.getId(),  session.isNew() ));
        final Enumeration names = session.getAttributeNames();
        while( names.hasMoreElements() )
        {
            final String name = (String)names.nextElement();
            final Object value = session.getAttribute( name );
            System.out.println(String.format("HTTP session {%s} has attribute {%s}:{%s}.", session.getId(), name, value));
        }
    }

    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {

    }


}

package com.sh.common;

import com.sh.db.map.project.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Admin on 10.12.2015.
 */
class AuthenticationProcessingFilter extends UsernamePasswordAuthenticationFilter {
    @Autowired
    WebServicesSessionSpringBean webServicesSessionSpringBean;

    protected  Boolean storeLastUsername=false;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        ProjectDTO project;
        try {
            project= webServicesSessionSpringBean.getProject(response, request , request.getSession() );
            if (project== null) {             throw new AuthenticationServiceException("Project  not supported: " );
            }
            else {
                String username = obtainUsername(request);
                String password = obtainPassword(request);

                if (username == null) {
                    username = "";
                }

                if (password == null) {
                    password = "";
                }

                username = project.getAlias() +"/"+ username.trim();

                UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

                // Allow subclasses to set the "details" property
                setDetails(request, authRequest);

                return this.getAuthenticationManager().authenticate(authRequest);

            }



        } catch (IOException e) {
            e.printStackTrace();
        }


        return  null;

    }


}
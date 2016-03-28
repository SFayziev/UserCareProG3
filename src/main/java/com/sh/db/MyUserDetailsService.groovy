package com.sh.db

import com.sh.db.map.project.ProjectDTO
import com.sh.db.map.user.UserDTO
import com.sh.db.service.ProjectDAO
import com.sh.db.service.UserDAO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.transaction.annotation.Transactional

/**
 * Created by shuhrat on 12.02.2015.
 */
@Transactional
public class MyUserDetailsService implements  UserDetailsService{

    @Autowired
    UserDAO userDAO;
    @Autowired
    ProjectDAO projectDAO;

    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        SecurityContextHolder.getContext().getAuthentication().gets
        String[] sl= s.split("/")

        ProjectDTO projectDTO= projectDAO.getbyAlias(sl[0])
        if ((sl.length<2) || (projectDTO== null)) return  null;

        UserDTO user = userDAO.getProjectUserByUsername(projectDTO.id,  sl[1] )
        if (user != null) {
            Collection<GrantedAuthority> a = new ArrayList<GrantedAuthority>();
            if (user.getUserPermissionsDTO().manager) a.add(new SimpleGrantedAuthority("ROLE_MANAGER"));
            if (user.getUserPermissionsDTO().manageusers) a.add(new SimpleGrantedAuthority("ROLE_MANGEUSERS"));
            if (user.getUserPermissionsDTO().assignperformers) a.add(new SimpleGrantedAuthority("ROLE_ASSIGNPERFORMERS"));
            if (user.getUserPermissionsDTO().chatoperator) a.add(new SimpleGrantedAuthority("ROLE_CHATOPERATOR"));
            if (user.getUserPermissionsDTO().deletefeedback) a.add(new SimpleGrantedAuthority("ROLE_DELETEFEEDBACK"));
            if (user.getUserPermissionsDTO().editfeedback) a.add(new SimpleGrantedAuthority("ROLE_EDITFEEDBACK"));
            if (user.getUserPermissionsDTO().feedbacktags) a.add(new SimpleGrantedAuthority("ROLE_FEEDBACKTAG"));
            if (user.getUserPermissionsDTO().managefeedback) a.add(new SimpleGrantedAuthority("ROLE_MANAGEFEEDBACK"));
            if (user.getUserPermissionsDTO().moderation) a.add(new SimpleGrantedAuthority("ROLE_MODERATION"));
            if (user.getUserPermissionsDTO().payforproject) a.add(new SimpleGrantedAuthority("ROLE_PAYPROJECT"));
//            if (user.getUserPermissionsDTO().manageusers) a.add(new SimpleGrantedAuthority("manageusers"));

            boolean enabled = user.status == 1;
            boolean accountNonExpired = true;
            boolean credentialsNonExpired = true;
            boolean accountNonLocked = true;

            UserDetails userDetails = new User(s, user.password , enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, a);
            return userDetails;
        }
        else {
            return null;
        }

    }


}
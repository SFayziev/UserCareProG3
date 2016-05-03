package com.sh.db.bl;

import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.map.user.UserGrandAuthority;
import com.sh.db.map.user.UserPermissionsDTO;
import com.sh.db.service.UserDAO;
import com.sh.utils.exception.N18IErrorCodes;
import com.sh.utils.exception.N18iException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Admin on 26.04.2016.
 */
@Component
public class PermissionBL {

    @Autowired
    private UserDAO userDAO;

    public UserDTO getCurrentLoggedUser(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.isEnabled()){
            String[] sl= user.getUsername().split("/");
            if ((sl.length<2)) return  null;
            return userDAO.getUser(sl[1], sl[0] );

        }
        return null;
    }
    public boolean checkGrandAuthority(String authority) {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(authority);
        Collection<? extends GrantedAuthority> grantedAuthorities = userDAO.getCurrentUserAuthority();
        return grantedAuthorities != null && grantedAuthorities.contains(simpleGrantedAuthority);

    }


    public List<ForumDTO> checkForumListPrivacy(List<ForumDTO> forumDTOList ) {
        List<ForumDTO> forumDTOList2 = new ArrayList<>();
        for (ForumDTO forumDTO: forumDTOList) {
            try {
                if (checkForumPrivacy(forumDTO)) {
                    forumDTOList2.add(forumDTO);
                }
            } catch (N18iException ignored) {
            }
        }
        return forumDTOList2;
    }


    public Boolean checkForumPrivacy(ForumDTO forumDTO) throws  N18iException {
        if (forumDTO==null) return false;
        if(isForumPublic(forumDTO)) return true;
        if ( checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER ) ) return true;
        UserDTO userDTO = getCurrentLoggedUser();
        if (forumDTO == null) return  false;
        if (forumDTO.getPrivacy().getType() == 1 ) {
            if (userDTO != null) {
                return true;
            } else {
                throw new N18iException(N18IErrorCodes.FORUM_PRIVATE);
            }

        }  else {
            return true;
        }
    }

    /**
     * Check forum to public
     * @param forumDTO
     * @return
     */
    private Boolean isForumPublic(ForumDTO forumDTO){
        return forumDTO.getPrivacy().getType()==0;
    }


    @Transactional
    public UserDTO createAgentUser(Integer projid,  String email) {
        UserDTO curuser= getCurrentLoggedUser();
        if (curuser.getUserPermissionsDTO().getManager()) {
            UserDTO userDTO=userDAO.getUserByEmail(projid, email );
            if (userDTO== null) {userDTO= new UserDTO(email);}
            userDTO.setUsertype(1);
            return userDAO.saveProfile(userDTO);
        }
        return null;
    }



    public UserPermissionsDTO saveUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception {
        if ( (checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER )  || checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER ) )){
            userDAO.save(userPermissionsDTO);
            return userPermissionsDTO;
        }
        else {
            throw new Exception("You don't have permission " );
        }

    }


    public void  deleteUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception {
        if (checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER )  || checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER )){
            userDAO.delete(userPermissionsDTO);
        } else {   throw new Exception("You don't have permission " );  }
    }

    public UserDTO getCurrentUser() {
        return getCurrentLoggedUser();
    }
}

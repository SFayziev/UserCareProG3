package com.sh.db.bl;

import com.sh.db.map.NotificationsDTO;
import com.sh.db.map.NotificationsForumDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.map.user.UserGrandAuthority;
import com.sh.db.service.NotificationsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Admin on 03.05.2016.
 */
@Component
public class NotificationsBL  {
    @Autowired
    private PermissionBL permissionBL;

    @Autowired
    NotificationsDAO notificationsDAO;

    public NotificationsForumDTO changeNotifyUserForum(Integer projid, Integer userid, Integer forumid  ){
        UserDTO userDTO=permissionBL.getCurrentLoggedUser();
        if (userDTO!= null && ((userDTO.getId()==userid) || (permissionBL.checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER ) ))){
           return notificationsDAO.changeNotifyUserForum(projid, userid, forumid);

        }
        return null;
    }

    public void addnotifyUserForum(Integer projid, Integer userid, Integer forumid ){
        UserDTO userDTO=permissionBL.getCurrentLoggedUser();

        if (userDTO!= null && ((userDTO.getId()==userid) || (permissionBL.checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER )))){
             notificationsDAO.addnotifyUserForum(projid, userid, forumid);
        }


    }
}

package com.sh.db.bl;

import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.forum.ForumSpamProtectionDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.service.ForumDAO;
import com.sh.utils.ForumType;
import com.sh.utils.exception.N18IErrorCodes;
import com.sh.utils.exception.N18iException;
import org.apache.http.client.HttpResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Lenovo on 20.04.2016.
 */
@Component
public class ForumBL {

    ForumDAO forumDAO;

    @Autowired
    public ForumBL(ForumDAO forumDAO ) {
        this.forumDAO = forumDAO;
    }

    public ForumDTO getForumById(Integer projid, Integer forumid, ForumType forumType ) throws  N18iException {
        return  checkForumPrivicy(forumDAO.getForumById(projid, forumid, forumType));
    }

    public ForumDTO getForumById(Integer projid, Integer forumid ) throws  N18iException {
        return  checkForumPrivicy(forumDAO.getForumById(projid, forumid));
    }

    private ForumDTO checkForumPrivicy(ForumDTO forumDTO) throws  N18iException {
        UserDTO userDTO = forumDAO.getCurrentLoggedUser();
        if (forumDTO == null) return  forumDTO;
        if (forumDTO.getPrivacy().getType() == 1 ) {
            if (userDTO != null) {
                return forumDTO;
            } else {
                throw new N18iException(N18IErrorCodes.FORUM_PRIVATE);

            }

        }  else {
            return forumDTO;
        }
    }

    public boolean canAddNewTopic(Integer projid, Integer forumid){
        UserDTO userDTO = forumDAO.getCurrentLoggedUser();
        ForumSpamProtectionDTO forumSpamProtectionDTO=forumDAO.getForumSpamProtectionById(projid, forumid,0);
        if (forumSpamProtectionDTO.getSanonymousfeedback()) {
            return true;
        } else if (userDTO !=  null ) {
            return true;
        }

        return false;
    }

}

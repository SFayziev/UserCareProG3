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

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lenovo on 20.04.2016.
 */
@Component
public class ForumBL {

    @Autowired
    private PermissionBL permissionBL;

    private ForumDAO forumDAO;

    @Autowired
    public ForumBL(ForumDAO forumDAO ) {
        this.forumDAO = forumDAO;
    }

    public ForumDTO getForumById(Integer projid, Integer forumid, ForumType forumType ) throws  N18iException {
        ForumDTO forumDTO = forumDAO.getForumById(projid, forumid, forumType);
        return  permissionBL.checkForumPrivacy(forumDTO)? forumDTO:null;
    }

    public List<ForumDTO> getForumByIds(Integer projid, Integer[] forumids)  {
        List<ForumDTO> forumDTOs= forumDAO.getForumByIds(projid,  forumids);
        return  permissionBL.checkForumListPrivacy( forumDTOs);
    }
    public ForumDTO getForumById(Integer projid, Integer forumid ) throws  N18iException {
        ForumDTO forumDTO=forumDAO.getForumById(projid, forumid);
        return  permissionBL.checkForumPrivacy(forumDTO)? forumDTO : null;
    }

    public List<ForumDTO> getForumbyType(Integer projid, ForumType forumType  ) {
        return permissionBL.checkForumListPrivacy( forumDAO.getForumbyType(projid, forumType));
    }

    public List<ForumDTO> getForumbyProject(Integer projid ) {
        return permissionBL.checkForumListPrivacy( forumDAO.getForumbyProject(projid));
    }

    public boolean canAddNewTopic(Integer projid, Integer forumid) {
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

package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.*;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.utils.ForumType;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Lenovo on 08.01.2016.
 */
@Controller
@Transactional
public class NotificationsDAO  extends GenericDaoImpl<NotificationsDTO> {

    private static final Logger LOG = Logger.getLogger(NotificationsDTO.class);
    @Autowired
    private ForumDAO forumDAO;

    @Autowired
    public NotificationsDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    public NotificationsDTO getNotifyByUserId(Integer projid,  Integer userid){
        NotificationsDTO notificationsDTO= (NotificationsDTO) currentSession().createQuery("from NotificationsDTO nd where nd.userid=:userid")
                .setParameter("userid", userid).uniqueResult();
        if (notificationsDTO==null){
            notificationsDTO= new NotificationsDTO(userid );
        }
        return  notificationsDTO;
    }

    public NotificationsDTO saveNotificationsDTO(NotificationsDTO notificationsDTO){
        return  save(notificationsDTO);
    }
    public NotificationsForumDTO changeNotifyUserForum(Integer projid, Integer userid, Integer forumid  ){
        NotificationsForumDTO notificationsForumDTO = (NotificationsForumDTO) currentSession().createQuery(" from NotificationsForumDTO nt where nt.forumid=:forumid and nt.notificationsDTO.userid=:userid  ")
                .setParameter("userid", userid).setParameter("forumid", forumid)
                .uniqueResult();
        if (notificationsForumDTO== null ){
            notificationsForumDTO= new NotificationsForumDTO( forumid, getNotifyByUserId(projid, userid) );
        }
        notificationsForumDTO.setEnabled(! notificationsForumDTO.getEnabled());
        currentSession().saveOrUpdate(notificationsForumDTO);
        return notificationsForumDTO;
    }

    public void addnotifyUserForum(Integer projid, Integer userid, Integer forumid ){
        NotificationsDTO notificationsDTO= getNotifyByUserId(projid, userid);
        notificationsDTO.addForumToList(forumid);
        save(notificationsDTO);
    }

    public List<NotificationsForumDTO> getUserNotifyForums(Integer projid, Integer userid){
        List<ForumDTO> forumDTOList=forumDAO.getForumbyProject(projid);
        NotificationsDTO notificationsDTO=getNotifyByUserId(projid, userid);
        if (notificationsDTO.getNotificationsForumDTOList().size() >= forumDTOList.size() ) return notificationsDTO.getNotificationsForumDTOList();
        for(ForumDTO forumDTO:forumDTOList ){

            if ((forumDTO.getType()!= ForumType.Community)&& (forumDTO.getType()!= ForumType.Knowledgebase) ) continue;

            boolean find =false;
            for(NotificationsForumDTO notificationsForumDTO:notificationsDTO.getNotificationsForumDTOList()){
                if (forumDTO.getId()==notificationsForumDTO.getForumid()){
                    find=true;
                }
            }
            if(!find) notificationsDTO.getNotificationsForumDTOList().add(new NotificationsForumDTO(forumDTO.getId(),notificationsDTO ));
        }
        notificationsDTO= save(notificationsDTO);
        return notificationsDTO.getNotificationsForumDTOList();

    }


    public List<ArticleDTO> getUserFollowsArticles(Integer projid, Integer  userid){
        return  currentSession().createQuery("from ArticleDTO where projid=:projid and id in (select fd.articleid from FollowDTO fd where fd.userid=:userid  ) ")
                .setParameter("projid", projid).setParameter("userid", userid)
                .list();

    }

    public List<NotificationsForumDTO> getNotificationArticleCreatedList(Integer projid , Integer forumid ){
        return  currentSession().createQuery("from NotificationsForumDTO  as nf where nf.enabled=true and forumid=:forumid  and  nf.notificationsDTO.commentcreated=true")
        .setParameter("forumid", forumid).list();
    }

    public List<NotificationsForumDTO> getNotificationArticleUpdatedList(Integer projid , Integer forumid ){
        return  currentSession().createQuery("from NotificationsForumDTO  as nf where nf.enabled=true and forumid=:forumid  and  nf.notificationsDTO.statuschanged =true")
                .setParameter("forumid", forumid).list();
    }

    public List<NotificationsForumDTO> getNotificationArticleMergedList(Integer projid , Integer forumid ){
        return  currentSession().createQuery("from NotificationsForumDTO  as nf where nf.enabled=true and forumid=:forumid  and  nf.notificationsDTO.topicmerged =true")
                .setParameter("forumid", forumid).list();
    }


}

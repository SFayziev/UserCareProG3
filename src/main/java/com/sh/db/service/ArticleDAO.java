package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.*;
import com.sh.db.map.forum.CategoriesDTO;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.forum.TopicTypeDTO;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.map.topics.*;
import com.sh.db.map.user.UserDTO;
import com.sh.messaging.amqp.AmqpConstants;
import com.sh.messaging.amqp.TopicListener;
import com.sh.utils.ForumType;
import com.sh.utils.IpConvertor;

import com.sh.utils.SearchField;
import com.sh.utils.exception.N18IErrorCodes;
import com.sh.utils.exception.N18iException;
import org.apache.commons.lang.ArrayUtils;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by shuhrat on 27.08.2015.
 */

@Controller
@Transactional
public class ArticleDAO extends GenericDaoImpl<ArticleDTO> {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TopicListener topicListener;

    @Autowired
    private StatisticDAO statisticDAO;
    @Autowired
    private ForumDAO forumDAO;

    private static final Logger LOG = Logger.getLogger(ArticleDAO.class);

    private final int pageRecords=10;


    @Autowired
    public ArticleDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    /**
     * Get last project article fro index page
     * @param projId project id
     * @param start  start  record
     * @param count  number of record
     * @param status article status
     * @param artictype   article type
     * @return  list of Article
     */
    @Cacheable( value = "articleDTO" )
//    @Transactional
    public List<ArticleDTO> getLastArticle(Integer projId, Integer start, Integer count, Integer status, Integer artictype , String order, Integer catId , List<ForumDTO> forumDTOs, Integer userid, Integer performerid )  {
        List<ArticleDTO> articleDTOList=getArticleCriteria(projId, start,count,status,artictype , order,  catId, forumDTOs, userid, performerid).list();
        return articleDTOList;
    }

    private Criteria addArticleCriteriaRestrictions(Criteria cr, final Integer projId, Integer artictype, Integer catId, List<ForumDTO> forumDTOs , Integer status , Integer userid , Integer performerid ){
        cr.add(Restrictions.sqlRestriction("projid= " + projId));
        cr.add(Restrictions.sqlRestriction("deleted=false"));
        if (artictype != null  && artictype>0){ cr.add(Restrictions.sqlRestriction("type="+ artictype));  }

        if (catId != null && catId > 0)
            {cr.add(Restrictions.sqlRestriction("catid= " +  catId));
            }

        if (userid != null && (userid > 0)) {
            cr.add(Restrictions.sqlRestriction("userid= " +  userid));
        }
        if (performerid != null && (performerid > 0)) {
            cr.add(Restrictions.sqlRestriction("assigneduser= " +  performerid));
        }

        if (forumDTOs != null && !forumDTOs.isEmpty() ) {
            Criterion[] forcrit= new Criterion[0];;

            for (ForumDTO forumDTO:forumDTOs){
                if (forumDTO.getType().equals(ForumType.HelpDesk)) {
// TODO: change algoritm for help desk forums
                    UserDTO userDTO = null;
//                    ArrayUtils.add(forcrit, Restrictions.sqlRestriction("userid= " + (userDTO == null?-1:userDTO.getId()) ));
                    forcrit= (Criterion[]) ArrayUtils.add(forcrit,Restrictions.sqlRestriction("forumid= " + forumDTO.getId()));
                }
                else {
                    forcrit= (Criterion[]) ArrayUtils.add(forcrit,Restrictions.sqlRestriction("forumid= " + forumDTO.getId()));
                }
            }
            cr.add(Restrictions.or(forcrit));
        } else {
            new Throwable("Forum must be selected");
        }

        if (status != null && status > -1) {
            if (status == 0) {
                cr.add(Restrictions.sqlRestriction(" (status=0 || status is null)"));
            } else {
                cr.add(Restrictions.sqlRestriction("status="+ status));
            }
        }
        return cr;
    }

    private Criteria getArticleCriteria(Integer projId, Integer start, Integer count, Integer status, Integer artictype , String order,  Integer catId , List<ForumDTO>  forumDTOs, Integer userid, Integer performerid  ){
        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(ArticleDTO.class, "ad");
        cr=addArticleCriteriaRestrictions(cr,projId,artictype,catId, forumDTOs, status, userid , performerid);

             if(Objects.equals(order, "top")) { cr.addOrder(Order.desc("votes"));}
        else if(Objects.equals(order, "bycomment")) {cr.addOrder(Order.desc("comments")); }
        else if(Objects.equals(order, "byupvotes")) { cr.addOrder(Order.desc("voteup")); }
        else if(Objects.equals(order, "bydownvotes")) { cr.addOrder(Order.asc("votedown")); }
        else if(Objects.equals(order, "byviews")) { cr.addOrder(Order.desc("views")); }
        else if(Objects.equals(order, "byfollow")) { cr.addOrder(Order.desc("followers")); }
        else if(Objects.equals(order, "bycreatedate")) {  cr.addOrder(Order.desc("createdate"));  }
        else  { cr.addOrder(Order.desc("lastchange"));  }

        if(start!= null  ) cr.setFirstResult(start );

        cr .setMaxResults(count == null ? pageRecords : count);
        return cr;
    }

    @Cacheable( value = "itemCount" )
    @Transactional
    public ItemCount getLastArticleRecCount(Integer projId,  Integer status, Integer topictype ,  Integer catId , List<ForumDTO>  forumDTOs , Integer userid, Integer performerid)
    {   Criteria cr = getSessionFactory().getCurrentSession().createCriteria(ItemStatDTO.class);
        cr = addArticleCriteriaRestrictions(cr, projId, 0, catId, forumDTOs, -1, userid, performerid);
        cr.setProjection(Projections.projectionList().add(Projections.groupProperty("status"), "status")
                        .add(Projections.groupProperty("type"), "type")
                        .add(Projections.rowCount(), "count")
        );

        ItemCount itemCount = new ItemCount( forumDAO.getArticleStatusByTopicTypeId(projId, forumDTOs.get(0).getId(), topictype) , topictype , status );
        for (Object o : cr.list()) {
            Object[] row = (Object[]) o;
            ItemStatDTO itemStatDTO = new ItemStatDTO((Integer) row[0], (Integer) row[1], (Long) row[2]);
            itemCount.getItemStatDTOList().add(itemStatDTO);
        }
        return itemCount;
    }

    /**
     * Get project Article
     * @param projId project id
     * @param id Article id
     * @return
     */
    @Cacheable( value = "articleDTO" )
    public  ArticleDTO getArticle (Integer projId,  Integer id) {
        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(ArticleDTO.class);
        cr.add(Restrictions.eq("projid", projId));
        cr.add(Restrictions.ne("deleted", true));
        cr.add(Restrictions.eq("id", id));
        ArticleDTO articleDTO = (ArticleDTO) cr.uniqueResult();
        if (articleDTO != null) {
            statisticDAO.increaseArticleViews(articleDTO);
        }
        return  articleDTO;
    }



    /**
     * Save Article's replies
     *
     * @param commentDTO comment to save
     * @return
     */

    @CacheEvict(value = "articleDTO",  allEntries = true)
    public CommentDTO saveArticleComment(CommentDTO commentDTO){
        Integer articid= commentDTO.getArticleDTO().getId();
        CommentDTO parentDTO;
        if (commentDTO.getId()== null && (commentDTO.getParentid()!= null) && commentDTO.getParentid()>0){
            parentDTO=getCommentbyId(commentDTO.getParentid());
            commentDTO.setLevel(parentDTO.getLevel() == null ? 1 : parentDTO.getLevel() > 6 ? 8 : parentDTO.getLevel() + 1);
            int i=0;
            while (parentDTO!= null && i<8){
                commentDTO.setParentid(parentDTO.getId());
                i++;
                if (parentDTO.getParentid() == null){
                    parentDTO=null;
                }
                else {
                    parentDTO = getCommentbyId(parentDTO.getParentid());
                }
            }
        }

//        commentDTO.setUserDTO(getCurrentLoggedUser());
//        commentDTO.getArticleDTO().setUpdatedUserDTO(getCurrentLoggedUser());

        if (Objects.equals(commentDTO.getText(), "") && (commentDTO.getStatusDTO() == null  || Objects.equals(commentDTO.getStatusDTO().getId(), commentDTO.getArticleDTO().getStatusDTO().getId()))){ return  null;};
        if (commentDTO.getStatusDTO() != null && !Objects.equals(commentDTO.getStatusDTO().getId(), commentDTO.getArticleDTO().getStatusDTO().getId())){
           commentDTO.getArticleDTO().setStatusDTO(commentDTO.getStatusDTO());

        }

        commentDTO.getArticleDTO().setLastchange(new Date());

        if (commentDTO.getId() == null) {commentDTO.getArticleDTO().commentsPlus();}

        Integer id = commentDTO.getId();
        currentSession().saveOrUpdate(commentDTO);
        currentSession().flush();
        if (commentDTO.getAnswer())  {
            commentDTO.getArticleDTO().setAnswerCommentid(commentDTO.getId());
            clearProjectAnswer(articid);
        }
        if (id == null){
            statisticDAO.increaseArticleComments(commentDTO.getArticleDTO());
            if (commentDTO.getStatusDTO() == null) {
                topicListener.sendCommentAmqpCommand(AmqpConstants.COMMNETCREATED, commentDTO.getArticleDTO().getProjid(), commentDTO.getArticleDTO().getForumDTO().getId(), commentDTO.getArticleDTO().getId(),  commentDTO.getId());
            }
            else {
                topicListener.sendCommentAmqpCommand(AmqpConstants.TOPICUPDATED, commentDTO.getArticleDTO().getProjid(), commentDTO.getArticleDTO().getForumDTO().getId(), commentDTO.getArticleDTO().getId(), commentDTO.getId());
            }
        }
        return commentDTO;
    }

    @Transactional
    public void delArticleComment(Integer  commid){
        CommentDTO commentDTO = getCommentbyId(commid);
        ArticleDTO articleDTO = commentDTO.getArticleDTO();
      this.save(articleDTO);
        currentSession().createQuery("delete from CommentVoteDTO  cv where cv.commentid=:commentid ")
                .setParameter("commentid", commentDTO.getId()).executeUpdate();
        currentSession().delete(commentDTO);
        statisticDAO.decreaseArticleComments(articleDTO);

    //        getSessionFactory().getCurrentSession().clear();
    }

    @CacheEvict(value = "articleDTO",  allEntries = true)
    public void delArticle(ArticleDTO articleDTO){
        ForumDTO forumDTO=articleDTO.getForumDTO();
        articleDTO.setDeleted(true);
        saveArticle(articleDTO, articleDTO.getForumDTO().getId());
        statisticDAO.decreaseForumArticles(forumDTO);
   }

    @Cacheable( value = "articleDTO" )
    public CommentDTO getCommentbyId(Integer id ){
        return (CommentDTO) getSessionFactory().getCurrentSession().createQuery("from CommentDTO as com where com.id=:id  ")
                .setParameter("id", id).uniqueResult();
    }

    @Cacheable( value = "articleDTO" )
    public List<CommentDTO> getCommentbyUserId(Integer projid, Integer  userid, Integer start, Integer count ){
        return  getSessionFactory().getCurrentSession().createQuery("from CommentDTO as com where com.userDTO.id=:userid and  com.articleDTO.projid =:projid  and com.articleDTO.deleted=false  order by com.createdate desc ")
                .setParameter("userid", userid).setParameter("projid", projid).setMaxResults(count).setFirstResult(start)
                .list();
    }

    public Long getCommentbyUserCounts(Integer projid, Integer  userid ){
        return (Long) getSessionFactory().getCurrentSession().createQuery("select  count(*) from CommentDTO as com where com.userDTO.id=:userid and  com.articleDTO.projid =:projid  and com.articleDTO.deleted=false")
                .setParameter("userid", userid).setParameter("projid", projid)
                .uniqueResult();
    }


    protected CommentVoteDTO isCommentVotedByMe(Integer commitid, String username, String Ip){
        if(username== null && Ip==null) {return  null;};
        IpConvertor ipConvertor= new IpConvertor();
        try {
            return (CommentVoteDTO) getSessionFactory().getCurrentSession().createQuery("from CommentVoteDTO as cv where cv.commentid=:commentid and  cv.remip=:ip")
                    .setParameter("commentid", commitid)
                    .setParameter("ip", ipConvertor.ipToLong(Ip)).setCacheable(true).uniqueResult();
        } catch (HibernateException e) {
            return null;
        }

    }

    public CommentDTO commentVote(Integer commentid, Integer value , String username, String Ip ){
        CommentDTO commentDTO = getCommentbyId(commentid);
        CommentVoteDTO commentVoteDTO=isCommentVotedByMe(commentid, username, Ip);

        if (commentVoteDTO != null) {
            if(Objects.equals(commentVoteDTO.getValue(), value)) {
                return commentDTO;
            } else {
                commentDTO.voteUndo(commentVoteDTO.getValue());
                getSessionFactory().getCurrentSession().delete(commentVoteDTO);
            }
        }
        if (value != 0)  {
            int voute =  value>0?commentDTO.votesPlus(value):commentDTO.votesDown(value);
            getSessionFactory().getCurrentSession().save(new CommentVoteDTO(commentid, value, Ip, 0));
        }

        getSessionFactory().getCurrentSession().saveOrUpdate(commentDTO);

        return commentDTO;
    }


    /**
     * @param articid
     * @param username
     * @param Ip
     * @return
     */
    private ArticleVoteDTO isArticleVotedByMe(Integer articid, String username, String Ip ){

        if(username== null && Ip==null) {return  null;};
        IpConvertor ipConvertor= new IpConvertor();
        try {
            return (ArticleVoteDTO) getSessionFactory().getCurrentSession().createQuery("from ArticleVoteDTO as av where av.articleid=:articleid and  av.remip=:ip")
                    .setParameter("articleid", articid)
                    .setParameter("ip", ipConvertor.ipToLong(Ip)).setCacheable(true).uniqueResult();
        } catch (HibernateException e) {
            return null;
        }
    }
     public ArticleDTO assignArticTo(Integer articID, Integer userAssigId){
         ArticleDTO articleDTO= find(articID);
         if (articleDTO== null) return null;
         UserDTO userDTO= userDAO.getProjectUserByid(articleDTO.getProjid(), userAssigId);
         if (userDTO== null) return  articleDTO;
         articleDTO.setAssignedUserDTO( userDTO );
         getSessionFactory().getCurrentSession() .save(articleDTO);
         return articleDTO;

     }

    public ArticleDTO assignArticleCategory(Integer articID, Integer catid){
        ArticleDTO articleDTO= find(articID);

        CategoriesDTO categoriesDTO=forumDAO.getCategoryById(articleDTO.getProjid(), catid , false);
        if ((articleDTO== null) && (categoriesDTO== null)) return null;
        CategoriesDTO prevCategories= articleDTO.getCategoriesDTO();
        articleDTO.setCategoriesDTO(categoriesDTO);
        articleDTO.getCategoriesDTO().increaseArticle(1);


        currentSession().save(articleDTO);
        if (prevCategories!= null){
            prevCategories.increaseArticle(-1);
            forumDAO.saveCategories(prevCategories);
        }

        return articleDTO;

    }

    private boolean clearProjectAnswer( Integer articid){
        currentSession().createQuery("update CommentDTO co  set co.answer=false where co.articleDTO.id = :articid")
                .setParameter("articid", articid).executeUpdate();
        return true;

    }

    public CommentDTO getArticleAnswer(List<CommentDTO> commentDTOList){
        for(CommentDTO commentDTO:commentDTOList){
            if (commentDTO.getAnswer()) return commentDTO;
        }
        return null;
    }

    public  ArticleDTO articleVote(Integer projId, Integer articid, Integer value , String username, String Ip ) throws N18iException {
        ArticleDTO articleDTO = getArticle(projId, articid);
        if (articleDTO == null)    throw  new N18iException(projId, N18IErrorCodes.ARTICLE_NOT_FOUND);
        ForumDTO forumDTO = articleDTO.getForumDTO();
        if (forumDTO.getVotetype() == 0) throw  new N18iException(projId, forumDTO.getId(), N18IErrorCodes.VOTE_DISABLED);
        if (forumDTO.getVotetype() == 2 && value<0) throw  new N18iException(projId, forumDTO.getId(), N18IErrorCodes.VOTE_POSITIVE);
        ArticleVoteDTO articleVoteDTO = isArticleVotedByMe(articid, username, Ip);
        if (articleVoteDTO != null ) {
            if (Objects.equals(articleVoteDTO.getValue(), value)) {
                return articleDTO;
            }
            else {
                articleDTO.voteUndo(articleVoteDTO.getValue());
                getSessionFactory().getCurrentSession().delete(articleVoteDTO);
            }
        }

        if (value !=0)  {
            int voute = value > 0 ? articleDTO.votesPlus(value):articleDTO.votesDown(value);
            getSessionFactory().getCurrentSession().save(new ArticleVoteDTO(articid, value, Ip, 0));
        }
        getSessionFactory().getCurrentSession().saveOrUpdate(articleDTO);
        return articleDTO;
    }


    @CacheEvict(value = "articleDTO",  allEntries = true)
    public ArticleDTO saveArticle(ArticleDTO articleDTO, int forumid) {
        Integer previd = articleDTO.getId();
//        ForumDTO forumDTO = articleDTO.getForumDTO();


        if (articleDTO.getStatusDTO().getId() == null) {
            articleDTO.setStatusDTO(forumDAO.getArticleStatusById(articleDTO.getProjid(), forumid , articleDTO.getType().getFirstreplystatus(), true ));
            if (articleDTO.getStatusDTO().getId() == null) articleDTO.setStatusDTO(forumDAO.getArticleStatusById(0, 0, 0, true));
        }

        articleDTO = save(articleDTO);
        if (previd == null) {
            topicListener.sendTopicAmqpCommand( AmqpConstants.TOPICCREATED , articleDTO.getProjid(), forumid, articleDTO.getId());
        }
       return articleDTO;
    }


    public Boolean isfollow (Integer articid, UserDTO userDTO){
        FollowDTO followDTO = (FollowDTO) getSessionFactory().getCurrentSession()
                .createQuery("from FollowDTO as fol where fol.articleid=:articid and userid=:userid ")
                .setParameter("articid", articid).setParameter("userid", userDTO.getId()).setCacheable(true).uniqueResult() ;

        return followDTO != null;
    }

    public boolean followArticle(Integer projid , Integer articid, UserDTO userDTO){
        FollowDTO followDTO= (FollowDTO) getSessionFactory().getCurrentSession()
                .createQuery("from FollowDTO as fol where fol.articleid=:articid and userid=:userid ")
                .setParameter("articid", articid).setParameter("userid", userDTO.getId()).setCacheable(true).uniqueResult() ;
        if (followDTO == null) {
            followDTO = new FollowDTO(articid, userDTO.getId() );
            currentSession().save(followDTO);
            statisticDAO.increaseArticleFollowers(articid);
            return true;
        }
        else {
            currentSession().delete(followDTO);
            statisticDAO.decreaseArticleFollowers(articid);
            return false;
        }
    }

    @Cacheable( value = "articleTagsDTO" )
    public List<ArticleTagsDTO> getArticleTags(Integer projid, Integer articid) {
        return  currentSession().createQuery("select at.forumTagsDTO from ArticleTagsDTO as at where at.articleDTO.projid=:projid and  at.articleDTO.id=:articid ")
                .setParameter("projid", projid).setParameter("articid", articid).list();

    }

    public void  delArticleTag(Integer projid,  Integer articid, Integer tagid) {
        currentSession().createQuery("delete from ArticleTagsDTO  as at where at.articleDTO.id=:articid and at.forumTagsDTO.id =:tagid")
                .setParameter("articid", articid).setParameter("tagid", tagid)
                .executeUpdate();
    }

    public void addTagtoArticle(Integer projid,  Integer articid, Integer tagid) {
        try {
            ArticleDTO articleDTO= getArticle(projid, articid);
            ArticleTagsDTO articleTagsDTO= new ArticleTagsDTO();
            articleTagsDTO.setArticleDTO(getArticle(projid, articid) );
            articleTagsDTO.setForumTagsDTO(forumDAO.getTagById(projid, articleDTO.getForumDTO().getId(), tagid));

            currentSession().save(articleTagsDTO);
        } catch (Exception ignored) {

        }
    }

    @Cacheable( value = "commentDTO" )
    public List<CommentDTO> getArticleComments(Integer articid) {
          return  currentSession().createSQLQuery("select * from comment as com where com.articid=:articid order by ( IF (parentid = 0 ,id  , parentid)) , level").addEntity(CommentDTO.class)
                .setParameter("articid", articid).list();

    }


    public List<ArticleDTO> findTextInArticle(Integer projid , String searchText, Integer forumid, ForumType forumType , Integer count, String order ){
        if (count == null || count == 0) count = 5;
        if (searchText == null || searchText.length() < 3 ) return null;
        SearchField searchField = new SearchField(searchText);
        if (searchField.getTextForSearch().length()<3 ) return null;
        Criteria criteria = getArticleCriteria(projid, 0, count, null, null, null, null, null, null, null);

        criteria.add(Restrictions.sqlRestriction(" match ( title, text  ) against ( '" + searchField.getTextForSearch() + "')"));
        return  criteria.list();



    }

    @Cacheable( value = "articleDTO" )
    public ItemCount getLastArticleRecCount(ProjectDTO project, List<ForumDTO> forumDTOs, HashMap params, Boolean forcache) {
        Integer status= stringToInt(params.getOrDefault("status", -1));
        Integer type= stringToInt(params.getOrDefault("type", -1));
        Integer cat = stringToInt(params.getOrDefault("catid",-1));
        Integer userid = stringToInt(params.getOrDefault("userid",-1));
        Integer performerid= stringToInt(params.getOrDefault("performerid",-1));
        return getLastArticleRecCount(project.getId(), status, type, cat, forumDTOs, userid, performerid);
    }

    @Cacheable( value = "articleDTO" )
    public final List<ArticleDTO> getArticleList(final ProjectDTO project, final List<ForumDTO> forumDTOs, final HashMap params) {
        Integer offset = stringToInt(params.getOrDefault("offset", -1));
        Integer count = stringToInt(params.getOrDefault("count", 0));
        Integer status = stringToInt(params.getOrDefault("status", -1));
        Integer type = stringToInt(params.getOrDefault("type", -1));
        String  order = (String) params.getOrDefault("order", "");
        Integer cat = stringToInt(params.getOrDefault("catid",-1));
        Integer userid = stringToInt(params.getOrDefault("userid",-1));
        Integer performerid = stringToInt(params.getOrDefault("performerid",-1));
        return  getLastArticle(project.getId(), offset, count, status, type, order, cat, forumDTOs, userid, performerid);

    }



    protected static Integer stringToInt(Object obj) {
        try {
            return Integer.parseInt( String.valueOf(obj));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public ArticleDTO moveToArticle(ArticleDTO articleDTO, Integer forumid, Integer forumType, Integer forumCategory){
        if (!articleDTO.getForumDTO().getId().equals(forumid)) {
            ForumDTO forumDTO = forumDAO.getForumById(articleDTO.getProjid(), forumid );
            if (forumDTO != null) articleDTO.setForumDTO(forumDTO);
        }

        if (forumType != null && (forumType != 0 )) {
            TopicTypeDTO topicTypeDTO = forumDAO.getForumTypeByid(articleDTO.getProjid(), forumType );
            if (topicTypeDTO!= null) articleDTO.setType(topicTypeDTO) ;
        }

        if (forumCategory != null && forumCategory != 0) {
            CategoriesDTO categoriesDTO = forumDAO.getCategoryById(articleDTO.getProjid(), forumCategory, false);
            articleDTO.setCategoriesDTO(categoriesDTO);

        }

        return  saveArticle(articleDTO, forumid);
    }

//    articleFilterDTO
    @Cacheable( value = "articleFilterDTO" )
    public List<ArtilceFilterDTO> getArticleFilterByProjId(Integer projId, Integer userid ){


        Criteria cr = getSessionFactory().getCurrentSession().createCriteria(ArtilceFilterDTO.class);

        Criterion[] forprojId= new Criterion[0];;
        forprojId= (Criterion[]) ArrayUtils.add(forprojId,Restrictions.eq("projid",  0));
        if(userid!=0 ){
            forprojId= (Criterion[]) ArrayUtils.add(forprojId,Restrictions.eq("projid",  projId));
        }
        cr.add(Restrictions.or(forprojId));
        Criterion[] forcrit= new Criterion[0];;
        forcrit= (Criterion[]) ArrayUtils.add(forcrit,Restrictions.eq("userid",  0));
        if(userid!=0 ){
            forcrit= (Criterion[]) ArrayUtils.add(forcrit,Restrictions.eq("userid",  userid));
        }
        cr.add(Restrictions.or(forcrit));
        return  cr.list();
    }

}

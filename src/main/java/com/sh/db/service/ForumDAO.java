package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.*;
import com.sh.utils.ForumType;
import com.sh.utils.I18Prefix;
import com.sh.utils.ModuleDisplay;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * Created by shuhrat on 23.09.2015.
 */
@Controller
@Transactional
public class ForumDAO extends GenericDaoImpl<ForumDTO> {
    private static final Logger LOG = Logger.getLogger(ForumDAO.class);

    @Value("${default.community.forum.Dashboard.modules}")
    String dashboardModules;

    @Value("${default.community.forum.List.modules}")
    String listModules;

    @Value("${default.community.forum.Widget.modules}")
    String widgetModules;

    @Value("${default.knowledgebase.forum.Dashboard.modules}")
    String kBdashboardModules;

    @Value("${default.knowledgebase.forum.List.modules}")
    String kBlistModules;

    @Value("${default.knowledgebase.forum.Widget.modules}")
    String kBwidgetModules;

    @Autowired
    ModuleDAO moduleDAO;

    @Autowired
    I18nMessageDAO i18nMessageDAO;

    @Autowired
    public ForumDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    @Cacheable( value = "categoriesDTO" )
    public List<CategoriesDTO> getCategoryByForumId(Integer projid, Integer forumid  ){
        return  getSessionFactory().getCurrentSession().createQuery("from CategoriesDTO  as cat where cat.forumid=:forumid and cat.projid=:projid order by cat.pos")
                .setParameter("forumid", forumid)
                .setParameter("projid", projid).list();

    }

    @Cacheable( value = "forumTypeDTO" )
    public List<ForumTypeDTO> getForumTypeByForumid(Integer projid,  Integer forumid , Integer status ){
//
//        Criteria cr = currentSession().createCriteria(ForumTypeDTO.class, "ft");
////        cr.add(Restrictions.eq("projid", projid));
//        cr.add(Restrictions.sqlRestriction("ft.forumid in (select  id from forum as fd where fd.projid=" + projid+" )"));
//        cr.add(Restrictions.eq("forumid", forumid));
//        if (status>=0) {cr.add(Restrictions.eq("enable", status == 1));}
//        return  cr.list();
        String sqlstatus="";
        if (status>=0) { sqlstatus=( status==1)?" ft.enable=true and": " ft.enable=false and"; }

        String sql="from ForumTypeDTO  as ft where ft.forumid=:forumid and "+ sqlstatus +"  ft.forumid in (select  id from ForumDTO as fd where fd.projectDTO.id=:projid ) order by ft.articleTypeDTO.ttype, ft.pos" ;

        return  getSessionFactory().getCurrentSession().createQuery(sql)
                .setParameter("forumid", forumid)
                .setParameter("projid", projid)
                .list();
    }

    @Cacheable( value = "forumTypeDTO" )
    public ForumTypeDTO getForumTypeByid(Integer projid,  Integer id  ){

        ForumTypeDTO forumTypeDTO= (ForumTypeDTO) getSessionFactory().getCurrentSession().createQuery("from ForumTypeDTO  as ft where  ft.id=:id and    ft.forumid in (select  id from ForumDTO as fd where fd.projectDTO.id=:projid )")
                .setParameter("projid", projid)
//                .setParameter("forumid", forumid)
                .setParameter("id", id)
                .uniqueResult();
        return  forumTypeDTO;
    }

    @Cacheable( value = "forumStatusDTO" )
    public ForumStatusDTO getForumStatusByid(Integer projid,  Integer id, Boolean forcache   ){
        return  (ForumStatusDTO) getSessionFactory().getCurrentSession().createQuery("from ForumStatusDTO  as fs where  fs.id=:id and  fs.forumid in (select  id from ForumDTO as fd where fd.projectDTO.id=:projid )")
                .setParameter("projid", projid)
                .setParameter("id", id)
                .uniqueResult();
    }

    @Cacheable( value = "forumStatusDTO" )
    public List<ForumStatusDTO> getForumStatusByForumId(Integer projid,  Integer forumid  ){
        return   getSessionFactory().getCurrentSession().createQuery("from ForumStatusDTO  as fs where  fs.forumid=:forumid and  fs.forumid in (select  id from ForumDTO as fd where fd.projectDTO.id=:projid  ) order by pos")
                .setParameter("projid", projid)
                .setParameter("forumid", forumid)
                .list();
    }

    @Cacheable( value = "articleStatusDTO" )
    public List<ArticleStatusDTO> getArticleStatusByForumId(Integer projid,  Integer forumid  ){
        return   getSessionFactory().getCurrentSession().createQuery("from ArticleStatusDTO  as asd where (asd.forumid=:forumid or asd.forumid=0) and  asd.projid=:projid order by asd.atype, asd.pos ")
                .setParameter("projid", projid)
                .setParameter("forumid", forumid)
                .list();
    }

    @Cacheable( value = "articleStatusDTO" )
    public ArticleStatusDTO getArticleStatusById(Integer projid ,  Integer forumid,  Integer id  ){
        return (ArticleStatusDTO) getSessionFactory().getCurrentSession().createQuery("from ArticleStatusDTO  as asd where (asd.forumid=:forumid or asd.forumid=0) and  asd.id=:id and  asd.projid=:projid ")
                .setParameter("projid", projid)
                .setParameter("id", id)
                .setParameter("forumid", forumid)
                .uniqueResult();
    }

    @Cacheable( value = "forumTagsDTO" )
    public List<ForumTagsDTO> getTagsByForumId( Integer forumid  ){
        return  getSessionFactory().getCurrentSession().createQuery("from ForumTagsDTO  as ft where ft.forumid=:forumid ")
                .setParameter("forumid", forumid).list();

    }
    @Cacheable( value = "forumTagsDTO" )
    public ForumTagsDTO getTagById(Integer projid, Integer forumid ,  Integer tagid  ){
        return (ForumTagsDTO) getSessionFactory().getCurrentSession().createQuery("from ForumTagsDTO  as ft where ft.id=:tagid and   ft.forumid=:forumid ")
                .setParameter("forumid", forumid)
                .setParameter("tagid", tagid).uniqueResult();

    }


    @Cacheable( value = "categoriesDTO" )
    public CategoriesDTO getCategoryById(Integer projid, Integer catid , boolean forcache ){
        return (CategoriesDTO) getSessionFactory().getCurrentSession().createQuery("from CategoriesDTO  as cat where cat.id=:id and cat.projid=:projid")
                .setParameter("id", catid)
                .setParameter("projid", projid).uniqueResult();
    }

    @CacheEvict(value = "categoriesDTO" ,   allEntries = true)
    public boolean moveCategory(Integer projId, Integer catID, String direction){
        CategoriesDTO categoriesDTO=getCategoryById(projId, catID, false);
        List<CategoriesDTO> categoriesDTOs=getCategoryByForumId(projId, categoriesDTO.getForumid());
        CategoriesDTO prevCategory = null;
        Boolean change=false;
        for (CategoriesDTO category:categoriesDTOs){
            if (change){
                swapPos(category, prevCategory);
                return true;
            }

            if (Objects.equals(category.getId(), catID)){
                if (Objects.equals(direction, "up")){
                    if (prevCategory != null ){swapPos(category, prevCategory);}
                    return true;
                }
                change=true;
            }
            prevCategory=category;
        }
        return false;
    }

    @CacheEvict( value = "forumStatusDTO" ,   allEntries = true)
    public boolean moveForumStatus(Integer projId, Integer forumStatusId, String direction){
        ForumStatusDTO forumStatusDTO=getForumStatusByid(projId, forumStatusId, false);
        List<ForumStatusDTO> forumStatusDTOs=getForumStatusByForumId(projId, forumStatusDTO.getForumid());
        ForumStatusDTO prevForumStatusDTO = null;
        Boolean change=false;
        for (ForumStatusDTO forumStatusDTO1 : forumStatusDTOs){
            if (change){
                swapPos(forumStatusDTO1, prevForumStatusDTO);
                return true;
            }

            if (Objects.equals(forumStatusDTO1.getId(), forumStatusId)){
                if (Objects.equals(direction, "up")){
                    if (prevForumStatusDTO != null ){swapPos(forumStatusDTO1, prevForumStatusDTO);}
                    return true;
                }
                change=true;
            }
            prevForumStatusDTO=forumStatusDTO1;
        }
        return false;
    }


    @CacheEvict(value = "forumTypeDTO" ,   allEntries = true)
    public boolean moveForumType(Integer projId, Integer forunid,  Integer forumTypeID, String direction){
        ForumTypeDTO  forumTypeDTO=getForumTypeByid(projId,  forumTypeID);
        List<ForumTypeDTO> forumTypeDTOs=getForumTypeByForumid(projId, forumTypeDTO.getForumid(),-1);
        ForumTypeDTO prevForumType = null;
        Boolean change=false;
        for (ForumTypeDTO forumType:forumTypeDTOs){
            if (change){
                return swapPos(forumType, prevForumType);

            }

            if (Objects.equals(forumType.getId(), forumTypeID)){
                if (Objects.equals(direction, "up")){
                    if (prevForumType != null ){swapPos(forumType, prevForumType);}
                    return true;
                }
                change=true;
            }
            prevForumType=forumType;
        }
        return false;
    }

    public boolean delTypeStatusDTOs(Integer projid, Integer forumid, Integer typeid){

        currentSession().createQuery("delete from ForumTypeStatusDTO  fts where fts.forumStatusDTO.articleStatusDTO.id>10 and   fts.forumid=:forumid and fts.forumTypeDTO.id=:typeid and fts.projid=:projid ")
                .setParameter("forumid", forumid).setParameter("typeid", typeid).setParameter("projid", projid)
                .executeUpdate();
        return true;
    }

    @CacheEvict(value = "forumTypeDTO" ,   allEntries = true)
    @Transactional
    public boolean delForumType(ForumTypeDTO forumTypeDTO){
        if (forumTypeDTO.getArticleTypeDTO().getTtype()==1){
            currentSession().delete(forumTypeDTO);
            return true;
        }
        return false;
    }


    @CacheEvict(value = "forumTagsDTO" ,   allEntries = true)
    @Transactional
    public boolean delTagbyId(Integer projid, Integer tagid){

        currentSession().createQuery("delete from ArticleTagsDTO as at where  at.forumTagsDTO.id=:tagid").setParameter("tagid", tagid)
                .executeUpdate();
        currentSession().createQuery("delete from ForumTagsDTO as ft where  ft.id=:tagid").setParameter("tagid", tagid)
                .executeUpdate();

        i18nMessageDAO.delI18ByKey(projid, I18Prefix.TagName + tagid);
        return true;
    }

    @Transactional
    @CacheEvict(value = "categoriesDTO" ,   allEntries = true)
    public Boolean delCategoryById(Integer projid, Integer catid){
        CategoriesDTO categoriesDTO= getCategoryById(projid, catid , false);
        if (categoriesDTO!= null) {
           currentSession().createQuery("update ArticleDTO  set categoriesDTO.id=null where categoriesDTO.id=:catid and projid=:projid")
                    .setParameter("projid", projid).setParameter("catid", catid).executeUpdate();
            currentSession().delete(categoriesDTO);
            i18nMessageDAO.delI18ByKey(projid, I18Prefix.CategoryName + catid);
        }
        return true;
    }
    private   boolean swapPos(CategoriesDTO categoriesDTO1, CategoriesDTO categoriesDTO2){
        int pos= categoriesDTO1.getPos();
        categoriesDTO1.setPos(categoriesDTO2.getPos());
        categoriesDTO2.setPos(pos);
        this.saveCategories(categoriesDTO1);
        this.saveCategories(categoriesDTO2);
        return true;
    }

    private   boolean swapPos(ForumStatusDTO categoriesDTO1, ForumStatusDTO categoriesDTO2){
        int pos= categoriesDTO1.getPos();
        categoriesDTO1.setPos(categoriesDTO2.getPos());
        categoriesDTO2.setPos(pos);
        this.saveForumStatus(categoriesDTO1);
        this.saveForumStatus(categoriesDTO2);
        return true;
    }

    private   boolean swapPos(ForumTypeDTO  forumType1, ForumTypeDTO forumType2){
        int pos= forumType1.getPos();
        forumType1.setPos(forumType2.getPos());
        forumType2.setPos(pos);
        this.saveForumType(forumType1);
        this.saveForumType(forumType2);
        return true;
    }

    @Cacheable( value = "forumDTO" )
    public ForumDTO getForumById(Integer projid, Integer forumid ){
        return (ForumDTO) getSessionFactory().getCurrentSession().createQuery("from ForumDTO fd where fd.status=1 and  fd.projectDTO.id=:projid and fd.id=:id ")
                .setParameter("projid", projid). setParameter("id", forumid) .uniqueResult();
    }

    @Cacheable( value = "forumSpamProtectionDTO" )
    public ForumSpamProtectionDTO getForumSpamProtectionById(Integer projid, Integer forumid, Integer protectType ){
        return (ForumSpamProtectionDTO) getSessionFactory().getCurrentSession().createQuery("from ForumSpamProtectionDTO fsp where fsp.ftype=:protectType and  fsp.projid=:projid and fsp.forumid=:forumid ")
                .setParameter("projid", projid)
                . setParameter("forumid", forumid)
                .setParameter("protectType" , protectType).uniqueResult();
    }

    @Cacheable( value = "forumDTO" )
    public ForumDTO getForumById(Integer projid, Integer forumid, ForumType forumType ){
        return (ForumDTO) getSessionFactory().getCurrentSession().createQuery("from ForumDTO fd where fd.status=1 and  fd.projectDTO.id=:projid and fd.id=:id and fd.type=:type")
                .setParameter("projid", projid).setParameter("type", forumType) .setParameter("id", forumid) .uniqueResult();
    }

    @Cacheable( value = "forumDTO" )
    public List<ForumDTO> getForumbyType(Integer projid, ForumType forumType  ){
        return getSessionFactory().getCurrentSession().createQuery("from ForumDTO fd where fd.status=1 and  fd.projectDTO.id=:projid and fd.type=:type ")
                .setCacheable(true).setParameter("projid", projid).setParameter("type", forumType).list();
    }

    @Cacheable( value = "forumDTO" )
    public List<ForumDTO> getForumbyProject(Integer projid ){
        return getSessionFactory().getCurrentSession().createQuery("from ForumDTO fd where fd.status=1 and  fd.projectDTO.id=:projid ")
                .setCacheable(true).setParameter("projid", projid).list();
    }

    @CacheEvict(value = "forumDTO",  allEntries = true)
    public ForumDTO saveForum(ForumDTO forumDTO){
        currentSession().saveOrUpdate(forumDTO);
        return  forumDTO;
    }

    @CacheEvict(value = "forumSpamProtectionDTO",  allEntries = true)
    public ForumSpamProtectionDTO saveForumSpamProtection(ForumSpamProtectionDTO forumSpamProtectionDTO){
        currentSession().saveOrUpdate(forumSpamProtectionDTO);
        return  forumSpamProtectionDTO;
    }


    @CacheEvict(value = "categoriesDTO",  allEntries = true)
    public CategoriesDTO saveCategories(CategoriesDTO categoriesDTO){
        if (categoriesDTO.getId()== null){
            categoriesDTO.setPos(getMaxPos(categoriesDTO.getForumid(), CategoriesDTO.class)+1);
        }
        currentSession().saveOrUpdate(categoriesDTO);
        return  categoriesDTO;
    }

    @CacheEvict(value = "forumTagsDTO",  allEntries = true)
    public ForumTagsDTO saveForumTag(ForumTagsDTO forumTagsDTO){
        currentSession().saveOrUpdate(forumTagsDTO);
        return  forumTagsDTO;
    }

    @CacheEvict(value = "forumTypeDTO",  allEntries = true)
    public ForumTypeDTO saveForumType(ForumTypeDTO forumTypeDTO ){
        if (forumTypeDTO.getId()== null ){
            forumTypeDTO.setPos(getMaxPos(forumTypeDTO.getForumid(), ForumTypeDTO.class));
        }
        currentSession().saveOrUpdate(forumTypeDTO);
        return  forumTypeDTO;
    }

    @CacheEvict(value = "articleStatusDTO",  allEntries = true)
    public ArticleStatusDTO saveArticleStatus(ArticleStatusDTO articleStatusDTO){
        if (articleStatusDTO.getId()==null){
            articleStatusDTO.setPos(getMaxPos(articleStatusDTO.getForumid(), ArticleStatusDTO.class)+1);
        }
        currentSession().saveOrUpdate(articleStatusDTO);
        return  articleStatusDTO;
    }

    @CacheEvict(value = "forumStatusDTO",  allEntries = true)
    public ForumStatusDTO saveForumStatus(ForumStatusDTO forumStatusDTO){
        if (forumStatusDTO.getId()==null){
            forumStatusDTO.setPos(getMaxPos(forumStatusDTO.getForumid(), ForumStatusDTO.class)+1);
        }
        currentSession().saveOrUpdate(forumStatusDTO);
        return  forumStatusDTO;
    }
    @CacheEvict(value = "forumStatusDTO",  allEntries = true)
    public Boolean delForumStatusbyId(Integer projid, Integer forumstatusid ){
        ForumStatusDTO forumStatusDTO=getForumStatusByid(projid, forumstatusid, false);
        if (forumStatusDTO!= null && forumStatusDTO.getArticleStatusDTO().getForumid()!= 0 ){
            currentSession().createQuery("delete from ForumTypeStatusDTO  fts where fts.projid=:projid and fts.forumStatusDTO.id=: forumstatusid ")
                .setParameter("projid", projid).setParameter("forumstatusid",  forumstatusid).executeUpdate();
            currentSession().delete(forumStatusDTO);

        }
        else return false;
        return true;
    }
    protected Integer getMaxPos(Integer forumid, Class cl){
        Criteria criteria = currentSession()
                .createCriteria(cl)
                .setProjection(Projections.max("pos"));
        criteria.add(Restrictions.eq("forumid", forumid));
        Integer maxPos = (Integer) criteria.uniqueResult();
        return maxPos== null?0:maxPos;
    }





    @CacheEvict(value = "forumDTO",  allEntries = true)
    public ForumDTO createForum(ProjectDTO projectDTO , ForumType type,  String fname){
        ForumDTO forumDTO= new ForumDTO();
        forumDTO.setLangid(projectDTO.getLang());
        forumDTO.setName(fname);
        forumDTO.setProjectDTO(projectDTO);
        forumDTO.setType(type);
        forumDTO.setVotetype(1);
        forumDTO.setVotelimit(1);
        forumDTO.setSharingon(true);
        forumDTO.setSatisfactionon(true);
        forumDTO.setStatus(1);
        forumDTO =save(forumDTO);

        if (type==ForumType.Community) {
            createModules(forumDTO, dashboardModules, ModuleDisplay.Dashboard);
            createModules(forumDTO, listModules, ModuleDisplay.List);
            createModules(forumDTO, widgetModules, ModuleDisplay.Widget);
        }
        if (type==ForumType.Knowledgebase) {
            createModules(forumDTO, kBdashboardModules, ModuleDisplay.Dashboard);
            createModules(forumDTO, kBlistModules, ModuleDisplay.List);
            createModules(forumDTO, kBwidgetModules, ModuleDisplay.Widget);
        }
        return  forumDTO;
    }

    private void createModules(ForumDTO forumDTO, String modules, ModuleDisplay display ){
        for (ModuleTypeDTO moduleTypeDTO: moduleDAO.getModuleTypebyIds(modules)){
            ModuleDTO moduleDTO= new ModuleDTO(forumDTO.getId(), moduleTypeDTO , display);
            moduleDAO.saveModule(moduleDTO);
        }
    }

}

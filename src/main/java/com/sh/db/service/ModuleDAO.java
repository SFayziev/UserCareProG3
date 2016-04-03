package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.module.ModuleDTO;
import com.sh.db.map.module.ModuleLinkDTO;
import com.sh.db.map.module.ModuleParamsDTO;
import com.sh.db.map.module.ModuleTypeDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.utils.ModuleDisplay;
import com.sh.utils.ModulePosType;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
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
 * Created by Admin on 01.10.2015.
 */
@Controller
@Transactional
public class ModuleDAO extends GenericDaoImpl<ModuleDTO> {

    private static final Logger LOG = Logger.getLogger(ModuleDAO.class);

    @Value("${module.topic.control.panel}" )
    private Integer modulTopicControlid;

    @Value("${module.article.share.panel}")
    private Integer modulShareid;

    @Autowired
    ForumDAO forumDAO;

    @Autowired
    public ModuleDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    @CacheEvict(value = "modules" ,   allEntries = true)
    public ModuleDTO saveModule(ModuleDTO moduleDTO){
        moduleDTO.setPos(getMaxPos(moduleDTO.getForumid()) + 1);
        return  this.save(moduleDTO);
    }

    protected Integer getMaxPos(Integer forumid){
        Criteria criteria = currentSession()
                .createCriteria(ModuleDTO.class)
                .setProjection(Projections.max("pos"));
        criteria.add(Restrictions.eq("forumid", forumid));
        Integer maxPos = (Integer) criteria.uniqueResult();
        return maxPos== null?0:maxPos;
    }

    @CacheEvict(value = "modules" ,   allEntries = true)
    public boolean moveModule(Integer projId, Integer moduleID, String direction){
        ModuleDTO moduleDTO=getModuleById(projId, moduleID);
        List<ModuleDTO> moduleDTOList=getModuleBydisplaypos(projId,  moduleDTO.getForumid() , null, moduleDTO.getModuleTypeDTO().getDispos() , null );
        ModuleDTO prevModule = null;
        Boolean change=false;
        for (ModuleDTO module:moduleDTOList){
            if (module.getModuleTypeDTO().getDispos()!= moduleDTO.getModuleTypeDTO().getDispos() ) continue;

            if (change) {
                swapPos(module, prevModule);
                return true;
            }

            if (Objects.equals(module.getId(), moduleID)) {
                if (Objects.equals(direction, "up")) {
                    if (prevModule != null ){swapPos(module, prevModule);}
                    return true;
                }
                change=true;
            }
            prevModule=module;
        }
        return true;
    }


    private   boolean swapPos(ModuleDTO moduleDTO1, ModuleDTO moduleDTO2){
        int pos= moduleDTO1.getPos();
        moduleDTO1.setPos(moduleDTO2.getPos());
        moduleDTO2.setPos(pos);
        this.save(moduleDTO1);
        this.save(moduleDTO2);
        return true;
    }

    private   boolean swapPos(ModuleLinkDTO moduleLinkDTO1, ModuleLinkDTO moduleLinkDTO2){
        int pos = moduleLinkDTO1.getPos();
        moduleLinkDTO1.setPos(moduleLinkDTO2.getPos());
        moduleLinkDTO2.setPos(pos);
        this.saveModuleLinksDTO(moduleLinkDTO1);
        this.saveModuleLinksDTO(moduleLinkDTO2);
        return true;
    }

    @Cacheable( value = "modules")
    @Transactional
    public ModuleDTO getModuleById(Integer projId, Integer id ) {
        return (ModuleDTO) getModuleCriteria(projId, id, null, null, 0, 0).uniqueResult() ;

    }

    public List<ModuleTypeDTO> getModuleTypebyIds(String ids) {
        return  currentSession().createSQLQuery("select * from module_type  as mt where  mt.id in (" + ids + " )")
                .addEntity(ModuleTypeDTO.class).list();
    }

    public List<ModuleTypeDTO> getModuleType(ModulePosType dispose){
        return  currentSession().createSQLQuery("select * from module_type  as mt where  mt.dispos=:dispos ")
                .addEntity(ModuleTypeDTO.class).setParameter("dispos", dispose.ordinal()).list();
    }

    public ModuleTypeDTO getModuleTypebyId(Integer id){
        return (ModuleTypeDTO) currentSession().createQuery("from ModuleTypeDTO  as mt where  mt.id=:id").setParameter("id", id).uniqueResult();
    }

    private  Criteria getModuleCriteria (Integer projId, Integer modulid, Integer forumid, ModuleDisplay display, Integer type, Integer status) {
        Criteria criteria;
        criteria = currentSession()
                .createCriteria(ModuleDTO.class);
        if (modulid != null && modulid > 0) {
            criteria.add(Restrictions.eq("id", modulid));
        }
        if (type != null && type > 0) {
            criteria.add(Restrictions.eq("type", type));
        }
        if (status != null && status > 0) {
            criteria.add(Restrictions.eq("status", status));
//            criteria.add(Restrictions.eq("moduleTypeDTO.status", status));
        }
        if (display != null) {
            criteria.add(Restrictions.sqlRestriction(" usedby&1<< " + display.ordinal()));
        }
        if (forumid != null) {
            criteria.add(Restrictions.eq("forumid", forumid));
        }
        criteria.addOrder(Order.asc("pos"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return criteria;
    }


    public List<ModuleDTO> getModuleBydisplaypos(Integer projId,  Integer forumid,  ModuleDisplay displaypos , ModulePosType modulePosType, UserDTO forUserDTO ) {
        UserDTO curUserDTO = getCurrentLoggedUser();

        List<ModuleDTO> moduleDTOList = null;
         if (displaypos == ModuleDisplay.Dashboard || displaypos == ModuleDisplay.List) {
             moduleDTOList = getModules(projId, forumid, displaypos, curUserDTO);
         } else if (displaypos == ModuleDisplay.ItemPanel) {
             moduleDTOList = getItemPanelModules(projId,  forumid, curUserDTO);
         }  else if (displaypos == ModuleDisplay.UserArticle || displaypos == ModuleDisplay.UserComments || displaypos == ModuleDisplay.UserNotification || displaypos == ModuleDisplay.UserProfile) {
             moduleDTOList = getUserPanelModules(projId,  forumid, displaypos, curUserDTO);
         } else if (displaypos == ModuleDisplay.OurTeam) {
             moduleDTOList = getUserPanelModules(projId,  forumid, displaypos, curUserDTO);
         }

        return moduleDTOList;
     }

    @Cacheable( value = "modules")
    @Transactional
    private  List<ModuleDTO> getUserPanelModules(Integer projId,  Integer forumid, ModuleDisplay moduleDisplay,  UserDTO user) {
        List<ModuleDTO> moduleDTOList = getModuleCriteria(projId, 0, forumid, moduleDisplay, 0, 1).list();
        moduleDTOList.addAll(getModuleCriteria(projId, 0, 0, moduleDisplay, 0, 1).list() );

        return  moduleDTOList;
    }

//    @Cacheable( value = "modules")
//    @Transactional
//    private  List<ModuleDTO> getOurTeamModules(Integer projId,  Integer forumid, ModuleDisplay moduleDisplay,  UserDTO user) {
//        List<ModuleDTO> moduleDTOList = getModuleCriteria(projId, 0, forumid, moduleDisplay, 0, 1).list();
//        moduleDTOList.addAll(getModuleCriteria(projId, 0, 0, moduleDisplay, 0, 1).list() );
//
//        return  moduleDTOList;
//    }

    @Cacheable( value = "modules")
    @Transactional
    private  List<ModuleDTO> getItemPanelModules(Integer projId,  Integer forumid,  UserDTO user) {
        ForumDTO forumDTO = forumDAO.getForumById(projId, forumid);
        List<ModuleDTO> moduleDTOList = getModuleCriteria(projId, 0,  forumid, ModuleDisplay.ItemPanel, 0, 1).list();
        if (user != null && user.getUserPermissionsDTO().getManager()) {
            moduleDTOList.add(getModuleById(projId, modulTopicControlid));
        }

        if (forumDTO.getSharingon()) {
            moduleDTOList.add(getModuleById(projId, modulShareid));
        }
        moduleDTOList.addAll(getModuleCriteria(projId, 0,0, ModuleDisplay.ItemPanel, 0, 1).list());
        return  moduleDTOList;
    }

    @Cacheable( value = "modules")
    @Transactional
    private  List<ModuleDTO> getModules(Integer projId,  Integer forumid, ModuleDisplay moduleDisplay,  UserDTO user) {
        List<ModuleDTO> moduleDTOList = getModuleCriteria(projId, 0, forumid, moduleDisplay , 0, 1).list();
        return  moduleDTOList;
    }

//    @Cacheable( value = "modules")
//    @Transactional
//    private  List<ModuleDTO> getListModules(Integer projId,  Integer forumid,  UserDTO user) {
//        List<ModuleDTO> moduleDTOList = getModuleCriteria(projId, 0, forumid, ModuleDisplay.List, 0, 1).list();
//        return  moduleDTOList;
//    }

//    @Cacheable( value = "modules")
//    @Transactional
//    public List<ModuleDTO> getModuleBydisplaypos(Integer projId, Integer id, Integer forumid,  ModuleDisplay displaypos, Integer type  ){
//        return getModuleCriteria(projId, id, forumid, displaypos, type, 0).list();
//    }

    @CacheEvict(value = "modules" ,   allEntries = true)
    public  Boolean deleteModule(Integer projId,Integer moduleID){
        ModuleDTO moduleDTO=getModuleById(projId,moduleID);
        moduleDTO.setStatus(0);
        save(moduleDTO);
        return true;
    }

    @CacheEvict(value = "modules" ,   allEntries = true)
    @Transactional
    public void addModuleParams(Integer projId, Integer moduleid, List<ModuleParamsDTO> moduleParamsDTOs){
        ModuleDTO moduleDTO=getModuleById(projId, moduleid);
        for (ModuleParamsDTO moduleParamsDTO: moduleParamsDTOs){
            if (moduleDTO.getParams().get(moduleParamsDTO.getTypekey())!=null ){
                currentSession().delete(moduleDTO.getParams().get(moduleParamsDTO.getTypekey()));
                currentSession().flush();
            }
            currentSession().saveOrUpdate(moduleParamsDTO);
        }
    }

    @CacheEvict(value = "modules" ,   allEntries = true)
    public  Boolean createModule(Integer forumid , ModuleDisplay displaypos , ModulePosType modulePosType, Integer modType ) throws Exception {
        UserDTO userDTO=getCurrentLoggedUser();
        if ((userDTO== null) || !userDTO.getUserPermissionsDTO().getManageusers()){
            throw new Exception("You don't have permission " );
        }
        ModuleTypeDTO moduleTypeDTO=getModuleTypebyId(modType);
        if (moduleTypeDTO== null) {
            LOG.error("Can't find module: " + modType + " fo forum: "+ forumid);
            return false;
        }

        ModuleDTO moduleDTO= new ModuleDTO(forumid,moduleTypeDTO);
        moduleDTO.setDispos(modulePosType);

        saveModule(moduleDTO);
        return  true;

    }

    @Cacheable( value = "moduleLinkDTO")
    public  List<ModuleLinkDTO> getModuleLinksDTObyModuleId(Integer modulid) {
        return currentSession().createQuery("from ModuleLinkDTO ml where ml.modid=:modid order by  ml.pos")
                .setParameter("modid", modulid).list();

    }

    @Cacheable( value = "moduleLinkDTO")
    public  ModuleLinkDTO getModuleLinksDTObyId(Integer modulid, Integer linkid) {
        return (ModuleLinkDTO) currentSession().createQuery("from ModuleLinkDTO ml where ml.modid=:modid and ml.id=:linkid")
                .setParameter("linkid", linkid)
                .setParameter("modid", modulid).uniqueResult();

    }


    @CacheEvict(value = "moduleLinkDTO" ,   allEntries = true)
    public  boolean deleteModuleLinksDTO(Integer modulid, Integer linkid){
        ModuleLinkDTO moduleLinkDTO= getModuleLinksDTObyId (modulid, linkid );
        if (moduleLinkDTO != null) {
            currentSession().delete(moduleLinkDTO);
        }

        return true;
    }

    @CacheEvict(value = "moduleLinkDTO" ,   allEntries = true)
    public  ModuleLinkDTO saveModuleLinksDTO(ModuleLinkDTO moduleLinkDTO){
        if (moduleLinkDTO.getPos() == null){
            moduleLinkDTO.setPos(getMaxLinkPos(moduleLinkDTO.getModid())+1 );
        }
        currentSession().saveOrUpdate(moduleLinkDTO);
        return moduleLinkDTO;
    }

    protected Integer getMaxLinkPos(Integer modulid){
        Criteria criteria = currentSession()
                .createCriteria(ModuleLinkDTO.class)
                .setProjection(Projections.max("pos"));
        criteria.add(Restrictions.eq("modid", modulid));
        Integer maxPos = (Integer) criteria.uniqueResult();
        return maxPos== null?0:maxPos;
    }

    @CacheEvict(value = "moduleLinkDTO" ,   allEntries = true)
    public boolean moveModuleLink(Integer projId, Integer moduleID, Integer linkId,  String direction){
        ModuleLinkDTO moduleLinkDTO= getModuleLinksDTObyId(moduleID, linkId);

        List<ModuleLinkDTO> moduleLinkDTOs=getModuleLinksDTObyModuleId(moduleID);

        ModuleLinkDTO prevModuleLink = null;
        Boolean change=false;
        for (ModuleLinkDTO links:moduleLinkDTOs){
//            if (links.getDispos()!= moduleDTO.getModuleTypeDTO().getDispos() ) continue;

            if (change) {
                swapPos(links, prevModuleLink);
                return true;
            }

            if (Objects.equals(links.getId(), linkId)) {
                if (Objects.equals(direction, "up")) {
                    if (prevModuleLink != null ){swapPos(links, prevModuleLink);}
                    return true;
                }
                change=true;
            }
            prevModuleLink=links;
        }
        return true;
    }

}

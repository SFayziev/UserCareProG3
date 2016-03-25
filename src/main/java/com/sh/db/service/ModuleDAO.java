package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.ModuleDTO;
import com.sh.db.map.ModuleParamsDTO;
import com.sh.db.map.ModuleTypeDTO;
import com.sh.db.map.UserDTO;
import com.sh.utils.ForumType;
import com.sh.utils.ModuleDisplay;
import com.sh.utils.ModulePosType;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
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
        List<ModuleDTO> moduleDTOList=getModuleBydisplaypos(projId, 0, moduleDTO.getForumid() , moduleDTO.getDisplay());
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

    private  Criteria getModuleCriteria (Integer projId, Integer id, Integer forumid, ModuleDisplay display, Integer type, Integer status){
        Criteria criteria = currentSession()
                .createCriteria( ModuleDTO.class);

        if(id!= null && id>0) criteria.add(Restrictions.eq("id", id));

        if(type!= null && type>0) criteria.add(Restrictions.eq("type", type));
        if(status!= null && status>0) {
            criteria.add(Restrictions.eq("status", status));
//            criteria.add(Restrictions.eq("moduleTypeDTO.status", status));
        }
        if (display!= null)criteria.add(Restrictions.eq("display", display ));
        if (forumid!= null) criteria.add(Restrictions.eq("forumid", forumid ));
        criteria.addOrder(Order.asc("pos"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return criteria;
    }

    @Cacheable( value = "modules")
    @Transactional
    public List<ModuleDTO> getModuleBydisplaypos(Integer projId, Integer id, Integer forumid,  ModuleDisplay displaypos  ){
        return getModuleCriteria(projId, id, forumid, displaypos, 0, 1).list();
     }

    @Cacheable( value = "modules")
    @Transactional
    public List<ModuleDTO> getModuleBydisplaypos(Integer projId, Integer id, Integer forumid,  ModuleDisplay displaypos, Integer type  ){
        return getModuleCriteria(projId, id, forumid, displaypos, type, 0).list();
    }

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

        ModuleDTO moduleDTO= new ModuleDTO(forumid,moduleTypeDTO, displaypos);
        moduleDTO.setDispos(modulePosType);

        saveModule(moduleDTO);
        return  true;

    }

}

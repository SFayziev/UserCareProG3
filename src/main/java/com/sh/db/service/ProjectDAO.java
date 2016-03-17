package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.*;
import com.sh.utils.Context;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by shuhrat on 16.08.2015.
 */
@Controller
@Transactional
public class ProjectDAO extends GenericDaoImpl<ProjectDTO> {
    private static final Logger LOG = Logger.getLogger(ProjectDAO.class);

    @Autowired
    public ProjectDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    /**
     * Get active project by name or url
     * @param name - project name
     * @param URL  - project url
     * @return
     */
    public ProjectDTO getbyName(String name, String URL){
        return (ProjectDTO) getSessionFactory().getCurrentSession().createQuery("from ProjectDTO as proj where proj.status=1 and proj.name=:name" )
                .setCacheable(true).setParameter("name", name).uniqueResult();
    }

    @Cacheable( value = "projectid")
    public ProjectDTO  getProjectbyId(Integer id){
        return (ProjectDTO) getSessionFactory().getCurrentSession().createQuery("from ProjectDTO as proj where proj.status=1 and proj.id=:id" )
                .setCacheable(true).setParameter("id", id).uniqueResult();
    }

    @CacheEvict(value = "projectid" ,   allEntries = true)
    public ProjectDTO saveProject(ProjectDTO projectDTO){
         return  this.save(projectDTO);
    }

    /**
     * Get active Project by Alias
     * @param alias
     * @return
     *
     */
    @Cacheable(value = "projectid")
    public ProjectDTO getbyAlias(String alias, String URL){
        return (ProjectDTO) getSessionFactory().getCurrentSession().createQuery("from ProjectDTO as proj where proj.status=1 and proj.alias=:alias" )
                .setCacheable(true).setParameter("alias", alias).uniqueResult();
    }


    /**
     * Get active Project by Alias
     * @param alias
     * @return
     */
    public ProjectDTO getbyAlias(String alias){
        return getbyAlias(alias, null);
    }

    @Cacheable( value = "projectStatsDTO" )
    @Transactional
    public ProjectStatsDTO getProjectStats(Integer projid){
        ProjectStatsDTO projectStatsDTO= (ProjectStatsDTO) currentSession().createQuery("from ProjectStatsDTO pjs where pjs.projid=:projid").setCacheable(true)
                .setParameter("projid", projid).uniqueResult();
       return  projectStatsDTO== null?new ProjectStatsDTO(projid):projectStatsDTO;
    }

    @CacheEvict(value = "projectStatsDTO",  allEntries = true)
    public ProjectStatsDTO saveProjectStat(ProjectStatsDTO projectStatsDTO){
        currentSession().saveOrUpdate(projectStatsDTO);
        return projectStatsDTO;
    }


    @Cacheable( value = "languagesDTO" )
    public List<LanguagesDTO> getProjectLangs(Integer projid){
        return  getSessionFactory().openSession().createSQLQuery("SELECT lan.*, if(pro.id,1,0) as status  FROM usercare.languages as lan left OUTER join (select * from usercare.project  where id=:projid) as pro on pro.lang&1<<lan.id>0 ")
        .addEntity(LanguagesDTO.class).setParameter("projid", projid).list();
    }

    @Cacheable( value = "languagesDTO" )
    public List<LanguagesDTO> getProjectActiveLangs(Integer projid){
        return  getSessionFactory().openSession().createSQLQuery("SELECT lan.*, 1  as status  FROM usercare.languages as lan  join (select * from usercare.project  where id=:projid) as pro on pro.lang&1<<lan.id>0 ")
                .addEntity(LanguagesDTO.class).setParameter("projid", projid).list();
    }

    @Cacheable( value = "languagesDTO" )
    public LanguagesDTO getProjectLangbyId(Integer projid, Integer langid){
        return (LanguagesDTO) getSessionFactory().openSession().createSQLQuery("SELECT lan.*, 1  as status FROM usercare.languages as lan left OUTER join (select * from usercare.project  where id=:projid) as pro on pro.lang&1<<lan.id>0  where lan.id = :langid")
                .addEntity(LanguagesDTO.class)
                .setParameter("langid", langid)
                .setParameter("projid", projid).uniqueResult();

    }


    @Cacheable( value = "languagesDTO" )
    public LanguagesDTO getLanguageByKey(String key){
        return (LanguagesDTO) getSessionFactory().openSession().createSQLQuery("SELECT *, 1  as status  FROM usercare.languages as lan  where lan.namesmall=:key ").addEntity(LanguagesDTO.class).setParameter("key", key).uniqueResult();
    }

    @CacheEvict(value = "projectid" ,   allEntries = true)
    public ProjectDesignDTO saveProjectDesign(ProjectDesignDTO projectDesignDTO){
        currentSession().saveOrUpdate(projectDesignDTO);
        return projectDesignDTO;
    }


    public ProjectDesignDTO getProjectDesign(Integer projid){
        return (ProjectDesignDTO) currentSession().createQuery("from ProjectDesignDTO  pj where  pj.projectDTO.id=:projid").setCacheable(true)
                .setParameter("projid", projid).uniqueResult();
    }

    @CacheEvict(value = "projectid" ,   allEntries = true)
    public void addProjectParams(ProjectDTO projectDTO,  List<ProjectParamsDTO> projectParamsDTOs){
        for (ProjectParamsDTO projectParamsDTO: projectParamsDTOs){
            if (projectDTO.getParams().get(projectParamsDTO.getTypekey())!=null ){

                currentSession().delete(projectDTO.getParams().get(projectParamsDTO.getTypekey()));
                currentSession().flush();
            }

            currentSession().saveOrUpdate(projectParamsDTO);
            projectDTO.getParams().put(projectParamsDTO.getTypekey(), projectParamsDTO );
        }
    }


    public void createProject(ProjectDTO projectDTO ){

// TODO: create balace;
    }
}

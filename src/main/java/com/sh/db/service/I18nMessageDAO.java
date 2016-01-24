package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.I18nMessageDTO;
import com.sh.db.map.ProjectDTO;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by Admin on 18.11.2015.
 */
@Controller
@Transactional
public class I18nMessageDAO extends GenericDaoImpl<I18nMessageDTO> {

    private static final Logger LOG = Logger.getLogger(I18nMessageDAO.class);

    @Autowired
    public I18nMessageDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    @Transactional
    public I18nMessageDTO saveI18nMessage(ProjectDTO projectDTO  , I18nMessageDTO i18nMessageDTO  ){

        I18nMessageDTO loadI18nMessageDTO=projectDTO.getI18nMessages().get(i18nMessageDTO.getMkey());
        if ((i18nMessageDTO.getId()== null) &&  (null!=loadI18nMessageDTO)){
            return i18nMessageDTO;
        }
        else {
            currentSession().saveOrUpdate(i18nMessageDTO);
        }
        projectDTO.reInitializeI18n();
        return i18nMessageDTO;
    }


    public List<I18nMessageDTO> getI18nMessage (ProjectDTO projectDTO ){
        return  currentSession().createQuery("from I18nMessageDTO i18n where i18n.projectDTO.id=:projid ")
                .setParameter("projid", projectDTO.getId()).list();
    }

    public I18nMessageDTO getI18nMessageKey (ProjectDTO projectDTO,String  mkey ){
        return (I18nMessageDTO) currentSession().createQuery("from I18nMessageDTO i18n where i18n.projectDTO.id=:projid and i18n.mkey=:mkey ")
                .setParameter("projid", projectDTO.getId()).setParameter("mkey", mkey).uniqueResult();

    }


}

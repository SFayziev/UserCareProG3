package com.sh.db.service;

import com.sh.db.GenericDaoImpl;
import com.sh.db.map.module.ModuleParamsDTO;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Lenovo on 05.11.2015.
 */
@Controller
@Transactional
public class ParamsDAO extends GenericDaoImpl<ModuleParamsDTO> {

    private static final Logger LOG = Logger.getLogger(ParamsDAO.class);


    @Autowired
    public ParamsDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

}

package com.sh.db.bl;

import com.sh.db.service.ArticleDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Admin on 26.04.2016.
 */
@Component
public class ArticleBL {

    @Autowired
    PermissionBL permissionBL;

    @Autowired
    ArticleDAO articleDAO;


}

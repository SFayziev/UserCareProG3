package com.sh.db.map;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Admin on 15.09.2015.
 */
@Entity
@Table(name = "user_group",  catalog = "usercare")
@Cacheable
public class UserGrDTO extends IntEntity {
    private  String groupname;

    public String getGroupname() {
        return groupname;
    }

    @Override
    public String toString() {
        return "UserGrDTO{" +
                "groupname='" + groupname + '\'' +
                '}';
    }
}

package com.sh.db.map.topics;

import com.sh.db.map.IntEntity;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Admin on 22.04.2016.
 */

@Entity
@Table(name = "status_logical_group",  catalog = "usercare")
public class LogicalGroupDTO  extends IntEntity{
    private  String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "LogicalGroupDTO{" +
                "name='" + name + '\'' +
                '}';
    }
}


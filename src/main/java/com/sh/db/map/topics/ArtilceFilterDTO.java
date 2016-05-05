package com.sh.db.map.topics;

import com.sh.db.map.IntEntity;
import com.sh.db.map.forum.ForumDTO;
import com.sh.db.map.project.ProjectDTO;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Admin on 05.05.2016.
 */
@Entity
@Table(name = "article_filter",  catalog = "usercare")
public class ArtilceFilterDTO extends IntEntity {
    private String filtername;
    private String i8nvalue;
    private String value;
    private Integer userid;
    private Integer projid;

    public Integer getProjid() {
        return projid;
    }

    public void setProjid(Integer projid) {
        this.projid = projid;
    }

    public String getFiltername() {
        return filtername;
    }

    public void setFiltername(String filtername) {
        this.filtername = filtername;
    }

    public String getI8nvalue() {
        return i8nvalue;
    }

    public void setI8nvalue(String i8nvalue) {
        this.i8nvalue = i8nvalue;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

}

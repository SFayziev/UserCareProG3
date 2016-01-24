package com.sh.db.map;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Lenovo on 29.11.2015.
 */
@Entity
@Table(name = "forum_tags",  catalog = "usercare")
public class ForumTagsDTO extends IntEntity {

private  Integer forumid;
private  String name;

    public ForumTagsDTO(Integer forumid, String name) {
        this.forumid = forumid;
        this.name = name;
    }

    public ForumTagsDTO() {

    }

    public Integer getForumid() {
        return forumid;
    }

    public void setForumid(Integer forumid) {
        this.forumid = forumid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ForumTagsDTO{" +
                "forumid=" + forumid +
                ", tag='" + name + '\'' +
                "} " + super.toString();
    }
}

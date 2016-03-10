package com.sh.db.map;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Admin on 01.12.2015.
 */
@Entity
@Table(name = "forum_status",  catalog = "usercare")
public class ForumStatusDTO extends  IntEntity{
    private  Integer pos=255;
    @NotNull
    private Integer forumid;

    @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    @JoinColumn(name = "articstatusid")
    private ArticleStatusDTO articleStatusDTO;

    public Integer getPos() {
        return pos;
    }

    public ForumStatusDTO(Integer forumid, ArticleStatusDTO articleStatusDTO) {
        this.forumid = forumid;
        this.articleStatusDTO = articleStatusDTO;
    }

    public ForumStatusDTO() {

    }
    public ForumStatusDTO(Integer forumid) {
        this.forumid = forumid;

    }


    public void setPos(Integer pos) {
        this.pos = pos;
    }

    public Integer getForumid() {
        return forumid;
    }

    public void setForumid(Integer forumid) {
        this.forumid = forumid;
    }

    public ArticleStatusDTO getArticleStatusDTO() {
        return articleStatusDTO;
    }

    public void setArticleStatusDTO(ArticleStatusDTO articleStatusDTO) {
        this.articleStatusDTO = articleStatusDTO;
    }

    @Override
    public String toString() {
        return "ForumStatusDTO{" +
                "pos=" + pos +
                ", forumid=" + forumid +
                ", articleStatusDTO=" + articleStatusDTO +
                '}';
    }
}

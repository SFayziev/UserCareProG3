package com.sh.db.map;

import javax.persistence.*;

/**
 * Created by Admin on 02.12.2015.
 */
@Entity
@Table(name = "forum_type_status",  catalog = "usercare")
public class ForumTypeStatusDTO extends IntEntity {
    private  Integer projid;
    private  Integer forumid;

    private  String  custname;



    public ForumTypeStatusDTO() {
    }

    public ForumTypeStatusDTO(Integer projid , ForumStatusDTO forumStatusDTO, ForumTypeDTO forumTypeDTO, String custname) {
        this.forumStatusDTO = forumStatusDTO;
        this.forumTypeDTO = forumTypeDTO;
        this.custname = custname;
        this.forumid=forumTypeDTO.getForumid();
        this.projid=projid;
    }

    public ForumTypeStatusDTO(ArticleStatusDTO articleStatusDTO,  String custname) {
        this.forumStatusDTO = forumStatusDTO;
        this.custname = custname;
        this.projid=articleStatusDTO.getProjid();
    }


    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    @JoinColumn(name = "typeid")
    private ForumTypeDTO forumTypeDTO ;

    public ForumTypeDTO getForumTypeDTO() {
        return forumTypeDTO;
    }

    public void setForumTypeDTO(ForumTypeDTO forumTypeDTO) {
        this.forumTypeDTO = forumTypeDTO;
    }

    @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    @JoinColumn(name = "forumstatusid")
    private ForumStatusDTO forumStatusDTO;

    public ForumStatusDTO getForumStatusDTO() {
        return forumStatusDTO;
    }

    public void setForumStatusDTO(ForumStatusDTO forumStatusDTO) {
        this.forumStatusDTO = forumStatusDTO;
    }

    public Integer getProjid() {
        return projid;
    }

    public void setProjid(Integer projid) {
        this.projid = projid;
    }

    public Integer getForumid() {
        return forumid;
    }

    public void setForumid(Integer forumid) {
        this.forumid = forumid;
    }



    public String getCustname() {
        return custname;
    }

    public void setCustname(String custname) {
        this.custname = custname;
    }

    @Override
    public String toString() {
        return "ForumTypeStatusDTO{" +
                "projid=" + projid +
                ", forumid=" + forumid +
                ", custname='" + custname + '\'' +
                '}';
    }
}

package com.sh.db.map;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Admin on 30.11.2015.
 */
@Entity
@Table(name = "forum_type",  catalog = "usercare")
public class ForumTypeDTO extends IntEntity {

    @NotNull
    private  Integer forumid;
    private  Integer pos=255;
    private Boolean enable=true;
    private Boolean useraccess=true;

    @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL )
    @JoinColumn(name = "articletypeid")
    private ArticleTypeDTO articleTypeDTO;

    public ForumTypeDTO(Integer forumid, String name) {
        this.forumid = forumid;
        this.articleTypeDTO = new ArticleTypeDTO(name);
        this.pos=255;
    }

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "forumTypeDTO")
    List<ForumTypeStatusDTO> typeStatusDTOList ;

    public List<ForumTypeStatusDTO> getTypeStatusDTOList() {
        if (typeStatusDTOList== null){typeStatusDTOList= new ArrayList<ForumTypeStatusDTO>();}
        return typeStatusDTOList;
    }

    public List<ForumStatusDTO> markIsinType(List<ForumStatusDTO> forumStatusesList){
        for (ForumStatusDTO forumStatusDTO: forumStatusesList ){
            forumStatusDTO.getArticleStatusDTO().setIsInForumType(false);
            for(ForumTypeStatusDTO forumTypeStatusDTO:getTypeStatusDTOList()){
                if (forumStatusDTO.getArticleStatusDTO().getId()==forumTypeStatusDTO.getForumStatusDTO().getArticleStatusDTO().getId() ) forumStatusDTO.getArticleStatusDTO().setIsInForumType(true);
            }
        }

        return forumStatusesList;
    }

    public ForumTypeStatusDTO getTypeStatusbyArticStatusid(Integer articiStatusid){
        for(ForumTypeStatusDTO forumTypeStatusDTO:getTypeStatusDTOList()){
            if (articiStatusid==forumTypeStatusDTO.getForumStatusDTO().getArticleStatusDTO().getId() ) return forumTypeStatusDTO;
        }
        return  null;
    }

    public void setTypeStatusDTOList(List<ForumTypeStatusDTO> typeStatusDTOList) {
        this.typeStatusDTOList = typeStatusDTOList;
    }

    public void addTypeStatusDTO(ForumTypeStatusDTO forumTypeStatusDTO){
        forumTypeStatusDTO.setForumTypeDTO(this);
        Boolean changed=false;
        for(ForumTypeStatusDTO forumTypeStatusDTO1: getTypeStatusDTOList() ){
            if (forumTypeStatusDTO.getForumStatusDTO().getArticleStatusDTO()==forumTypeStatusDTO1.getForumStatusDTO().getArticleStatusDTO()){
                changed=true;
                forumTypeStatusDTO1.setCustname(forumTypeStatusDTO.getCustname());
            }
        }
        if (!changed){
            getTypeStatusDTOList().add(forumTypeStatusDTO);
        }
    }



    public Boolean getUseraccess() {
        return useraccess;
    }

    public void setUseraccess(Boolean useraccess) {
        this.useraccess = useraccess;
    }

    public ForumTypeDTO() {

    }
    public Integer getForumid() {
        return forumid;
    }

    public void setForumid(Integer forumid) {
        this.forumid = forumid;
    }

    public Integer getPos() {
        return pos;
    }

    public void setPos(Integer pos) {
        this.pos = pos;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public ArticleTypeDTO getArticleTypeDTO() {
        if (articleTypeDTO== null) { articleTypeDTO= new ArticleTypeDTO(); }
        return articleTypeDTO;
    }

    public void setArticleTypeDTO(ArticleTypeDTO articleTypeDTO) {
        this.articleTypeDTO = articleTypeDTO;
    }


    @Override
    public String toString() {
        return "ForumTypeDTO{" +
                "forumid=" + forumid +
                ", pos=" + pos +
                ", enable=" + enable +
                ", articleTypeDTO=" + articleTypeDTO +
                "} " + super.toString();
    }
}

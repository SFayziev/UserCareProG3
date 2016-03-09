package com.sh.db.map;

import com.sh.utils.TimeAgo;
import org.grails.web.json.JSONObject;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by shuhrat on 27.08.2015.
 */
@Entity
@Table(name = "article",  catalog = "usercare")

public class ArticleDTO extends IntEntity{

    private  String text;
    private  Date createdate=new Date();
    private  Date lastchange= new Date();
    private  String  title;
    private  Integer projid;
    private Boolean privateMsg=false;
    private Boolean deleted=false;
    private  Integer votes=0;
    private  Integer views=0;
//    private  Integer replies=0;
    private  Integer followers=0;
    private  Integer comments=0;
    private  Integer voteup=0;
    private  Integer votedown=0;
    private Integer disabled=0;
    private Integer  answerCommentid;

    @Transient
    private Boolean canVote=true;

    public Integer getAnswerCommentid() {
        return answerCommentid;
    }

    public void setAnswerCommentid(Integer answerCommentid) {
        this.answerCommentid = answerCommentid;
    }

    public Boolean getCanVote() {
        return canVote;
    }

    public void setCanVote(Boolean canVote) {
        this.canVote = canVote;
    }

    public Integer getDisabled() {
        return disabled;
    }

    public void setDisabled(Integer disabled) {
        this.disabled = disabled;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    @Transient
    private TimeAgo timeAgo;
    @Transient
    private TimeAgo timeUpdateAgo;
    public Integer getProjid() {
        return projid;
    }

    public void setProjid(Integer projid) {
        this.projid = projid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public TimeAgo getTimeAgo() {
        if (timeAgo== null){  timeAgo= new TimeAgo(createdate);}
        return timeAgo;
    }

    public TimeAgo getTimeUpdateAgo() {
        if (timeUpdateAgo== null){  timeUpdateAgo= new TimeAgo(lastchange);}
        return timeUpdateAgo;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) { this.createdate = createdate;
    }

    public Date getLastchange() {
        return lastchange;
    }

    public void setLastchange(Date lastchange) {
        this.lastchange = lastchange;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }



    @NotNull
    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE )
    @JoinColumn(name = "forumid")
    ForumDTO forumDTO;

    public ForumDTO getForumDTO() {
        return forumDTO;
    }

    public void setForumDTO(ForumDTO forumDTO) {
        this.forumDTO = forumDTO;
    }

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE  )
    @JoinColumn(name = "catid")
    CategoriesDTO categoriesDTO;

    public CategoriesDTO getCategoriesDTO() {
        return categoriesDTO;
    }

    public void setCategoriesDTO(CategoriesDTO categoriesDTO) {
        this.categoriesDTO = categoriesDTO;
    }

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE )
    @JoinColumn(name = "status")
    @NotFound(action = NotFoundAction.IGNORE)
    private ArticleStatusDTO statusDTO;

    public ArticleStatusDTO getStatusDTO() {
        return statusDTO== null?new ArticleStatusDTO():statusDTO  ;
    }

    public void setStatusDTO(ArticleStatusDTO statusDTO) {
        this.statusDTO = statusDTO;
    }


    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE )
    @JoinColumn(name = "type")
    @NotFound(action = NotFoundAction.IGNORE)
    private ForumTypeDTO  type;

    public ForumTypeDTO getType() {
        return type;
    }

    public void setType(ForumTypeDTO type) {
        this.type = type;
    }

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE)
    @JoinColumn(name = "userid")
    private UserDTO userDTO;

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE )
    @JoinColumn(name = "updateduser")
    private UserDTO updatedUserDTO;

    @OneToMany(fetch = FetchType.LAZY , cascade = CascadeType.MERGE, mappedBy = "articleDTO")
    private List<ArticleTagsDTO> articleTagsDTOs;

    public List<ArticleTagsDTO> getArticleTagsDTOs() {
        return articleTagsDTOs;
    }

    public void setArticleTagsDTOs(List<ArticleTagsDTO> articleTagsDTOs) {
        this.articleTagsDTOs = articleTagsDTOs;
    }

    @ManyToOne(fetch = FetchType.LAZY ,cascade = CascadeType.MERGE )
    @JoinColumn(name = "assigneduser")
    private UserDTO assignedUserDTO;

    public UserDTO getUpdatedUserDTO() {
        return updatedUserDTO;
    }

    public void setUpdatedUserDTO(UserDTO updatedUserDTO) {
        this.updatedUserDTO = updatedUserDTO;
    }

    public UserDTO getAssignedUserDTO() {
        return assignedUserDTO;
    }

    public void setAssignedUserDTO(UserDTO assignedUserDTO) {
        this.assignedUserDTO = assignedUserDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }


    public Boolean getPrivateMsg() {
        return privateMsg;
    }

    public void setPrivateMsg(Boolean privateMsg) {
        this.privateMsg = privateMsg;
    }




    public String toJson(String mass ){
        JSONObject resultJson = new JSONObject();
        JSONObject values = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("articleid",getId());
        resultJson.put("projectid", getProjid());
        resultJson.put("massage", mass);

        values.put("votes",votes);
        values.put("voteup", voteup );
        values.put("votedown", votedown );
        values.put("votesum", getVoteSum() );

        values.put("comments", comments);
        values.put("views", views);

//        values.put("views", views);
        resultJson.put("values",values);
        return resultJson.toString();
    }


    public Integer getVoteup() {
        return voteup;
    }

    public void setVoteup(Integer voteup) {
        this.voteup = voteup;
    }

    public Integer getVotedown() {
        return votedown;
    }

    public void setVotedown(Integer votedown) {
        this.votedown = votedown;
    }

    public Integer getComments() {

        return comments== null?0:comments ;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }


    public Integer getVotes() {
        return votes;
    }

    public Integer votesPlus(){
        return  votesPlus(1);
    }

    public Integer votesPlus(Integer value){
        this.votes++;
        voteup=voteup+value;
        return votes;
    }

    public Integer votesDown(){
        return  votesDown(-1);
    }

    public Integer votesDown(Integer value){
        this.votes++;
        votedown=votedown+value;
        return votes;
    }

    public Integer voteUndo(Integer value){
        this.votes=this.votes-2;
        return  value>0?votesPlus(-value):votesDown(-value);
    }

    public Integer getVoteSum(){
        return votedown+voteup;
    }

    public Integer  viewsPlus(){
        return  this.views++;

    }

    public Integer  commentsPlus(){
        return  this.comments++;

    }
    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }


    public Integer getFollowers() {
        return followers== null?0:followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }



    @Override
    public String toString() {
        return "ArticleDTO{" +
                "id='" + id + '\'' +
                "text='" + text + '\'' +

                ", type=" + type +
                ", createdate=" + createdate +
                ", lastchange=" + lastchange +
                ", title='" + title + '\'' +
                ", projid=" + projid +
                '}';
    }
}

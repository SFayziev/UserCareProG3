package com.sh.common;

import com.sh.db.map.*;
import com.sh.db.map.file.FileDTO;
import com.sh.db.map.file.ImgDTO;
import com.sh.db.map.forum.*;
import com.sh.db.map.module.ModuleDTO;
import com.sh.db.map.module.ModuleLinkDTO;
import com.sh.db.map.module.ModuleParamsDTO;
import com.sh.db.map.module.ModuleTypeDTO;
import com.sh.db.map.project.*;
import com.sh.db.map.topics.ArticleDTO;
import com.sh.db.map.topics.ArticleStatusDTO;
import com.sh.db.map.topics.ArticleTagsDTO;
import com.sh.db.map.topics.CommentDTO;
import com.sh.db.map.user.OauthidDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.map.user.UserPermissionsDTO;
import com.sh.db.service.*;

import com.sh.utils.ForumType;
import com.sh.utils.ImageType;
import com.sh.utils.ModuleDisplay;
import com.sh.utils.ModulePosType;
import com.sh.utils.exception.N18iException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

/**
 * Created by shuhrat on 27.08.2015.
 */
public class WebServicesSessionSpringBean {
    private static final Logger LOG = Logger.getLogger(WebServicesSessionSpringBean.class);

    @Autowired
    ModuleDAO moduleDAO;

    @Autowired
    ProjectDAO projectDAO ;

    @Autowired
    ArticleDAO articleDAO;

    @Autowired
    ForumDAO forumDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    FileDAO fileDAO;

    @Autowired
    I18nMessageDAO i18nMessageDAO;

    public ProjectDTO getProject(HttpServletResponse response, HttpServletRequest request, HttpSession session) throws IOException {

        String urlpath = new URL(request.getRequestURL().toString()).getHost();

        String url;
        try {
            url = urlpath.substring(0,urlpath.indexOf(".") );
        } catch (Exception e) {

            LOG.error( String.format("Can't get project name from %s : %s " , urlpath, e.getMessage()));
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }

        if (url.length()>0){
            if (session.getAttribute("project_alis")!= null && session.getAttribute("project_alis").equals(url)){
                return getProjectbyId(Integer.parseInt(session.getAttribute("project_id").toString())) ;
            }
            else{
                ProjectDTO projectDTO=getProjectbyAlies(url);
                if (projectDTO!= null){
                    session.setAttribute("project_id",projectDTO.getId());
                    session.setAttribute("project_alis",projectDTO.getAlias());
                    session.setAttribute("project_name",projectDTO.getName());
                  }
                else{
                    response.sendError(HttpServletResponse.SC_NOT_FOUND);
                }

                return  projectDTO;
            }
        }
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
        return null;
    }
// Projects
    public ProjectDTO updateProject(ProjectDTO projectDTO) {return  projectDAO.saveProject(projectDTO);}
    public ProjectDTO getProjectbyId(int id){return projectDAO.getProjectbyId(id);}
    public ProjectDTO getProjectbyName(String name){return projectDAO.getbyName(name, null);}
    public  List<LanguagesDTO> getProjectLang(Integer projid){return projectDAO.getProjectLangs(projid);}
    public  List<LanguagesDTO> getProjectActiveLangs(Integer projid){return projectDAO.getProjectActiveLangs(projid);}
    public LanguagesDTO getProjectLangbyId(Integer projid, Integer langid){return projectDAO.getProjectLangbyId(projid, langid); }
    public LanguagesDTO getLanguageByKey(String key){return  projectDAO.getLanguageByKey(key);}


    public ProjectStatsDTO getProjectStats(Integer projid){ return  projectDAO.getProjectStats(projid); }
    public List<UserDTO> getProjectStaffs(Integer projid, Integer limit){return userDAO.getProjectStaff(projid, limit, true); }
    public ProjectDTO getProjectbyAlies(String name){return projectDAO.getbyAlias(name, null);}
    public ProjectDesignDTO saveProjectDesign(ProjectDesignDTO projectDesignDTO) {return  projectDAO.saveProjectDesign(projectDesignDTO);}

    // Articles
//    public List<ArticleDTO> getLastArticle(Integer projectId, Integer start,Integer count, Integer status, Integer  type , String order,  Integer catid , ForumDTO  forumDTO , Integer langid){ return articleDAO.getLastArticle(projectId, start, count, status, type, order, catid, forumDTO, langid ) ; }
//    public ItemCount getLastArticleRecCount(Integer projectId,  Integer status, Integer  type ,    Integer catid , ForumDTO  forumDTO, Integer langid) { return articleDAO.getLastArticleRecCount(projectId, status, type, catid, forumDTO, langid); }
    public ItemCount getLastArticleRecCount(ProjectDTO  project, ForumDTO forumDTO, HashMap params) {return articleDAO.getLastArticleRecCount(project, forumDTO, params, true);}
    public  List<ArticleDTO> getArticleList(ProjectDTO  project, ForumDTO  forumDTO, HashMap params) {return  articleDAO.getArticleList(project, forumDTO, params); }

    public ArticleDTO getProjectArticle(Integer projid , Integer id ){return  articleDAO.getArticle(projid, id);}
    public CommentDTO addComment(CommentDTO commentDTO) {return  articleDAO.saveArticleComment(commentDTO);}
    public ArticleDTO addArticle(ArticleDTO  articleDTO) {return  articleDAO.saveArticle(articleDTO);}

    public CommentDTO commentVote(Integer commentId, Integer values, String userName, String remIP){ return  articleDAO.commentVote(commentId, values, userName, remIP); }
    public ArticleDTO articleVote(Integer projid , Integer articId, Integer values , String userName, String remIP ) throws N18iException { return  articleDAO.articleVote(projid, articId, values, userName, remIP); }

    public OauthidDTO findByProviderAndAccessToken(String providerName , String socialId ){ return userDAO.findByProviderAndAccessToken(providerName, socialId); }

    public UserDTO getUser(Integer projid,Integer userid){return userDAO.getProjectUserByid(projid, userid);}

    public UserDTO createLogin(UserDTO user){return  userDAO.createLogin(user);}
    public UserDTO saveProfile(UserDTO userDTO){ return  userDAO.saveProfile(userDTO);}
    public UserPermissionsDTO saveUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception {return  userDAO.saveUserPermission(userPermissionsDTO);}
    public void  deleteUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception { userDAO.deleteUserPermission(userPermissionsDTO);}
    public UserPermissionsDTO getUserPermission(Integer projid, Integer userid ) { return  userDAO.getUserPermission( projid, userid); }
    public List<UserDTO> getUsersList(Integer projId, Integer type, Integer status, String username , String email , Integer  start, Integer limit, String order ){ return  userDAO.getUsersList(projId, type, status, username, email, start, limit, order);}
    public UserDTO createAgentUser(Integer projid,  String email){return  userDAO.createAgentUser(projid, email);}

    public ArticleDTO assignArticle (Integer articid, Integer assignedUserId ){return articleDAO.assignArticTo(articid, assignedUserId); }
    public ArticleDTO assignArticleCategory(Integer articID, Integer catid) {return  articleDAO.assignArticleCategory(articID, catid);}
    public void deleteArticle(ArticleDTO article) { articleDAO.delArticle(article);}
    public List<ArticleTagsDTO> getArticleTags(Integer projid, Integer articid) { return articleDAO.getArticleTags(projid, articid ) ;}
    public void addTagtoArticle(Integer projid,  Integer articid, Integer tagid){ articleDAO.addTagtoArticle( projid, articid, tagid);}
    public void  delArticleTag(Integer projid,  Integer articid, Integer tagid) {articleDAO.delArticleTag(projid, articid, tagid);}
    public ArticleDTO moveToArticle(ArticleDTO articleDTO, Integer forumid, Integer forumType, Integer forumCategory) { return  articleDAO.moveToArticle(articleDTO, forumid, forumType, forumCategory ); }

//     Forum

    public List<ForumDTO> getForumByType(Integer projId, ForumType forumType) {return  forumDAO.getForumbyType(projId, forumType);}
    public ForumDTO getForumById(Integer projId, Integer forumid) {return  forumDAO.getForumById(projId, forumid);}
    public ForumDTO getForumById(Integer projId, Integer forumid, ForumType forumType) {return  forumDAO.getForumById(projId, forumid, forumType);}
    public List<ForumDTO> getForumbyProject(Integer projId) {return  forumDAO.getForumbyProject(projId);  }
    public ForumDTO saveForum(ForumDTO forumDTO){return forumDAO.saveForum(forumDTO); }
    public ForumDTO createForum(ProjectDTO projectDTO , String forumname, ForumType type){return forumDAO.createForum(projectDTO, type, forumname); }
    public List<CategoriesDTO> getCategoryByForumId(Integer projid, Integer forumid  ){return  forumDAO.getCategoryByForumId(projid, forumid);}
    public CategoriesDTO getCategoryById(Integer projid, Integer catid  ){return  forumDAO.getCategoryById(projid, catid, false);}
    public CategoriesDTO saveCategories(CategoriesDTO categoriesDTO){ return  forumDAO.saveCategories(categoriesDTO);}
    public boolean moveCategory(Integer projId, Integer catID, String direction){ return  forumDAO.moveCategory(projId, catID, direction);}
    public Boolean delCategoryById(Integer projid, Integer catid){return  forumDAO.delCategoryById( projid, catid) ;}

    public List<ForumTagsDTO> getTagsByForumId(Integer forumid  ){return forumDAO.getTagsByForumId(forumid);}
    public ForumTagsDTO getTagById(Integer projid, Integer forumid ,  Integer tagid  ){return  forumDAO.getTagById(projid, forumid, tagid);}
    public ForumTagsDTO saveForumTag(ForumTagsDTO forumTagsDTO){return forumDAO.saveForumTag(forumTagsDTO);}
    public boolean delTagbyId(Integer projid, Integer tagid){return forumDAO.delTagbyId(projid, tagid);}
    public ForumSpamProtectionDTO getForumSpamProtectionById(Integer projid, Integer forumid, Integer protectType ){return forumDAO.getForumSpamProtectionById(projid, forumid, protectType);}
    public ForumSpamProtectionDTO saveForumSpamProtection(ForumSpamProtectionDTO forumSpamProtectionDTO){return  forumDAO.saveForumSpamProtection(forumSpamProtectionDTO);}

    public List<TopicTypeDTO> getForumTypeByForumid(Integer projid, Integer forumid , Integer status ){return  forumDAO.getForumTypeByForumid(projid, forumid, status);}
    public TopicTypeDTO getForumTypeByid(Integer projid,  Integer id  ){return  forumDAO.getForumTypeByid(projid, id) ;}
    public TopicTypeDTO saveForumType(TopicTypeDTO topicTypeDTO ){return  forumDAO.saveForumType(topicTypeDTO);}
    public boolean moveForumType(Integer projId, Integer forunid, Integer forumTypeID, String direction){ return  forumDAO.moveForumType(projId, forunid, forumTypeID, direction); }
//    public boolean delTypeStatusDTOs(Integer projid, Integer forumid, Integer typeid){return  forumDAO.delTypeStatusDTOs(projid, forumid, typeid);}
    public boolean delForumType(TopicTypeDTO topicTypeDTO){return  forumDAO.delForumType(topicTypeDTO); }
    public List<TopicTypeStatusDTO> getTopicTypeStatusByTopicId(Integer projid, Integer topicId){ return forumDAO.getTopicTypeStatusByTopicId(projid, topicId); }
    public TopicTypeStatusDTO getTopicTypeStatusById(Integer projid, Integer typeStatusId){return  forumDAO.getTopicTypeStatusById(projid, typeStatusId ) ;}
    public TopicTypeStatusDTO saveTypeStatusDTOs(TopicTypeStatusDTO topicTypeStatusDTO) {return forumDAO.saveTypeStatusDTOs(topicTypeStatusDTO) ;}

    public ArticleStatusDTO getArticleStatusById(Integer projid , Integer forumid, Integer id  ){return  forumDAO.getArticleStatusById(projid, forumid, id, true);}
    public List<ArticleStatusDTO> getArticleStatusByTopicTypeId(Integer projid, Integer forumid,  Integer topicTypeid  ){return  forumDAO.getArticleStatusByTopicTypeId(projid, forumid, topicTypeid);}
    public ArticleStatusDTO saveArticleStatus(ArticleStatusDTO articleStatusDTO){ return forumDAO.saveArticleStatus(articleStatusDTO); }
//    public List<ForumStatusDTO> getForumStatusByForumId(Integer projid,  Integer forumid  ){return  forumDAO.getForumStatusByForumId(projid, forumid ); }
//    public ForumStatusDTO getForumStatusByid(Integer projid,  Integer id ){ return  forumDAO.getForumStatusByid( projid, id, true );}
//    public ForumStatusDTO saveForumStatus(ForumStatusDTO forumStatusDTO){ return  forumDAO.saveForumStatus(forumStatusDTO); }
    public boolean moveTopicStatus(Integer projId, Integer topicStatusId , String direction){ return forumDAO.moveTopicStatus(projId, topicStatusId, direction); }
    public Boolean delTypeStatusbyId(Integer projid, Integer typestatusid ){return  forumDAO.delTypeStatusbyId(projid, typestatusid);}

    public Boolean isFollow(Integer articid) throws N18iException { return  articleDAO.isfollow(articid);}
    public Boolean followArticle(Integer projid , Integer articid) throws N18iException { return  articleDAO.followArticle(projid, articid);}

    public UserDTO getCurentUser(){return  userDAO.getCurrentUser();}
//    public UserDTO   createAvatar(Integer userid, InputStream stream) throws IOException {return    userDAO.createAvatar(userid, stream);}

    public FileDTO createImageFile(ImageType type, InputStream stream ) throws IOException {return fileDAO.saveImage(type, stream);  }
    public List<ImgDTO> getLocalImageByType(Integer type){return  fileDAO.getLocalImageByType(type);}
    public ImgDTO getLocalImageByKey(Integer type, String  key ){return fileDAO.getLocalImageByKey(type, key);}
    public void  updateImgDTO(ImgDTO imgDTO ){ fileDAO.updateImgDTO(imgDTO);}

    public List<CommentDTO> getArticleComments(Integer articid) {    return articleDAO.getArticleComments(articid);}
    public CommentDTO getArticleAnswer(List<CommentDTO> commentDTOList)  { return  articleDAO.getArticleAnswer(commentDTOList); }
    public void delArticleComment(Integer commid){ articleDAO.delArticleComment(commid);}
    public CommentDTO  getCommentbyId(Integer commid){return articleDAO.getCommentbyId(commid);}
    public List<CommentDTO> getCommentbyUserId(Integer projid, Integer  userid, Integer start, Integer count ) {return articleDAO.getCommentbyUserId(projid, userid, start, count ) ;}
    public Long getCommentbyUserCounts(Integer projid, Integer  userid ) {return  articleDAO.getCommentbyUserCounts(projid, userid);}

    public List<ArticleDTO> findTextInArticle(Integer projid ,String searchText, Integer forumid, ForumType forumType,  Integer count, String order ){return    articleDAO.findTextInArticle(projid, searchText, forumid, forumType, count, order);}
    public List<ModuleDTO> getModuleBydisplaypos(Integer projId,  Integer forumid,  ModuleDisplay displaypos , ModulePosType modulePosType, UserDTO forUserDTO ) { return  moduleDAO.getModuleBydisplaypos(projId, forumid, displaypos, modulePosType, forUserDTO); }
    public ModuleDTO getModuleById(Integer projId, Integer modid ){ return  moduleDAO.getModuleById(projId, modid) ; }
    public boolean moveModule(Integer projId, Integer moduleID, ModuleDisplay moduleDisplay, String direction){return moduleDAO.moveModule(projId,moduleID,moduleDisplay,  direction ); }
    public boolean deleteModule(Integer projId, Integer moduleID){return moduleDAO.deleteModule(projId, moduleID); }
    public void addModuleParams(Integer projId, Integer moduleid, List<ModuleParamsDTO> moduleParamsDTOs) { moduleDAO.addModuleParams(projId, moduleid, moduleParamsDTOs); }
    public void addProjectParams(ProjectDTO project,  List<ProjectParamsDTO> projectParamsDTOs) { projectDAO.addProjectParams(project, projectParamsDTOs); }
    public List<ModuleTypeDTO> getModuleType(ModulePosType dispose){return  moduleDAO.getModuleType(dispose);}
    public  Boolean createModule(Integer forumid , ModuleDisplay displaypos , ModulePosType modulePosType, Integer modType ) throws Exception { return  moduleDAO.createModule(forumid,displaypos, modulePosType, modType ); }
    public  List<ModuleLinkDTO> getModuleLinksDTObyModuleId(Integer modulid){return moduleDAO.getModuleLinksDTObyModuleId(modulid) ;}
    public  ModuleLinkDTO getModuleLinksDTObyId(Integer modulid, Integer linkid) { return  moduleDAO.getModuleLinksDTObyId(modulid, linkid);}
    public  boolean deleteModuleLinksDTO(Integer modulid, Integer linkid){return  moduleDAO.deleteModuleLinksDTO(modulid, linkid);}
    public  ModuleLinkDTO saveModuleLinksDTO(ModuleLinkDTO moduleLinkDTO){ return moduleDAO.saveModuleLinksDTO( moduleLinkDTO) ;}
    public boolean moveModuleLink(Integer projId, Integer moduleID, Integer linkId,  String direction){ return moduleDAO.moveModuleLink(projId, moduleID, linkId, direction ) ; }

    public I18nMessageDTO saveI18nMessage(ProjectDTO projectDTO  , I18nMessageDTO i18nMessageDTO  ){return  i18nMessageDAO.saveI18nMessage(projectDTO, i18nMessageDTO  ) ;}


    }

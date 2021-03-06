package usercareproj.settings

import com.sh.db.map.topics.ArticleStatusDTO
import com.sh.db.map.forum.CategoriesDTO
import com.sh.db.map.forum.ForumDTO
import com.sh.db.map.forum.ForumSpamProtectionDTO
import com.sh.db.map.forum.ForumTagsDTO
import com.sh.db.map.forum.TopicTypeDTO
import com.sh.db.map.forum.TopicTypeStatusDTO
import com.sh.utils.ForumType
import grails.plugin.springsecurity.annotation.Secured
import org.apache.commons.logging.Log
import org.grails.web.json.JSONObject

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Secured(['ROLE_MANAGER'])
class CommunityController {
    def webServicesSession

    def getDefaultForum(project){
        String selCommunity = g.cookie(name: 'selCommunity')
        def selId=0
        def selForum=null;
        if (null!=selCommunity){
            selId=Integer.parseInt(selCommunity);
        }
        if (selId>0){
            selForum= webServicesSession.getForumById(project.id , selId )
        }
        return  selForum?selForum:webServicesSession.getForumByType(project.id , ForumType.Community).get(0)
    }

    def index() {}

    def privacy(){
        def id;
        try {
            id=params.id as int;
            setcookie(id)
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            Log.error(e.message)
            return null;
        }
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession() ).clone()
        def forum=webServicesSession.getForumById( project.id , id , ForumType.Community )
        if (params.get("submit")=="save" ){
            forum.getPrivacy().anonymousview=false;
            forum.getPrivacy().authorizedview=false;
            forum.getPrivacy().autosubscribe=false;
            forum.getPrivacy().sso=false;
            bindData(forum.getPrivacy() , params, 'privacy')

            webServicesSession.saveForum(forum);
            render view: '/settings/community/privacy', model: [  UCproject:project , forum:forum]
        }
        else{
            render view: '/settings/community/privacy', model: [  UCproject:project , forum:forum]
        }

    }

    def control(){

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumByType( project.id , ForumType.Community )
        render view: '/settings/community/control', model: [  UCproject:project , forums:forums]

    }

    def add(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            def fname= params.get("name") as String
            webServicesSession.createForum(project , fname, ForumType.Community)
            redirect action: 'control'
        }
        else{
            render template: '/settings/community/addNewCommunity'
        }
    }

def delete(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            def id = params.getInt("id")
            def forum=webServicesSession.getForumById(project.id, id);
            forum.status=0;
            webServicesSession.saveForum(forum);

            redirect action: 'control'
        }
        else{
            render template: '/settings/community/deleteForm'
        }
    }

    def deleteforumType(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            def id = params.getInt("id")
            def forumtype=webServicesSession.getForumTypeByid(project.id, id )

            webServicesSession.delForumType(forumtype)

            redirect action: 'topicType'
        }
        else{
            render template: '/settings/community/deleteForm'
        }
    }

    def delforumstatus(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            webServicesSession.delForumStatusbyId(project.id, params.getInt("id",0) )
            redirect action: 'topicStatus'
        }
        else{
            render template: '/settings/community/deleteForm'
        }
    }
    def delcategory(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            webServicesSession.delCategoryById(project.id, params.getInt("id",0))

            redirect action: 'category'
        }
        else{
            render template: '/settings/community/deleteForm'
        }
    }

    def deltag(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        if (params.get("submit")=="save" ){
            webServicesSession.delTagbyId(project.id, params.getInt('id', 0)  )
            redirect action: 'tag'
        }
        else{
            render template: '/settings/community/deleteForm'
        }
    }



    def setcookie (id){
        def c = new Cookie("selCommunity", ""+id )
        c.path="/"
        c.maxAge = 9999999
        response.addCookie(c)
    }

    def setting(){
        def id=getId();

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[UCproject:project]
        model.forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        model.activleLangs=webServicesSession.getProjectActiveLangs(project.id)
        model.knowledgebases=webServicesSession.getForumByType(project.id, ForumType.Knowledgebase)
        model.helpdesks=webServicesSession.getForumByType(project.id, ForumType.HelpDesk)
//        model.topicStatuses=webServicesSession.getArticleStatusByForumId(project.id, id )
        if (params.get("submit")=="save" ){
            def forum = new ForumDTO();
            bindData(forum , params, 'forum')
            model.forum.name=forum.name;
            model.forum.satisfactionon=forum.satisfactionon;
//            model.forum.firstreplystatus=forum.firstreplystatus;
            model.forum.sharingon=forum.sharingon;
            model.forum.langid=forum.langid;
            model.forum.defkhowlagebase=forum.defkhowlagebase;
            model.forum.votelimit=forum.votelimit;
            model.forum.votetype=forum.votetype;
            model.forum.defhelpdesk=forum.defhelpdesk;
            model.forum.meta=forum.meta;
            model.forum=webServicesSession.saveForum(model.forum);

        }

        render view: '/settings/community/setting', model: model

    }

    def spamprotection() {
        def id=getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        if (params.get("submit")=="save" ) {

            def spamprotect =  new ForumSpamProtectionDTO(params.getInt('spamProtect.id'))
            bindData(spamprotect , params, 'spamProtect')
            spamprotect.setProjid(project.id)
            spamprotect.setForumid(id)
            webServicesSession.saveForumSpamProtection(spamprotect);
        }
        model.forum=forum;
        model.spamProtectArticle=webServicesSession.getForumSpamProtectionById(project.id , id , 0)
        model.spamProtectComment=webServicesSession.getForumSpamProtectionById(project.id , id , 1)

        render view: '/settings/community/spamprotection', model: model
    }
    def getId(){
        def id;
        try {
            id=params.getInt('id', 0);
            if (id==0){
                id = g.cookie(name: 'selCommunity') as int
            }
            else {
                setcookie(id)
            }

            return id
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            Log.error(e.message)
            return null;
        }
    }
    def tag(){
        def id=getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        if (params.get("submit")=="save" ) {
//            forum.getPrivacy().setAssigntype(params.getInt('assigntype'))
//            webServicesSession.saveForum(forum)

        }
        model.forum=forum;
        model.tags=webServicesSession.getTagsByForumId(id )

        render view: '/settings/community/tag', model: model

    }
    def category(){
        def id=getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        if (params.get("submit")=="save" ) {
            forum.getPrivacy().setAssigntype(params.getInt('assigntype'))
            webServicesSession.saveForum(forum)

        }
        model.forum=forum;
        model.categories=webServicesSession.getCategoryByForumId(project.id, id )

        render view: '/settings/community/category', model: model
    }

    def moveCategory(){
        def id=params.getInt("id")
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
//        def category=webServicesSession.getCategoryById(project.id, id )
        def direction = params.get('direction')
        JSONObject resultJson = new JSONObject();
        resultJson.put("category",id );
        resultJson.put("direction",direction);
        if (webServicesSession.moveCategory(project.id, id , direction as String)){
            resultJson.put("status","success");
        }
        else {
            resultJson.put("status","error");
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def moveTopicStatus(){
        def id=params.getInt("id")
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
//        def category=webServicesSession.getCategoryById(project.id, id )
        def direction = params.get('direction')
        JSONObject resultJson = new JSONObject();
        resultJson.put("forumStatus",id );
        resultJson.put("direction",direction);
        if (webServicesSession.moveTopicStatus(project.id, id , direction as String)){
            resultJson.put("status","success");
        }
        else {
            resultJson.put("status","error");
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def moveTopicType(){
        def id=params.getInt("id")
        def topicType= params.getInt('topicType')
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def direction = params.get('direction')
        JSONObject resultJson = new JSONObject();

        resultJson.put("direction",direction);
        if (webServicesSession.moveForumType(project.id, id , topicType, direction as String)){
            resultJson.put("status","success");
        }
        else {
            resultJson.put("status","error");
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def customisation(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[UCproject:project]
        render view: '/settings/community/customisation', model: model

    }
    def editCategory(){
        addNewCategory()
    }

    def edittag(){
        addNewTag()
    }

    def edittopicType(){
        addNewTopicType()
    }

    def edittopicStatus(){
        addtopicStatus()
    }

    def addNewTag(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        model.tag=params.getInt("tagid")?webServicesSession.getTagById(project.id, id , params.getInt("tagid")): new ForumTagsDTO(forum.id,"")

        if (  params.get("submit")=="save" ) {
            bindData(model.tag , params, 'tag')
            webServicesSession.saveForumTag(model.tag )
            redirect action: 'tag', params: [id:id]
        }
        else {
            render template: '/settings/community/addNewTag' , model: model
        }
    }
    def addNewTopicType(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        def topicTypeid=params.getInt("topicType")
        def topicType=topicTypeid?webServicesSession.getForumTypeByid(project.id,   topicTypeid):new TopicTypeDTO()
        model.topicStatuses=webServicesSession.getTopicTypeStatusByTopicId(project.id,  topicTypeid);

        model.topicType=topicType
//        model.forumStatuses=topicType.markIsinType(forumStatuses);
        if (  params.get("submit")=="save" ) {
//            if (topicType.id!= null ){
//
////                webServicesSession.delTypeStatusDTOs(project.id , forum.id, topicType.id )
//                topicType.getTypeStatusDTOList().clear()
//
//            }
//            def statuses= params.list('forumStatus.id')
//            for(statusid in statuses){
//                def forumStatus=webServicesSession.getForumStatusByid(project.id ,  Integer.parseInt(statusid) )
//                if (forumStatus.articleStatusDTO.atype==1){
//                    topicType.addTypeStatusDTO(new TopicTypeStatusDTO (project.id, forumStatus ,  topicType , null ))
//                }
//            }

            topicType.useraccess=params.getBoolean('topicType.useraccess')?:false
            topicType.enable=params.getBoolean('topicType.enable')?:false
            topicType.forumid=forum.id
            topicType.firstreplystatus=params.getInt("topicType.firstreplystatus", 0)
            def articleTypeDTO=topicType.articleTypeDTO;

            if (topicType.articleTypeDTO.id== null  || topicType.articleTypeDTO.id>10 ){
                articleTypeDTO.name= params.get('name') as String
            }
            webServicesSession.saveForumType(topicType)
            redirect action: 'topicType', params: [id:id]
        }
        else{
            render template: '/settings/community/addNewTopicType' , model: model
        }


    }

    def addtopicStatus(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        def topicStatus=params.getInt("topicStatus")?webServicesSession.getTopicTypeStatusById( project.id,  params.getInt("topicStatus")):new TopicTypeStatusDTO()
        def topicType=webServicesSession.getForumTypeByid(project.id, params.getInt("topictype"))

        if (params.submit=="save"  ) {
            def articlestatus=topicStatus.articleStatusDTO

            if (articlestatus== null){
                articlestatus=new ArticleStatusDTO(project.id , forum.id)
                topicStatus.articleStatusDTO=articlestatus;

            }
            if (topicStatus.getTopicTypeDTO()== null){
                topicStatus.setTopicTypeDTO(topicType)
            }
            bindData(articlestatus , params, 'articleStatus')
            topicStatus.articleStatusDTO=articlestatus;
            webServicesSession.saveTypeStatusDTOs(topicStatus)

            redirect action: 'topicStatus', params: [id:id, topictype:topicStatus.topicTypeDTO.id]
        }
        else{
            model.topicStatus=topicStatus
            render template: '/settings/community/addNewTopicStatus' , model: model
        }
    }

    def addNewCategory(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        model.categoris=webServicesSession.getCategoryByForumId(project.id , id).clone()
        def categoris=model.categoris.clone()
        def fcategory =params.getInt("catid")?webServicesSession.getCategoryById(project.id , params.getInt("catid")):new CategoriesDTO(project.id ,forum.id)
        def cindex=0
        if (params.getInt("catid")){
            for(CategoriesDTO categoriesDTO:categoris){
                if (categoriesDTO.id==params.getInt("catid")) {
                    model.categoris.remove(cindex)
                    continue;
                }
                cindex++
            }
        }
        model.category=fcategory
        if (params.get("submit")=="save" ) {
            bindData(fcategory , params, 'category')
            webServicesSession.saveCategories(fcategory)
            redirect action: 'category', params: [id:id]
        }
        else{
            render template: '/settings/community/addNewCategory' , model: model
        }
    }

    def topicType(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        model.forum=forum
        model.topicTypes=webServicesSession.getForumTypeByForumid(project.id,  forum.id,-1);


        render view: '/settings/community/topicType' , model: model

    }

    def topicStatus(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        def topictype=params.getInt("topictype")
        model.forum=forum
        model.topicStatuses=webServicesSession.getTopicTypeStatusByTopicId(project.id,  topictype);

        render view: '/settings/community/topicStatus' , model: model

    }


}

package usercareproj.settings

import com.sh.db.map.ArticleStatusDTO
import com.sh.db.map.CategoriesDTO
import com.sh.db.map.ForumDTO
import com.sh.db.map.ForumTagsDTO
import com.sh.db.map.TopicTypeDTO
import com.sh.db.map.TopicTypeStatusDTO
import com.sh.utils.ForumType
import grails.plugin.springsecurity.annotation.Secured
import org.apache.commons.logging.Log

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Secured(['ROLE_MANAGER'])
class HelpdeskController {

    def webServicesSession


    def index() { control() }
    def control(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumByType( project.id , ForumType.HelpDesk )
        render view: '/settings/helpdesk/control', model: [UCproject:project , forums:forums]

    }


    def add(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.get("submit")=="save" ){
            def fname= params.get("name") as String
            webServicesSession.createForum(project , fname, ForumType.HelpDesk)
            redirect action: 'control'
        }
        else{
            render template: '/settings/community/addNewCommunity'
        }
    }


    def setting(){
        def id;
        try {
            id=params.id as int;
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[UCproject:project]
        model.forum=webServicesSession.getForumById( project.id , id )
        model.activleLangs=webServicesSession.getProjectActiveLangs(project.id)
        model.knowledgebases=webServicesSession.getForumByType(project.id, ForumType.HelpDesk)
        model.topicStatuses=webServicesSession.getArticleStatusByForumId(project.id, id )

        if (params.get("submit")=="save" ){
            def forum = new ForumDTO();
            bindData(forum , params, 'forum')
            model.forum.name=forum.name;
            model.forum.satisfactionon=forum.satisfactionon;
            model.forum.firstreplystatus=forum.firstreplystatus;
            model.forum.sharingon=forum.sharingon;
            model.forum.langid=forum.langid;
            model.forum.defkhowlagebase=forum.defkhowlagebase;
            model.forum.votelimit=forum.votelimit;
            model.forum.votetype=forum.votetype;
            model.forum.defhelpdesk=forum.defhelpdesk;
            model.forum.meta=forum.meta;
            model.forum=webServicesSession.saveForum(model.forum);

        }

        render view: '/settings/helpdesk/setting', model: model

    }

    def getId(){
        def id;
        try {
            id=params.getInt('id', 0);
            if (id==0){
                id = g.cookie(name: 'selHelpDesk') as int
            }
            else {
                setcookie(id)
            }

            return id
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);

            return null;
        }
    }

    def setcookie (id){
        def c = new Cookie("selHelpDesk", ""+id )
        c.path="/"
        c.maxAge = 9999999
        response.addCookie(c)
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

        render view: '/settings/helpdesk/category', model: model
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

    def editCategory(){
        addNewCategory()
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

        render view: '/settings/helpdesk/tag', model: model

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
    def edittag(){
        addNewTag()
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
    def editforumstatus(){
        addForumStatus()
    }

    def addForumStatus(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        def forumStatus=params.getInt("forumStatus")?webServicesSession.getForumStatusByid(project.id,  params.getInt("forumStatus")):new TopicTypeStatusDTO(forum.id)
        model.forumStatus=forumStatus

        if (params.submit=="save"  ) {
            def articlestatus=forumStatus.articleStatusDTO
            if (articlestatus== null){
                articlestatus=new ArticleStatusDTO(project.id , forum.id)
                forumStatus.articleStatusDTO=articlestatus;
            }

            bindData(articlestatus , params, 'articleStatus')
            forumStatus.articleStatusDTO=articlestatus;
            webServicesSession.saveForumStatus(forumStatus)

            redirect action: 'topicStatus', params: [id:id]
        }
        else{
            render template: '/settings/community/addNewArticleStatus' , model: model
        }
    }


    def topicStatus(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        model.forum=forum
        model.forumStatuses=webServicesSession.getForumStatusByForumId(project.id,  forum.id);

        render view: '/settings/helpdesk/topicStatus' , model: model

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

    def edittopicType(){
        addNewTopicType()
    }
    def addNewTopicType(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[UCproject: project]
        def forumStatuses=webServicesSession.getForumStatusByForumId(project.id,  forum.id);
        def topicTypeid=params.getInt("topicType")
        def topicType=topicTypeid?webServicesSession.getForumTypeByid(project.id,   topicTypeid):new TopicTypeDTO()
        model.topicType=topicType
        model.forumStatuses=topicType.markIsinType(forumStatuses);
        if (  params.get("submit")=="save" ) {
            if (topicType.id!= null ){

                webServicesSession.delTypeStatusDTOs(project.id , forum.id, topicType.id )
                topicType.getTypeStatusDTOList().clear()

            }
            def statuses= params.list('forumStatus.id')
            for(statusid in statuses){
                def forumStatus=webServicesSession.getForumStatusByid(project.id ,  Integer.parseInt(statusid) )
                if (forumStatus.articleStatusDTO.atype==1){
                    topicType.addTypeStatusDTO(new TopicTypeStatusDTO (project.id, forumStatus ,  topicType , null ))
                }
            }

            topicType.useraccess=params.getBoolean('topicType.useraccess')?:false
            topicType.enable=params.getBoolean('topicType.enable')?:false
            topicType.forumid=forum.id
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

}

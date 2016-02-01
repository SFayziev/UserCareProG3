package usercareproj.settings

import com.sh.db.map.CategoriesDTO
import com.sh.db.map.ForumDTO
import com.sh.db.map.ForumTagsDTO
import com.sh.utils.ForumType
import grails.plugin.springsecurity.annotation.Secured
import groovy.util.logging.Log

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Secured(['ROLE_MANAGER'])
class KnowledgebaseController {

    def webServicesSession


    def index() {}

    def customisation(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[project:project]
        render view: '/settings/knowledgebase/customisation', model: model

    }
    def addNewTag(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[project: project]
        model.tag=params.getInt("tagid")?webServicesSession.getTagById(project.id, id , params.getInt("tagid")): new ForumTagsDTO(forum.id,"")

        if (  params.get("submit")=="save" ) {
            bindData(model.tag , params, 'tag')
            webServicesSession.saveForumTag(model.tag )
            redirect action: 'tag', params: [id:id]
        }
        else {
            render template: '/settings/knowledgebase/addNewTag' , model: model
        }
    }

    def privacy(){
        def id=getId()
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession() ).clone()
        def forum=webServicesSession.getForumById( project.id , id , ForumType.Knowledgebase )
        if (params.get("submit")=="save" ){
            forum.getPrivacy().anonymousview=false;
            forum.getPrivacy().authorizedview=false;
            forum.getPrivacy().autosubscribe=false;
            forum.getPrivacy().sso=false;
            bindData(forum.getPrivacy() , params, 'privacy')

            webServicesSession.saveForum(forum);
//            render view: '/settings/knowledgebase/privacy', model: [  project:project , forum:forum]
        }

            render view: '/settings/knowledgebase/privacy', model: [  project:project , forum:forum]


    }

    def control(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumByType( project.id , ForumType.Knowledgebase )
        render view: '/settings/knowledgebase/control', model: [project:project , forums:forums]

    }

    def setcookie (id){
        def c = new Cookie("selKnowledgebase", ""+id )
        c.path="/"
        c.maxAge = 9999999
        response.addCookie(c)
    }
    def getId(){
        def id;
        try {
            id=params.getInt('id', 0);
            if (id==0){
                id = g.cookie(name: 'selKnowledgebase') as int
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
        def model=[project:project]
        def forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        if (params.get("submit")=="save" ) {
//            forum.getPrivacy().setAssigntype(params.getInt('assigntype'))
//            webServicesSession.saveForum(forum)

        }
        model.forum=forum;
        model.tags=webServicesSession.getTagsByForumId(id )

        render view: '/settings/knowledgebase/tag', model: model

    }

    def category(){
        def id=getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[project:project]
        def forum=id? webServicesSession.getForumById( project.id , id ):getDefaultForum(project)
        if (params.get("submit")=="save" ) {
            forum.getPrivacy().setAssigntype(params.getInt('assigntype'))
            webServicesSession.saveForum(forum)

        }
        model.forum=forum;
        model.categories=webServicesSession.getCategoryByForumId(project.id, id )

        render view: '/settings/knowledgebase/category', model: model
    }

    def setting(){
        def id=getId();


        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[project:project]
        model.forum=webServicesSession.getForumById( project.id , id )
        model.activleLangs=webServicesSession.getProjectActiveLangs(project.id)
        model.helpdesks=webServicesSession.getForumByType(project.id, ForumType.HelpDesk)
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

        render view: '/settings/knowledgebase/setting', model: model

    }

    def editCategory(){
        addNewCategory()
    }
    def edittag(){
        addNewTag()
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


    def addNewCategory(){
        def id = getId();
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forum=webServicesSession.getForumById(project.id , id)
        def model=[project: project]
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
            render template: '/settings/knowledgebase/addNewCategory' , model: model
        }
    }
}

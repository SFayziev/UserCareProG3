package usercareproj.settings

import com.sh.db.map.ForumDTO
import com.sh.utils.ForumType
import grails.plugin.springsecurity.annotation.Secured
import groovy.util.logging.Log

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Secured(['ROLE_MANAGER'])
class KnowledgebaseController {

    def webServicesSession


    def index() {}
    def control(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumByType( project.id , ForumType.Knowledgebase )
        render view: '/settings/knowledgebase/control', model: [project:project , forums:forums]

    }

    def setcookie (id){
        def c = new Cookie("selKnowledge", ""+id )
        c.path="/"
        c.maxAge = 9999999
        response.addCookie(c)
    }
    def getId(){
        def id;
        try {
            id=params.getInt('id', 0);
            if (id==0){
                id = g.cookie(name: 'selKnowledge') as int
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
    def setting(){
        def id=getId();


        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def model=[project:project]
        model.forum=webServicesSession.getForumById( project.id , id )
        model.activleLangs=webServicesSession.getProjectActiveLangs(project.id)
        model.helpdesks=webServicesSession.getForumByType(project.id, ForumType.Knowledgebase)
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

}

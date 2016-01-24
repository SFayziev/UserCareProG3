package usercareproj.settings

import com.sh.db.map.ForumDTO
import com.sh.utils.ForumType
import grails.plugin.springsecurity.annotation.Secured

import javax.servlet.http.HttpServletResponse

@Secured(['ROLE_MANAGER'])
class ChatController {

    def webServicesSession


    def index() {}
    def control(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumByType( project.id , ForumType.Chat )
        render view: '/settings/helpdesk/control', model: [project:project , forums:forums]

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

        render view: '/settings/helpdesk/setting', model: model

    }
}

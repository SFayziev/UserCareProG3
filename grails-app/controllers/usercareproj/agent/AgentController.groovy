package usercareproj.agent

import com.sh.utils.ModuleDisplay
import com.sh.utils.ModulePosType
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject

import javax.servlet.http.HttpServletResponse

//@Secured(['ROLE_MANAGER', 'ROLE_MANAGEFEEDBACK', 'ROLE_CHATOPERATOR'])
class AgentController {
    def webServicesSession
    def index() {
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        render view: '/agent/index', model: [UCproject:project]

    }

    def articleDetail(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id= params.int("id")
        def forumid=params.int("forumid")
        def article = webServicesSession.getArticlebyId(project.id, id);
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","error");



        if (article!= null){
            if (forumid== null) forumid= article.getForumDTO().id;
            def modulPos=webServicesSession.getModuleBydisplaypos(project.id,  0, ModuleDisplay.ItemPanel , ModulePosType.Main , null)
            def forum=webServicesSession.getForumById(project.getId(), forumid)
            def contents = g.render(template:"/agent/articleDetails", model: [UCproject: project, article: article, modulPos: modulPos, forum:forum ])
            resultJson.put("status","success");
            resultJson.put("value", contents)
            response.contentType = "application/json; charset=UTF-8"
            render   resultJson.toString()

        }
        else {
            response.sendError HttpServletResponse.SC_NOT_FOUND
        }
    }
}

package usercareproj

import com.sh.utils.ForumType
import com.sh.utils.ModuleDisplay
import org.grails.web.json.JSONObject;

import javax.servlet.http.HttpServletResponse

class ForumController {

    def afterInterceptor = [action: this.&invokeMe, only: ['index', 'list', 'widgets']]

    private invokeMe(model) {
        model.customize=params.customize
    }

    def webServicesSession

    def index() {
        list()
    }

    def jsonlist(){
        def moduleid=params.getInt("moduleid")

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def forum= webServicesSession.getForumById(project.id, getForumId(project) )
        def module=webServicesSession.getModuleById(project.getId(),moduleid);
        def contents = g.render(template: module.getModuleTypeDTO().template  , model: [forum:forum, project: project, module:module ]  )
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("value", contents)
        render   resultJson.toString()
    }
    def list(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def forum= webServicesSession.getForumById(project.id, params.int("id", project.getDefaultforum() ))
        def modulPos=webServicesSession.getModuleBydisplaypos(project.id, 0 , forum.id, ModuleDisplay.List )
        render view: '/article/list' , model: [modulPos:modulPos,  project: project,  forum:forum]
    }

    def dashboard(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def defaultForum= webServicesSession.getForumById(project.id, params.int("id", project.getDefaultforum() ))
        def model =[project: project, defaultForum:defaultForum]
        model.customize=params.customize
        if (defaultForum==null)   response.sendError(HttpServletResponse.SC_NOT_FOUND);

        model.modulPos=webServicesSession.getModuleBydisplaypos(project.id, 0 ,  defaultForum.id , ModuleDisplay.Dashboard )
        model.project=project;

        render view: '/index' , model: model
    }

    def getForumId(project){
        def forumid= params.getInt("forum", project.getDefaultforum())
        return forumid;
    }

    def getFParams(){
        return  [catalogid:params.int("catalog"), order:params.get("order") as String , page:params.int("offset"), count:params.int("max"), type:params.int("type"), status: params.int("status") ]
    }
    def getLastArticle(project,forum,  catalogParams){


        return  webServicesSession.getLastArticle(project?.id, catalogParams.page , catalogParams.count, catalogParams.status, catalogParams.type, catalogParams.order ,catalogParams.catalogid, forum, null )
    }

    def getLastArticlePageCount(project,forum, catalogParams ){
        def catalogid= catalogParams.catalogid

        def type= catalogParams.type
        def status= catalogParams.status
        return  webServicesSession.getLastArticleRecCount(project?.id,status,type, catalogid,  forum , null )

    }

    def search(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def forum=params.int("forum");
        def searchtext=params.get("searchtext") as String;
        g.message(code: "forum.type1")
        def contents=""
        def articlesKNB=webServicesSession.findTextInArticle(project.id,  searchtext, forum, ForumType.Knowledgebase,  5, null )
        if(articlesKNB){
            contents = g.render(template:"/forum/searchList", model: [project:project, lastArticle:articlesKNB, title: g.message(code: "forum.type1")   ])
        }
        def articlesCom=webServicesSession.findTextInArticle(project.id,  searchtext, forum,ForumType.Community,  5, null )
        if (articlesCom){
            contents =contents +  g.render(template:"/forum/searchList", model: [project:project, lastArticle:articlesCom, title: g.message(code: "forum.type2")  ])
        }
        if (!articlesCom && !articlesKNB){
            contents = g.render(template:"/forum/searchNotFound")
        }
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("value", contents)
        render   resultJson.toString()
    }

    def widgets(){
        def module=[project:webServicesSession.getProject(getResponse(), getRequest(), getSession())]
        module.maxRecords=5
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        module.forum= webServicesSession.getForumById(project.id, params.int("id", project.getDefaultforum() ))
        module.modulPos=webServicesSession.getModuleBydisplaypos(module.project.id, 0 , module.forum.id , ModuleDisplay.Widget )
        render view: 'popup' , model: module
    }
}

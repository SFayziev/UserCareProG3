package usercareproj

import com.sh.db.map.ArticleDTO
import com.sh.utils.ModuleDisplay
import org.grails.web.json.JSONObject

class ArticleController {


    def webServicesSession

    def afterInterceptor = [action: this.&invokeMe, only: [ 'item','list']]

    private invokeMe(model) {
        try {
            model.curUser=webServicesSession.curentUser
        } catch (Exception ex) {
        }
    }


    def index() {

    }



    def item(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id= params.int("id")
        def forumid=params.int("forumid")
        def article = webServicesSession.getProjectArticle(project.id, id);
        def comments= webServicesSession.getArticleComments(id)
        def module=[params: [showTopicAvatar:1, topicPresentation:"full"]]
        def articleStatuses=webServicesSession.getArticleStatusByForumId(project.id , forumid )

        def answer = article.answerCommentid? webServicesSession.getCommentbyId(article.answerCommentid): null;
        render view: 'item', model: [project:project, article:article ,forum:article.getForumDTO(),articleStatuses :articleStatuses, comments:comments, module:module,answer:answer ]
    }


    def isfollow(){
        def id= params.int("id")
        def isfol=webServicesSession.isFollow(id)
        def contents = g.render(template:"/article/follow", model: [isfol:isfol, id:id ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",id);
        resultJson.put("value", contents)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }
    def follow(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id= params.int("id")
        def isfol=webServicesSession.followArticle(project.id,  id)
        def contents = g.render(template:"/article/follow", model: [ isfol:isfol,id:id ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",id);
        resultJson.put("value", contents)
        resultJson.put("massage",  message(code: isfol? "article.follow.subscribe.message":"article.follow.unsubscribe.message" ))

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }


    def getArticle(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id= params.int("id")
        def article = webServicesSession.getProjectArticle(project.id, id);
        def contents = g.render(template:"/article/articleItem"+article.getForumDTO().type.ordinal(), model: [project:project, article:article ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",article.getId());
        resultJson.put("value", contents)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def getArticleJson(article, prject){


         JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",article.getId());
        resultJson.put("value", contents)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def assignToUser(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def userid=params.getInt("userid");
        def article = webServicesSession.assignArticle(id, userid);
        def contents = g.render(template:"/article/articleItem"+article.getForumDTO().type.ordinal() , model: [project:project, article:article ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",article.getId());
        resultJson.put("value", contents);
        resultJson.put("massage",  message(code: "article.assigne.change.massage"))

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def vote(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def value=params.getInt("value");
        def voteVal=webServicesSession.articleVote(project.id, id, value, "", request.getRemoteAddr()) ;
        response.contentType = "application/json; charset=UTF-8"
        render voteVal.toJson(message(code: "article.vote.change.massage") as String);
    }

    def edit(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def forumid=params.getInt("forumid");
        def forumTypes=webServicesSession.getForumTypeByForumid(project.id, forumid, 1 )
        def article = webServicesSession.getProjectArticle(project.id, id);
        render template:"edit" , model: [project:project, article:article,forumid:forumid, forumTypes:forumTypes ]
    }

    def create(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def article = new ArticleDTO();
        if (params.int("id")){
            article=webServicesSession.getProjectArticle( project.getId(),params.int("id") )?: article
        }
        article.id=params.int("id")
        article.setProjid(project.getId() )
        article. setForumDTO(webServicesSession.getForumById(project.getId(), project.getDefaultforum()))
        article.setTitle(params.get("title") as String);
        article.setText(params.get("description") as String);
        article.setType(webServicesSession.getForumTypeByid(project.id ,  params.getInt("postType", 0)))
        article=webServicesSession.addArticle(article)
        redirect(action: "item", params: [id: article.getId()])

    }

    def delete(){

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def article = webServicesSession.getProjectArticle(project.id, id);
        def action = params.get("actiondo") as String

        if (action=="delete"){
            webServicesSession.deleteArticle(article)
            redirect("list")
        }
        else{
            render template:"delete" , model: [project:project, article:article ]
        }

    }


}

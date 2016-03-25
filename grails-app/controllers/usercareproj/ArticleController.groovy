package usercareproj

import com.sh.db.map.ArticleDTO
import com.sh.utils.ForumType
import com.sh.utils.ModuleDisplay
import com.sh.utils.exception.N18iException
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject

import javax.servlet.http.HttpServletResponse;

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
        if (article!= null){
            def comments= webServicesSession.getArticleComments(id)
            def module=[params: [showTopicAvatar:1, topicPresentation:"full"]]
//            def articleStatuses=webServicesSession.getArticleStatusByTopicTypeId(project.id , article.type.id )

            def answer = article.answerCommentid? webServicesSession.getCommentbyId(article.answerCommentid): null;
            render view: 'item', model: [UCproject:project, article:article ,forum:article.getForumDTO(), comments:comments, module:module,answer:answer ]
        }
        else {
            response.sendError HttpServletResponse.SC_NOT_FOUND
        }
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
        JSONObject resultJson = new JSONObject();


        try {
            def isfol=webServicesSession.followArticle(project.id,  id)
            def contents = g.render(template:"/article/follow", model: [isfol:isfol, id:id ])
            resultJson.put("status","success");
            resultJson.put("contentid",id);
            resultJson.put("value", contents)
            resultJson.put("massage",  message(code: isfol? "article.follow.subscribe.message":"article.follow.unsubscribe.message" ))
        } catch (N18iException ex) {
            resultJson.put("status","error");
            resultJson.put("massage",   message(code: ex.getN18IErrorCodes().n18nCode , default:ex.getN18IErrorCodes().defaultValue  ))
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }


    def getArticle(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id= params.int("id")
        def article = webServicesSession.getProjectArticle(project.id, id);
        def module=[params: [showTopicAvatar:1, topicPresentation:"full"]]
        def contents = g.render(template:"/modules/articleDetails", model: [UCproject:project, module:module,  forum:article.getForumDTO(),  article:article ])
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
        def article = webServicesSession.assignArticle(id, params.getInt("userid"));
//        def contents = g.render(template:"/article/articleItem"+article.getForumDTO().type.ordinal() , model: [UCproject:project, forum:article.getForumDTO(), article:article ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",article.getId());
//        resultJson.put("value", contents);
        resultJson.put("massage",  message(code: "article.assigne.change.massage"))

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def assignToCategory(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def article = webServicesSession.assignArticleCategory(id , params.getInt("categoryid", -1) )
//        def contents = g.render(template:"/article/articleItem"+article.getForumDTO().type.ordinal() , model: [UCproject:project, forum:article.getForumDTO(), article:article ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",article.getId());
//        resultJson.put("value", contents);
        resultJson.put("massage",  message(code: "article.assigne.category.change.massage"))
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def assignToTag(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        webServicesSession.addTagtoArticle(project.id , id , params.getInt("tagid", -1) )
//        def contents = g.render(template:"/article/articleItem"+article.getForumDTO().type.ordinal() , model: [UCproject:project, forum:article.getForumDTO(), article:article ])
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("massage",  message(code: "article.assigne.category.change.massage"))
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def deleteAssignTags(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");

        if (params.submit=="save"){
            webServicesSession.delArticleTag( project.id, id , params.getInt("tag",0))
            redirect(controller: "article",  action:  "item" , params: [id:  params.id ,forumid: 2] )
        }
        else{
            render template:"/modal/deleteModal"
        }

    }

    def vote(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def value=params.getInt("value");
        JSONObject resultJson = new JSONObject();
        response.contentType = "application/json; charset=UTF-8"

        try {
            def voteVal=webServicesSession.articleVote(project.id, id, value, "", request.getRemoteAddr());
            render voteVal.toJson(message(code: "article.vote.change.massage") as String);
        } catch (N18iException ex) {
            resultJson.put("status","error");
            resultJson.put("massage",   message(code: ex.getN18IErrorCodes().n18nCode , default:ex.getN18IErrorCodes().defaultValue  ))

            render   resultJson.toString()
        }


    }

    def moveto(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");

        if (params.submit=="save"){
            def article = webServicesSession.getProjectArticle(project.id , id)
            if (article!= null){
               article= webServicesSession .moveToArticle(article, params.getInt("forumid",0 ) , params.getInt("forumtypeid", 0), params.getInt("forumcategoryid", 0) )

            }
            redirect(action: "item", params: [id: article.getId(), forumid: article.forumDTO.id ])

        }
        else{
            def communitys = webServicesSession.getForumByType(project.id, ForumType.Community)
            def knowledgebases = webServicesSession.getForumByType(project.id, ForumType.Knowledgebase)
            def helpdesks= webServicesSession.getForumByType(project.id, ForumType.HelpDesk)


            render template: "moveTo" , model: [forumid: params.getInt("forumid",0 ), UCproject:project,  communitys:communitys , knowledgebases:knowledgebases, helpdesks:helpdesks]
        }

    }

//    @Secured(["isAuthenticated()"])
    def edit(){

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def forumid=params.getInt("forumid");
        def forumTypes=webServicesSession.getForumTypeByForumid(project.id, forumid, 1 )
        def article = webServicesSession.getProjectArticle(project.id, id);
//        response.sendError(HttpServletResponse.SC_FORBIDDEN );

        render template:"edit" , model: [UCproject:project, article:article,forumid:forumid, forumTypes:forumTypes ]
    }

    def create(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def article = new ArticleDTO();
        if (params.int("id")){
            article=webServicesSession.getProjectArticle( project.getId(),params.int("id") )?: article
        }
        article.id=params.int("id")
        article.setProjid(project.getId() )
        def forum=params.getInt("forumid",0)
        if (forum== null) {
            forum=project.getDefaultforum()
        }
        article.setForumDTO(webServicesSession.getForumById(project.getId(), forum))
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
            redirect(controller: "forum",  action:  "list" , params: [id:  params.forumid] )
        }
        else{
            render template:"delete" , model: [UCproject:project, article:article ]
        }

    }


}

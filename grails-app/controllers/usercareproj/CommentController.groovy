package usercareproj

import com.sh.db.map.CommentDTO
import com.sh.utils.ModuleDisplay
import org.grails.web.json.JSONObject


class CommentController {


    def webServicesSession

    def messageSource
    def afterInterceptor = [action: this.&invokeMe, only: [ 'item','list']]

    private invokeMe(model) {
        model.curUser=webServicesSession.curentUser
    }



    def index() {}
    def post(){
        def  commentid=params.getInt('commentid') ;
        def id=params.getInt("id");
//        def forumid=params.getInt("forumid");
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def article = webServicesSession.getProjectArticle(project.id, id);


        def comment= new CommentDTO();
        if (commentid>0){
            comment=webServicesSession.getCommentbyId(commentid)
        }
        else {
            comment.setAnswer(params.getBoolean('answer'));
            comment.parentid=params.getInt("parentid")?params.getInt("parentid"):0;
            comment.setArticleDTO(article)
            if(params.getInt("statusValue") ) comment.setStatusDTO(webServicesSession.getArticleStatusById(project.id, article.forumDTO.id ,  params.getInt("statusValue")) )

        }

        comment.text=params.get("commentText")
        def comment2=webServicesSession.addComment(comment);
        getArticleWithRelpies(project, id)

    }

    def delete (){
        def id=params.getInt("id");
        def commentid = params.getInt("commid") ;
        render template:"delete", model: [commentid:commentid ]

    }

    def deleteComment(){
        def commentid = params.getInt("commid") ;
        webServicesSession.delArticleComment(commentid);
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("contentid",commentid);
        resultJson.put("message", message(code: "comment.delete.massage"))

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }
    def getArticleWithRelpies(project, id){
        def article = webServicesSession.getProjectArticle(project.id, id);
        def comments= webServicesSession.getArticleComments(id)
        def answer = webServicesSession.getArticleAnswer(comments);

        JSONObject resultJson = new JSONObject();
        def contents = g.render(template:"/article/itemAndReplies", model:[project:project, comments:comments , article:article,answer:answer ])
        resultJson.put("status","success");
        resultJson.put("contentid",id);
        resultJson.put("value", contents)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }

    def vote(){
        def id=params.getInt("id");
        def value=params.getInt("value");
        def voteVal=webServicesSession.commentVote(id,value, "", request.getRemoteAddr());
        response.contentType = "application/json; charset=UTF-8"
        render voteVal.toJson(message(code: "article.vote.change.massage") as String)
    }



}

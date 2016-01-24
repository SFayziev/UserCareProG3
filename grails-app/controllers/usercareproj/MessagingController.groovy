package usercareproj

import javax.servlet.http.HttpServletResponse

class MessagingController {
    def webServicesSession

    def index() {  }

    def topicUpdated(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id", 0)
        def userid=params.getInt("userid", 0)
        def comment=webServicesSession.getCommentbyId( id );
        def article=webServicesSession.getProjectArticle(project.id , comment.articleDTO.id );

        def user=webServicesSession.getUser(project.id , userid)

        if(article!=null && user!= null){
            render view: 'topicUpdated', model: [project:project, article:article , user:user , comment:comment ]
        }
        else{
            response.sendError HttpServletResponse.SC_NO_CONTENT
        }
    }

    def topicCreated(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id", 0)
        def userid=params.getInt("userid", 0)
        def article=webServicesSession.getProjectArticle(project.id , id );
        def user=webServicesSession.getUser(project.id , userid)

        if(article!=null && user!= null){
            render view: 'topicCreated', model: [project:project, article:article , user:user ]
        }
        else{
            response.sendError HttpServletResponse.SC_NO_CONTENT
        }
    }

    def topicMerged(){
        topicCreated()

    }

    def commentCreated(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id", 0)
        def userid=params.getInt("userid", 0)
        def comment=webServicesSession.getCommentbyId( id );
        def user=webServicesSession.getUser(project.id , userid)

        if(comment!=null && user!= null){
            render view: 'commentCreated', model: [project:project, comment:comment , user:user ]
        }
        else{
            response.sendError HttpServletResponse.SC_NO_CONTENT
        }

    }


}

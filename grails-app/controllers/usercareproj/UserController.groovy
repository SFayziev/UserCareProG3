package usercareproj


import com.sh.db.map.user.UserDTO
import com.sh.utils.ModuleDisplay
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject;
import org.springframework.beans.factory.annotation.Value

import javax.servlet.http.HttpServletResponse
import javax.validation.ConstraintViolation
import javax.validation.ConstraintViolationException

class UserController {
    def webServicesSession
    def webServicesUser;
    def afterInterceptor = [action: this.&invokeMe, only: ['profile']]

    @Value('${default.user.topic.module.id}')
    int uTmoduleid


    @Value('${default.user.topic.count.in.page}')
    int uTopicCounts

    private invokeMe(model) {
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        model.project=project;

    }

    def index() {}

    def popoverinfo(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.getInt("id");
        def user= webServicesSession.getUser(project.id, id);
        render template:"popoverinfo" , model: [userDTO:user]

    }

    def signup(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def user = new UserDTO()

        user.projid= project.id
        user.status=1
//        user.password==params.get("user.password2")

        bindData(user , params, 'user')

        try {
            if(params.get("submit")){
                def newUser= webServicesSession.createLogin(user);
            }
        } catch (ConstraintViolationException e) {
//            ConstraintViolationImpl com= e.metaPropertyValues.get(0)
            for (ConstraintViolation  propertyValue: e.getConstraintViolations() ){
                flash.message=propertyValue.messageTemplate

            }
        }

        render view: 'signup', model: [user:user, UCproject:project]
    }

    def signin(){

    }

    def login(){
        render template:"/modal/loginModal"

    }

    @Secured(["isAuthenticated()"])
    def profile(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def curuser= webServicesSession.getCurentUser();
        def userdto=params.id ? webServicesSession.getUser(project.id , params.getInt("id")) :  curuser;
        if(curuser!= null && (curuser.userPermissionsDTO.manageusers || curuser.id==userdto.id)) {
            def action = params.get("submit")
            if (action) {
                try {
                    def inputPassword1 = params.get("inputPassword1") as String;
                    if (inputPassword1.size() >= 6 && params.get("inputPassword1") == params.get("inputPassword2")) {
                        userdto.setName(params.get("name") as String)
                        userdto.setPassword(inputPassword1)
                        webServicesSession.createLogin(userdto)

                    } else {
                        userdto.setName(params.get("name") as String)
                        webServicesSession.saveProfile(userdto)
                    }

                }
                catch (ConstraintViolationException e) {
                    for (ConstraintViolation propertyValue : e.getConstraintViolations()) {
                        flash.message = propertyValue.messageTemplate
                    }
                }
            }

            def modulPos= webServicesSession.getModuleBydisplaypos(project.id, project.getDefaultforum(), ModuleDisplay.UserProfile, null,userdto )
            render view: "profile", model: [user: userdto, modulPos:modulPos, UCproject:project]
        }
        else{
            response.sendError HttpServletResponse.SC_UNAUTHORIZED
        }
    }

    def topics(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def forum=webServicesSession.getForumById(project.id ,  project.defaultforum  )
        def id = params.getInt('id', 0)
        def userdto=id!= 0? webServicesSession.getUser(project.id , id  ):null
        def modulPos= webServicesSession.getModuleBydisplaypos(project.id, forum.id, ModuleDisplay.UserArticle, null,userdto )
        if (id!=0 || (userdto!= null)){
            params.filter_user_id=id
            render view: "topics", model: [user: userdto, modulPos:modulPos, forum:forum, UCproject: project]
        }
        else{
            response.sendError HttpServletResponse.SC_BAD_REQUEST
        }
    }

    def performer_topic(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def forum=webServicesSession.getForumById(project.id ,  project.defaultforum  )
        def id = params.getInt('id', 0)
        def userdto=id!= 0? webServicesSession.getUser(project.id , id  ):null
        def modulPos= webServicesSession.getModuleBydisplaypos(project.id, forum.id, ModuleDisplay.UserArticle, null,userdto )
        if (id!=0 || (userdto!= null)){
            params.filter_performer_id=id
            render view: "topics", model: [user: userdto, modulPos:modulPos, forum:forum, UCproject: project]
        }
        else{
            response.sendError HttpServletResponse.SC_BAD_REQUEST
        }
    }
    def comments(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id = params.getInt('id', 0)
//        def forum=webServicesSession.getForumById(project.id ,  project.defaultforum  )
        def userdto=id!= 0? webServicesSession.getUser(project.id , id  ):null
        if (id!=0 || (userdto!= null)){
            def comments=webServicesSession.getCommentbyUserId(project.id, id, params.getInt("offset", 0) ,uTopicCounts )
            def total=comments?.size()>0?webServicesSession.getCommentbyUserCounts(project.id, id):0
            params.filter_user_id=id
            def modulPos=webServicesSession.getModuleBydisplaypos(project.id, project.defaultforum , ModuleDisplay.UserComments , null, userdto )
            render view: "comments", model: [ user: userdto, modulPos:modulPos, comments:comments, UCproject: project, total:total , maxRecords:uTopicCounts]
        }
        else{
            response.sendError HttpServletResponse.SC_BAD_REQUEST
        }
    }


    def team(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def defaultForum= webServicesSession.getForumById(project.id, params.int("id", project.getDefaultforum() ))
        def model =[UCproject: project, defaultForum:defaultForum]
        if (defaultForum==null)   response.sendError(HttpServletResponse.SC_NOT_FOUND);
        model.modulPos=webServicesSession.getModuleBydisplaypos(project.id,   defaultForum.id ,  ModuleDisplay.OurTeam , null, null)
        model.usersOurStaff=webServicesSession.getProjectStaffs(project.id, 0 )
        model.usersTopContributors=webServicesSession.getUsersList(project.id,null, null, null, null,0,10,"byraitings" )
        model.usersTopCommenters=webServicesSession.getUsersList(project.id,null, null, null, null,0,10,"bycomment" )
        model.usersNewFace=webServicesSession.getUsersList(project.id,null, null, null, null,0,10,"regdate" )

        render view: "team/team", model: model
    }

    @Secured(["isAuthenticated()"])
    def notification(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def curuser= webServicesSession.getCurentUser();
        if(curuser!= null && (curuser.userPermissionsDTO.manageusers || curuser.id==userdto.id)) {
            def id = params.getInt('id', 0)
            def userdto=id!= 0? webServicesSession.getUser(project.id , id  ):null

            if (id!=0 || (userdto!= null)){
                def notify=webServicesUser.getNotifyByUserId(project.id, userdto.id )
                if(params.get("submit")){
                    notify.setCommentcreated(false);
                    notify.setOurnews(false);
                    notify.setStatuschanged(false)
                    notify.setTopiccreated(false)
                    notify.setTopicmerged(false)
                    notify.setUpdatwatchtopics(false)

                    bindData(notify , params, 'notify')
                    notify=webServicesUser.saveNotificationsDTO(notify)
                }
                def notifyForums =webServicesUser.getUserNotifyForums(project.id, userdto.id)
                def forums = webServicesSession.getForumbyProject(project.id)
//                def notify=webServicesUser.getNotifyByUserId(project.id, userdto.id )
                def followArtics=webServicesUser.getUserFollowsArticles(project.id, userdto.id )
                def modulPos= webServicesSession.getModuleBydisplaypos(project.id, project.getDefaultforum(), ModuleDisplay.UserProfile, null,userdto )

                render view: "notification", model: [user: userdto ,modulPos:modulPos, UCproject:project, notify:notify, followArtics: followArtics, notifyForums:notifyForums, forums:forums ]
            }
            else{
                response.sendError HttpServletResponse.SC_BAD_REQUEST
            }

        }
        else{
            response.sendError HttpServletResponse.SC_UNAUTHORIZED
        }

    }
    def changeForumNotify(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def curuser= webServicesSession.getCurentUser();
        if(curuser!= null && (curuser.userPermissionsDTO.manageusers || curuser.id==userdto.id)) {
            def id = params.getInt('id', 0)
            def userdto = id != 0 ? webServicesSession.getUser(project.id, id) : null

            if (id != 0 || (userdto != null)) {
                def forumnotify=webServicesUser.changeNotifyUserForum(project.id, id , params.int("forumid", 0) )
                JSONObject resultJson = new JSONObject();
                resultJson.put("status","success");
                resultJson.put("contentid",params.int("forumid", 0));
                resultJson.put("value", forumnotify.enabled?"true":"false")
                response.contentType = "application/json; charset=UTF-8"
                render   resultJson.toString()
            }
        }

    }
    def authAjax = {
        response.sendError HttpServletResponse.SC_UNAUTHORIZED
    }
}

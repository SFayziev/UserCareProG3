package usercareproj.settings

import com.sh.db.map.UserPermissionsDTO
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject;

@Secured(['ROLE_MANAGER', 'ROLE_MANGEUSERS'])
class UsersController {
    def webServicesSession
    def index() {}
    def support(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[project:project]
        model.users=webServicesSession.getUsersList(project.id, 1,null, null, null , 0, 0, null )
        render view: '/settings/users/support', model: model

    }

    def editsupport(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[project:project]
        model.user=webServicesSession.getUser(project.id, params.int('id'))

        if (  params.get("submit")=="save"  ) {
            def userPermissionsDTO=model.user.userPermissionsDTO
            userPermissionsDTO.manager = params.getBoolean('userPermissionsDTO.manager', false)
            if (userPermissionsDTO.manager) {
                userPermissionsDTO.showinteamlist = params.getBoolean('userPermissionsDTO.showinteamlist', false)
                userPermissionsDTO.assignperformers = params.getBoolean('userPermissionsDTO.assignperformers', false)
                userPermissionsDTO.chatoperator = params.getBoolean('userPermissionsDTO.chatoperator', false)
                userPermissionsDTO.deletefeedback = params.getBoolean('userPermissionsDTO.deletefeedback', false)
                userPermissionsDTO.editfeedback = params.getBoolean('userPermissionsDTO.editfeedback', false)
                userPermissionsDTO.feedbacktags = params.getBoolean('userPermissionsDTO.feedbacktags', false)
                userPermissionsDTO.managefeedback = params.getBoolean('userPermissionsDTO.managefeedback', false)
                userPermissionsDTO.manageusers = params.getBoolean('userPermissionsDTO.manageusers', false)
                userPermissionsDTO.payforproject = params.getBoolean('userPermissionsDTO.payforproject', false)
                userPermissionsDTO.moderation = params.getBoolean('userPermissionsDTO.moderation', false)
                userPermissionsDTO.translationcontent = params.getBoolean('userPermissionsDTO.translationcontent', false)
                userPermissionsDTO.viewstatistics = params.getBoolean('userPermissionsDTO.viewstatistics', false)
            }
            model.user.position=params.get('user.position')
            try {
                webServicesSession.saveProfile(model.user)
            } catch (Exception e) {
                flash.error = e.message
            }

            redirect action: 'support'
        }
        else {
            render template: '/settings/users/editSupport' , model: model
        }
    }

    def invitesupportuser(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        if (  params.get("submit")=="save"  ) {
            try {
                webServicesSession.createAgentUser(project.id , params.get('user.email') as String)
            } catch (Exception e) {

                flash.error = e.message
            }
            redirect action: 'support'
        }
        else {
            render template: '/settings/users/invitesupportuser'
        }
    }

    def changesupportstatus(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def user= webServicesSession.getUser(project.id , params.getInt('id'))
        def curuser=webServicesSession.getCurentUser();
        def status= params.getInt("state", 0)
        JSONObject resultJson = new JSONObject();
        resultJson.put("userid",params.id );


        if (user != null && curuser.getUserPermissionsDTO().manageusers && (user.getId()!=curuser.getId()) ){
            user.getUserPermissionsDTO().status=status
            webServicesSession.saveProfile(user)
            def contents = g.render(template:"/settings/users/supportList", model: [user:user])
            resultJson.put("status","success");
            resultJson.put( "value" , contents );
        }
        else {
            resultJson.put("status","error");
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()


    }

    def delsupport(){
        if (  params.get("submit")=="save"  ) {
            try {
                def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
                def user = webServicesSession.getUser(project.id, params.getInt('id'))
                def curuser=webServicesSession.getCurentUser();
                if (user != null && curuser.getUserPermissionsDTO().manageusers && (user.getId()!=curuser.getId()) ){
                    user.setUsertype(0)
                    webServicesSession.saveProfile(user)
                }

            } catch (Exception e) {
                flash.error = e.message
            }
            redirect action: 'support'
        }
        else {
            render template: '/modal/deleteModal'
        }

    }

    def list(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[project:project]
        model.users=webServicesSession.getUsersList(project.id, null, null, params.uname, params.email, 0, 0, null )
        render view: '/settings/users/list' , model: model
    }
}

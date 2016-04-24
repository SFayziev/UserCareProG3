package usercareproj.agent

import grails.plugin.springsecurity.annotation.Secured

//@Secured(['ROLE_MANAGER', 'ROLE_MANAGEFEEDBACK', 'ROLE_CHATOPERATOR'])
class AgentController {
    def webServicesSession
    def index() {
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        render view: '/agent/index', model: [UCproject:project]

    }
}

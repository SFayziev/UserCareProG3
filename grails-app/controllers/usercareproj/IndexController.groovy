package usercareproj

import javax.servlet.http.HttpServletResponse

class IndexController {
    def webServicesSession

//    def afterInterceptor = [action: this.&invokeMe, only: ['index']]

    def index() {
//        response.sendError HttpServletResponse.SC_FORBIDDEN
        redirect controller: 'forum', action: 'dashboard', params: params
    }
    def robots(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def robotText = project?.params?.get("robotstxt")?.value
        render(text: robotText!= null?robotText:"" , contentType: "text/xml", encoding: "UTF-8")
    }

    def error403(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        render view: '/403' , model: [UCproject:project]

    }

    def error404(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        render view: '/404' , model: [UCproject:project]

    }
}

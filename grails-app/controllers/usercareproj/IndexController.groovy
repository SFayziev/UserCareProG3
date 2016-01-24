package usercareproj

import com.sh.db.map.CategoriesDTO
import com.sh.db.map.ForumDTO
import com.sh.utils.ForumType
import com.sh.utils.ModuleDisplay

class IndexController {
    def webServicesSession

//    def afterInterceptor = [action: this.&invokeMe, only: ['index']]

    def index() {
        redirect controller: 'forum', action: 'dashboard', params: params
    }
    def robots(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def robotText = project.params?.get("robotstxt")?.value
        render(text: robotText!= null?robotText:"" , contentType: "text/xml", encoding: "UTF-8")
    }

}

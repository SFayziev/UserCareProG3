package usercareproj.settings

import com.sh.db.map.LanguagesDTO
import com.sh.db.map.ModuleParamsType3DTO
import com.sh.db.map.ProjectParamsDTO
import com.sh.db.map.ProjectParamsType3DTO
import com.sh.db.map.ProjectParamsType4DTO
import grails.plugin.springsecurity.annotation.Secured

import javax.validation.ConstraintViolation
import javax.validation.ConstraintViolationException

@Secured(['ROLE_MANAGER'])
class ProjectController {
    def webServicesSession


    def index() {
        settings()
    }
    def settings(){
        def domainUrl=grailsApplication.config.domain.main.url
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        def forums=webServicesSession.getForumbyProject(project.getId() )
        def langs = webServicesSession.getProjectLang(project.getId())
        if (params.get("submit")=="save" ){
            project.alias=params.get("project.alias");
            project.defaultforum=params.getInt("project.defaultforum");
            project.name=params.get("project.name");
            def plangs=params.get("langs")
            def valL=0;
            for(String plang:plangs ){ valL=valL | (1<<Integer.parseInt(plang))  }
            project.lang=valL;
            project.url=params.get("project.url");
            try {
                project=webServicesSession.updateProject(project);
                for(LanguagesDTO languagesDTO: langs){languagesDTO.setStatus(false)}
                for(String plang:plangs ){
                    for(LanguagesDTO languagesDTO: langs){
                        if (languagesDTO.id==Integer.parseInt(plang)) languagesDTO.setStatus(true)
                    }
                }
            } catch (ConstraintViolationException e) {
                for (ConstraintViolation  propertyValue: e.getConstraintViolations() ){
                    flash.message=propertyValue.messageTemplate.replace("{","").replace("}","")
                }
            }
            langs = webServicesSession.getProjectLang(project.getId())
        }
        render view: '/settings/project/settings', model: [project:project,domainUrl:domainUrl,forums:forums, langs:langs  ]
    }

    def design(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        render view: '/settings/project/design', model: [project:project ]
    }

    def robots(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        if (params.get("submit")=="save" ){
            def projectParams = new ArrayList<ProjectParamsDTO>();
            projectParams.add(new ProjectParamsType3DTO(project,'robotstxt', params.get('robotstxt') as String ))
            webServicesSession.addProjectParams(project, projectParams )
        }

        render view: '/settings/project/robots', model: [project:project]
    }

    def aliasing(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        if (params.get("submit")=="save" ){
            def projectParams = new ArrayList<ProjectParamsDTO>();
            projectParams.add(new ProjectParamsType3DTO(project,'aliasurl', params.get('aliasurl') as String ))
            webServicesSession.addProjectParams(project, projectParams )
        }
        def domainUrl=grailsApplication.config.domain.main.url
        def emailNoReply=grailsApplication.config.email.noreply.address
        render view: '/settings/project/aliasing', model: [project:project, domainUrl:domainUrl, emailNoReply:emailNoReply ]
    }

    def emailNotification(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession()).clone()
        if (params.get("submit")=="save" ){
            def projectParams = new ArrayList<ProjectParamsDTO>();
            projectParams.add(new ProjectParamsType3DTO(project,'emailname', params.get('emailname') as String ))
            projectParams.add(new ProjectParamsType4DTO(project,'emailFooter', params.get('emailFooter') as String ))

            webServicesSession.addProjectParams(project, projectParams )
        }
        def domainUrl=grailsApplication.config.domain.main.url
        def emailNoReply=grailsApplication.config.email.noreply.address
        render view: '/settings/project/emailNotification', model: [project:project, domainUrl:domainUrl, emailNoReply:emailNoReply ]
    }
}

package usercareproj.settings

import com.sh.db.map.module.ModuleLinkDTO
import com.sh.db.map.module.ModuleParamsDTO
import com.sh.db.map.module.ModuleParamsType1DTO
import com.sh.db.map.module.ModuleParamsType3DTO
import com.sh.db.map.module.ModuleParamsType4DTO
import com.sh.utils.ModuleDisplay
import com.sh.utils.ModulePosType
import grails.plugin.springsecurity.annotation.Secured
import org.grails.web.json.JSONObject;

@Secured(['ROLE_MANAGER'])
class CustomisationController {

    def webServicesSession

    def afterInterceptor = [action: this.&invokeMe, only: ['dashboard']]

    private invokeMe(model) {
        model.customize=true
    }

    def index() {
        dashboard()
    }

    def dashboard() {
    def customize=true
        redirect(controller: "forum", action: "dashboard", params: [id :params.id , customize:customize ] )
    }
    def widget(){
        def customize=true
        redirect(controller: "forum", action: "widgets" , params: [id :params.id , customize:customize] )
    }
    def list() {
        def customize=true
        redirect(controller: "forum", action: "list" , params: [id :params.id , customize:customize] )
    }

    def moveWidget(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.id as int;
        def direction = params.get('direction')
        JSONObject resultJson = new JSONObject();
        resultJson.put("moduleid",id );
        resultJson.put("direction",direction);
        if (webServicesSession.moveModule(project.id, id , direction as String)){
            resultJson.put("status","success");
        }
        else {
            resultJson.put("status","error");
        }

        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def deleteWidget(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.id as int;
        JSONObject resultJson = new JSONObject();
        resultJson.put("moduleid",id );

        if (webServicesSession.deleteModule(project.id, id)){
            resultJson.put("status","success");
        }
        else {
            resultJson.put("status","error");
        }
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def editWidget(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.id as int;
        def module=webServicesSession.getModuleById(project.id, id)
        render template: module.moduleTypeDTO.edittemplate  , model: [id:id, module:module, UCproject:project ]
    }

    def saveWidget(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.id as int;
        def module=webServicesSession.getModuleById(project.id, id)
        if (module.moduleTypeDTO.id ==5){updateArticleList(project , module)}
        else if(module.moduleTypeDTO.id ==1) {updateProjectDescrptionList(project , module)}
        else if(module.moduleTypeDTO.id ==4) {updatelistWiki(project , module)}
        else if(module.moduleTypeDTO.id ==2) {updatefindOrAddArticle(project , module)}
        else if(module.moduleTypeDTO.id ==12) {updatefacebook(project , module)}
        else if(module.moduleTypeDTO.id ==13) {updatetwitter(project , module)}
        else if(module.moduleTypeDTO.id ==14) {updategooglePlus(project , module)}
        else if(module.moduleTypeDTO.id ==15) {updatetwitter(project , module)}

        JSONObject resultJson = new JSONObject();

        resultJson.put("status","success");
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def updategooglePlus(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'name', params.get('name') as String ))
        moduleParams.add(new ModuleParamsType3DTO(module,'url', params.get('url') as String ))
        webServicesSession.addModuleParams(project.id , module.id , moduleParams )
    }

    def updatetwitter(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'widgetid', params.get('widgetid') as String ))
        if (params.get('formheight')) moduleParams.add(new ModuleParamsType1DTO(module,'formheight', params.getInt('formheight') ))
        webServicesSession.addModuleParams(project.id , module.id , moduleParams )

    }



    def updatefacebook(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'url', params.get('url') as String ))
        if (params.get('formheight')) moduleParams.add(new ModuleParamsType1DTO(module,'formheight', params.getInt('formheight') ))
        webServicesSession.addModuleParams(project.id , module.id , moduleParams )

    }
    def updatefindOrAddArticle(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'placeholder', params.get('placeholder') as String ))
        moduleParams.add(new ModuleParamsType3DTO(module,'addButton', params.get('addButton') as String ))
        moduleParams.add(new ModuleParamsType3DTO(module,'privateTitle', params.get('privateTitle') as String ))
        moduleParams.add(new ModuleParamsType1DTO(module,'showPrivate', params.get('showPrivate')?1:0 ))
        if (params.get('maxRecords')) moduleParams.add(new ModuleParamsType1DTO(module,'maxRecords', params.getInt('maxRecords') ))

        webServicesSession.addModuleParams(project.id , module.id , moduleParams )
    }
    def updatelistWiki(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'title', params.get('title') as String ))
        moduleParams.add(new ModuleParamsType3DTO(module,'modetype', params.get('modetype') as String ))
        if (params.get('maxRecords')) moduleParams.add(new ModuleParamsType1DTO(module,'maxRecords', params.getInt('maxRecords') ))

        webServicesSession.addModuleParams(project.id , module.id , moduleParams )
    }

    def updateProjectDescrptionList(project , module){
        def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType4DTO(module,'description', params.get('description') as String ))
        webServicesSession.addModuleParams(project.id , module.id , moduleParams )
    }

    def updateArticleList(project , module){
       def moduleParams = new ArrayList<ModuleParamsDTO>();
        moduleParams.add(new ModuleParamsType3DTO(module,'title', params.get('title') as String ))
        if (params.get('topicPresentation')) moduleParams.add(new ModuleParamsType3DTO(module,'topicPresentation', params.get('topicPresentation') as String ))
        if (params.get('maxRecords')) moduleParams.add(new ModuleParamsType1DTO(module,'maxRecords', params.getInt('maxRecords') ))
        if (params.get('order')) moduleParams.add(new ModuleParamsType3DTO(module,'order', params.get('order') as String ))
        if (params.get('status')) moduleParams.add(new ModuleParamsType1DTO(module,'status', params.getInt('status')  ))
        if (params.get('type')) moduleParams.add(new ModuleParamsType1DTO(module,'type', params.getInt('type')  ))
        if (params.get('filtertype')) moduleParams.add(new ModuleParamsType3DTO(module,'filtertype', params.get('filtertype') as String ))
        if (params.get('footerMode')) moduleParams.add(new ModuleParamsType3DTO(module,'footerMode', params.get('footerMode') as String ))
        moduleParams.add(new ModuleParamsType1DTO(module,'showTopicAvatar', params.get('showTopicAvatar')?1:0 ))
        webServicesSession.addModuleParams(project.id , module.id , moduleParams )
    }


    def delete(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def id=params.id as int;
        render template:"/settings/customisation/deleteForm" , model: [id:id ]
    }

    def listwidget(){
//        def model= [UCproject: webServicesSession.getProject(getResponse(), getRequest(), getSession())]
//        def id=params.id as int;
        if (params.vtype== null || params.vtype==''){
            params.vtype="dashboard"
        }
        def modulTypes=webServicesSession.getModuleType(params.dtype=='0'?ModulePosType.Main:ModulePosType.Mini)

        render template:"/settings/customisation/listwidget" , model: [modulTypes:modulTypes]
    }

    def addwidget(){
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        def id =params.getInt("id",0)
        def moddisid=params.get("vtype",'dashboard') as String
        def disposid=params.getInt("dtype",0)
        def moddis=moddisid=='dashboard'?ModuleDisplay.Dashboard:(moddisid=='list'?ModuleDisplay.List:ModuleDisplay.Widget)
        def dispos=disposid==0?ModulePosType.Main:ModulePosType.Mini

        webServicesSession.createModule(id , moddis, dispos, params.getInt('modtypeid',0)  )
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }
    def widgetLinkMove(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def modulid =params.getInt("moduleid",0)
        def linkid=params.getInt("linkid",0)
        def direction=params.get("direction")
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","error");
        if (webServicesSession.moveModuleLink(project.id, modulid, linkid, direction as String )){
            resultJson.put("status","success");
        }
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }
    def widgetLinkDelete(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def modulid =params.getInt("moduleid",0)
        def linkid=params.getInt("linkid",0)
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","error");
        if (webServicesSession.deleteModuleLinksDTO( modulid, linkid )){
            resultJson.put("status","success");
        }
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def widgetLinkEdit(){
        def modulid =params.getInt("moduleid",0)
        def linkid=params.getInt("linkid",0)
        def link=linkid!=0? webServicesSession.getModuleLinksDTObyId(modulid, linkid):  new ModuleLinkDTO(modulid)
        render template:"/settings/customisation/widgetLinkEdit" , model: [link:link]
    }
    def widgetLinkSave(){
        def modulid =params.getInt("moduleid",0)
        def linkid=params.getInt("linkid",0)
        def modulLink= linkid!=0?  webServicesSession.getModuleLinksDTObyId(modulid, linkid): new ModuleLinkDTO(modulid)

        modulLink.links=params.get("link.links")
        modulLink.title=params.get("link.title")
        modulLink.newwindow=params.getBoolean("link.newwindow", false)

        webServicesSession.saveModuleLinksDTO(modulLink)
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }
}

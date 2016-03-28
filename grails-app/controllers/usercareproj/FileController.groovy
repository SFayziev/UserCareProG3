package usercareproj

import com.sh.db.map.file.ImgFaClass
import com.sh.db.map.file.ImgFile
import com.sh.db.map.project.ProjectDTO
import com.sh.utils.ImageType
import grails.web.servlet.mvc.GrailsParameterMap
import org.grails.web.json.JSONObject

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class FileController {
    def webServicesSession

    def index() {
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
    }

    def uploadUserAvatar(){

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def curuser= webServicesSession.getCurentUser();
        def userdto=params.id ? webServicesSession.getUser(project.id , params.getInt("id")) :  curuser;
        if (curuser!= null && (curuser.userPermissionsDTO.manageusers || (curuser.id ==userdto.id  ) )) {

            JSONObject resultJson = new JSONObject();
            resultJson.put("status", "success");
            def imgid = 'userLogo' + params.id;
            def imgtype = params.getInt('imgtype');
            def f
            if (imgtype != 1) {
                f = request.getFile('files')
                if (f.empty) {
                    flash.message = 'File cannot be empty'
                    render(view: 'uploadForm')
                    return
                }
            }
            def filedto;
            def imgdto

            filedto = webServicesSession.createImageFile(ImageType.AVATAR, f.inputStream)
            imgdto = new ImgFile(project.id , "avatar"+userdto.id,   imgid, filedto, webServicesSession.createImageFile(ImageType.LOGO, f.inputStream))

            delimg(userdto.imgDTO)
            userdto.imgDTO = imgdto


            webServicesSession.saveProfile(userdto)


            def contents = g.render(template: "/file/imageByType", model: [imgid: imgid, imgclass: "img-responsive rounded-x ", img: imgdto])
            resultJson.put("value", contents);
            resultJson.put("objid", imgid);
            response.contentType = "application/json; charset=UTF-8"
            render resultJson.toString()
        }
        else{
            response.sendError HttpServletResponse.SC_UNAUTHORIZED
        }

    }


    def createImgDTO(HttpServletRequest request, GrailsParameterMap params , String imgid, ProjectDTO project, ImageType imageType){

        def imgtype=params.getInt('imgtype') ;
        def f
        if (imgtype!= 1 ) {
            f = request.getFile('files')
            if (f.empty) {
                flash.message = 'File cannot be empty'
//                render(view: 'uploadForm')
                return null
            }
        }
        def filedto;

        def imgdto

        if (imgtype==1){
            imgdto = new ImgFaClass(project.id , imgid,  imgid , params.get("iconname"), params.get("iconcollor") );
        }
        else{
            filedto=webServicesSession.createImageFile(imageType , f.inputStream )
            imgdto= new ImgFile(project.id , imgid, imgid , filedto, filedto)
        }

        return imgdto

    }
    def uploadCategoryLogo(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        def imgid='forumlogo'+params.id;
        def imgtype=params.getInt('imgtype') ;
        def f
        if (imgtype!= 1 ) {
            f = request.getFile('files')
            if (f.empty) {
                flash.message = 'File cannot be empty'
                render(view: 'uploadForm')
                return
            }
        }
        def filedto;

        def imgdto

        if (imgtype==1){
            imgdto = new ImgFaClass(project.id , imgid,  imgid , params.get("iconname"), params.get("iconcollor") );
        }
        else{
            filedto=webServicesSession.createImageFile(ImageType.AVATAR , f.inputStream )
            imgdto= new ImgFile(project.id , imgid, imgid , filedto, filedto)
        }

        def category=webServicesSession.getCategoryById(project.id, params.getInt('id'))

        if (category!= null){
            delimg(category.imgDTO)
            category.imgDTO=imgdto;
            webServicesSession.saveCategories(category);
        }

        def contents = g.render(template:"/file/imageByType", model: [imgid: imgid , imgclass: "img-responsive avatar rounded-x ", img:imgdto ])
        resultJson.put("value", contents);
        resultJson.put("objid",imgid);
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }
    def uploadProjectImg(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        def imgtype=params.getInt('imgtype') ;
        def f
        if (imgtype!= 1 ) {
            f = request.getFile('files')
            if (f.empty) {
                flash.message = 'File cannot be empty'
                render(view: 'uploadForm')
                return
            }
        }
        def filedto;

        def type=params.get("type")
        def imgdto
        if (type=="logo"){
            if (imgtype==1){
                imgdto = new ImgFaClass(project.id ,"projlogo" ,  "imglogo", params.get("iconname"), params.get("iconcollor") );

            }
            else{
                filedto=webServicesSession.createImageFile(ImageType.LOGO , f.inputStream )
                imgdto= new ImgFile(project.id ,"projlogo" , "imglogo", filedto, filedto)
            }
                if (project?.getProjectDesignDTO()?.getLogoFileDTO()!= null) {
                    delimg(project.getProjectDesignDTO().getLogoFileDTO() )
                }

                project.getProjectDesignDTO().setLogoFileDTO(imgdto)
                webServicesSession.saveProjectDesign(project.getProjectDesignDTO())
                 def contents = g.render(template:"/file/imageByType", model: [imgid: "imglogo", imgclass: "img-responsive", img:imgdto ])
                resultJson.put("value", contents);
                resultJson.put("objid","imglogo");

        }
        else if (type=="bg"){
            filedto=webServicesSession.createImageFile(ImageType.BGIMAGE , f.inputStream )
            if (filedto!= null){
                 imgdto= new ImgFile(project.id ,"projbg" , "imgbg", filedto, filedto)
                delimg(project.getProjectDesignDTO().getBgimageFileDTO()  )
                project.getProjectDesignDTO().setBgimageFileDTO(imgdto)
                webServicesSession.saveProjectDesign(project.getProjectDesignDTO())
                def contents = g.render(template:"/file/imageByType", model: [imgid: "imgbg", imgclass: "img-responsive", img:imgdto ])
                resultJson.put("value", contents);
                resultJson.put("objid","imgbg");
            }
        }

        else if (type=="icon"){
            filedto=webServicesSession.createImageFile(ImageType.ICO , f.inputStream )
            if (filedto!= null){
                 imgdto= new ImgFile(project.id ,"projico" , "imgicon", filedto, filedto)
                delimg(project.getProjectDesignDTO().getFaviconFileDTO()  )
                project.getProjectDesignDTO().setFaviconFileDTO(imgdto)
                webServicesSession.saveProjectDesign(project.getProjectDesignDTO())
                def contents = g.render(template:"/file/imageByType", model: [imgid: "imgicon", imgclass: "img-responsive", img:imgdto ])
                resultJson.put("value", contents);
                resultJson.put("objid","imgicon");
            }
        }


        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def uploadTopicTypeLogo(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        def imgid='forumtype'+params.id;
        def imgtype=params.getInt('imgtype') ;
        def f
        if (imgtype!= 1 ) {
            f = request.getFile('files')
            if (f.empty) {
                flash.message = 'File cannot be empty'
                render(view: 'uploadForm')
                return
            }
        }
        def filedto;
        def imgdto
        if (imgtype==1){
            imgdto = new ImgFaClass(project.id ,imgid , imgid , params.get("iconname"), params.get("iconcollor") );

        }
        else{
            filedto=webServicesSession.createImageFile(ImageType.AVATAR , f.inputStream )
            imgdto= new ImgFile(project.id ,imgid , imgid , filedto, filedto)
        }
        def forumType=webServicesSession.getForumTypeByid(project.id,  params.getInt('id'))
        if (forumType!= null){
            delimg(forumType.articleTypeDTO.imgDTO )
            forumType.articleTypeDTO.imgDTO=imgdto;

            webServicesSession.saveForumType( forumType );
        }

        def contents = g.render(template:"/file/imageByType", model: [imgid: imgid , imgclass: "img-responsive avatar rounded-x ", img:imgdto ])
        resultJson.put("value", contents);
        resultJson.put("objid",imgid);
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }


    def uploadLinkImg(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def modulid =params.getInt("moduleid",0)
        def linkid=params.getInt("linkid",0)
        def imgid="imglink"+linkid
        def modulLink=   webServicesSession.getModuleLinksDTObyId(modulid, linkid)
        JSONObject resultJson = new JSONObject();
        if (modulLink!= null) {
            modulLink.imgDTO = createImgDTO(getRequest(), params, imgid, project, ImageType.LINKIMG)
            webServicesSession.saveModuleLinksDTO(modulLink)
            resultJson.put("status", "success");
            def contents = g.render(template: "/file/imageByType", model: [imgid: imgid, imgclass: "img-responsive avatar rounded-x ", img: modulLink.getImgDTO()])
            resultJson.put("value", contents);
            resultJson.put("objid", imgid);
        } else {
            resultJson.put("status","error");
        }
        response.contentType = "application/json; charset=UTF-8"
        render resultJson.toString()
    }
    def uploadforumLogo(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        def imgid='forumlogo'+params.id;
        def imgtype=params.getInt('imgtype') ;
        def f
        if (imgtype!= 1 ) {
            f = request.getFile('files')
            if (f.empty) {
                flash.message = 'File cannot be empty'
                render(view: 'uploadForm')
                return
            }
        }
        def filedto;

        def type=params.get("type")
        def imgdto

        if (imgtype==1){
            imgdto = new ImgFaClass(project.id ,imgid , imgid , params.get("iconname"), params.get("iconcollor") );

        }
        else{
            filedto=webServicesSession.createImageFile(ImageType.AVATAR , f.inputStream )
            imgdto= new ImgFile(project.id ,imgid , imgid , filedto, filedto)
        }
          def forum=webServicesSession.getForumById(project.id, params.getInt('id'))
        if (forum!= null){
            delimg(forum.imgDTO )
            forum.imgDTO=imgdto;

            webServicesSession.saveForum(forum);
        }

        def contents = g.render(template:"/file/imageByType", model: [imgid: imgid , imgclass: "img-responsive avatar rounded-x ", img:imgdto ])
        resultJson.put("value", contents);
        resultJson.put("objid",imgid);
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()
    }

    def forumImageSelector(){
        def uploadUrl="/file/uploadforumLogo/" + params.id
        showimageSelector(uploadUrl)
    }

    def categoryImageSelector(){
        def uploadUrl="/file/uploadCategoryLogo/" + params.id
        showimageSelector(uploadUrl)
    }

    def topicTypeSelector(){
        def uploadUrl="/file/uploadTopicTypeLogo/" + params.id
        showimageSelector(uploadUrl)
    }

    def projectImageSelector(){
        def uploadUrl="/file/uploadProjectImg?type=" + params.get('type')
        showimageSelector(uploadUrl)
    }
    def widgetLinkImgSelector() {
        def uploadUrl="/file/uploadLinkImg?moduleid=" + params.get('moduleid') + '&linkid='+params.get('linkid')
        showimageSelector(uploadUrl)
    }

    def userAvatarSelector(){
        def user= webServicesSession.getCurentUser();
        if (null!=user && (user.id==params.getInt('id') || user.getUserPermissionsDTO().manageusers )){
            def uploadUrl="/file/uploadUserAvatar/"  + params.id
            showimageSelector(uploadUrl)
        }else {
            response.sendError HttpServletResponse.SC_FORBIDDEN
        }


    }

    def showimageSelector(uploadUrl){
        def faclass=webServicesSession.getLocalImageByType(1);
        render template: "imageSelector" , model: [faclass:faclass, uploadUrl:uploadUrl, withicon:params.get('withicon')]

    }



    def delimg(img ){

        try {
            if (img!= null && img.id != null){
                img.deleted=true
                webServicesSession.updateImgDTO(img)
            }
        } catch (Exception ex) {
            log.error(ex)
        }

    }

}

package usercareproj.translation

import com.sh.db.map.I18nMessageDTO
import com.sh.db.map.I18nMessageValueDTO
import com.sh.db.map.project.LanguagesDTO
import org.grails.web.json.JSONObject;

class ProjecttransController {

    def webServicesSession
    def translateService
    def index() {

    }

    def mkeyvalue(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def id=params.getInt('id');
        def mkey =params.get('mkey') as String
        def sellangid=params.get('sellang') as String
        def transval=project.getMessage(mkey+'.'+id ,null, null, new Locale(sellangid ) )

        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("value", transval)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }
    def savetranslate(){
        def mkey =params.get('mkey') as String
        mkey = mkey + "." +params.get('id') as String
        def sellangid=params.get('selectLang') as String
        def transvalue= params.get('transvalue') as String
        def sellan=webServicesSession.getLanguageByKey(sellangid);

        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def i18nMessageDTO= project.getI18nMessages().get(mkey);
        if (i18nMessageDTO== null){
            i18nMessageDTO= new I18nMessageDTO(mkey ,project );
            project.getI18nMessageDTOList().add(i18nMessageDTO)
            webServicesSession.saveI18nMessage(project , i18nMessageDTO);
        }

        I18nMessageValueDTO i18nMessageValueDTO= new I18nMessageValueDTO(i18nMessageDTO,sellan.id  ,  transvalue );
        i18nMessageDTO.setI18nMessageValue(i18nMessageValueDTO);
        webServicesSession.saveI18nMessage(project , i18nMessageDTO);
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }


    def bingtranslate(){
        def ttext =params.get('text') as String
        def keylang= params.get('keylang') as String
        def sellang=params.get('sellang') as String
        def trans= translateService?.translate(ttext ,keylang ,  sellang)
        JSONObject resultJson = new JSONObject();
        resultJson.put("status","success");
        resultJson.put("value", trans)
        response.contentType = "application/json; charset=UTF-8"
        render   resultJson.toString()

    }
    def forum(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def id=params.getInt('id');
        def forum=webServicesSession.getForumById(project.getId(), id)
        model.curval=forum.name

        model.mkey=params.get('mkey')

        def activleLangs=webServicesSession.getProjectActiveLangs(project.id).clone()
        def  selectLangs;
        selectLangs=new ArrayList<LanguagesDTO>();

        for(LanguagesDTO languagesDTO:activleLangs){
            if (forum.langid== languagesDTO.id){
                model.selLang=languagesDTO
            }
            else{
                selectLangs.add(languagesDTO)
            }
        }

        if (!selectLangs.empty){
            model.transval=project.getMessage(model.mkey+'.'+id ,null, null, new Locale(selectLangs.get(0).namesmall ) )
            model.selectLang=selectLangs.get(0)
        }



        model.selectLangs=selectLangs
        model.keylang=forum.langid

        render template: "/projecttrans/translateForm" ,  model: model


    }
    def topicarticsatus(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def satusid=params.getInt('id');
        def forumid=params.getInt('forumid');
        def forum=webServicesSession.getForumById(project.id, forumid)
        def articleStatus=webServicesSession.getArticleStatusById(project.id,forumid , satusid )
        def curval=articleStatus.name
        traslateForm(curval, params.get('mkey') , articleStatus.id , forum )

    }

    def topictag(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def typeid=params.getInt('id');
        def forumid=params.getInt('forumid');
        def forum=webServicesSession .getForumById(project.id, forumid)

        def typeType=webServicesSession.getTagById(project.id, forumid,  typeid  )
        def curval=typeType.name
        traslateForm(curval, params.get('mkey') , typeType.id , forum )

    }
    def topictype(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def typeid=params.getInt('id');
        def forumid=params.getInt('forumid');
        def forum=webServicesSession.getForumById(project.id, forumid)

        def topicType=webServicesSession.getForumTypeByid(project.id,  typeid  )
        def curval=topicType.articleTypeDTO.name
        traslateForm(curval, params.get('mkey') , topicType.id , forum )

    }

    def traslateForm(curval, mkey, id, forumdto ){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())

        def model=[curval:curval, mkey:mkey]
        def activleLangs=webServicesSession.getProjectActiveLangs(project.id).clone()
        def  selectLangs;
        selectLangs=new ArrayList<LanguagesDTO>();

        for(LanguagesDTO languagesDTO:activleLangs){
            if (forumdto.langid!= languagesDTO.id){
                selectLangs.add(languagesDTO)
            }
        }
        model.selLang=webServicesSession.getProjectLangbyId(project.id, forumdto.langid )
        if (!selectLangs.empty){
            model.transval=project.getMessage(model.mkey+'.'+id ,null, null, new Locale(selectLangs.get(0).namesmall ) )
            model.selectLang=selectLangs.get(0)
        }
        model.selectLangs=selectLangs
        model.keylang=forumdto.langid
        render template: "/projecttrans/translateForm" ,  model: model
    }


    def category(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def id=params.getInt('id');
        def category=webServicesSession.getCategoryById(project.getId(), id)
        def forum=webServicesSession.getForumById(project.id, category.forumid)
        model.curval=category.name

        model.mkey=params.get('mkey')

        def activleLangs=webServicesSession.getProjectActiveLangs(project.id).clone()
        def  selectLangs;
        selectLangs=new ArrayList<LanguagesDTO>();

        for(LanguagesDTO languagesDTO:activleLangs){
            if (forum.langid== languagesDTO.id){
                model.selLang=languagesDTO
            }
            else{
                selectLangs.add(languagesDTO)
            }
        }

        if (!selectLangs.empty){
            model.transval=project.getMessage(model.mkey+'.'+id ,null, null, new Locale(selectLangs.get(0).namesmall ) )
            model.selectLang=selectLangs.get(0)
        }



        model.selectLangs=selectLangs
        model.keylang=forum.langid

        render template: "/projecttrans/translateForm" ,  model: model
    }

    def module(){
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def model=[UCproject:project]
        def id=params.getInt('id');
        def module=webServicesSession.getModuleById(project.id, id)
        def forum=webServicesSession.getForumById(project.id , module.forumid)
        model.curval=module.params?.title?.value

        model.mkey=params.get('mkey')

        def activleLangs=webServicesSession.getProjectActiveLangs(project.id).clone()
        def  selectLangs;
        selectLangs=new ArrayList<LanguagesDTO>();

        for(LanguagesDTO languagesDTO:activleLangs){
            if (forum.langid== languagesDTO.id){
                model.selLang=languagesDTO
            }
            else{
                selectLangs.add(languagesDTO)
            }
        }

        if (!selectLangs.empty){
            model.transval=project.getMessage(model.mkey+'.'+id ,null, null, new Locale(selectLangs.get(0).namesmall ) )
            model.selectLang=selectLangs.get(0)
        }
        model.selectLangs=selectLangs
        model.keylang=forum.langid
        render template: "/projecttrans/translateForm" ,  model: model
    }

}

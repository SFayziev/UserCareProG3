package usercareproj

import com.sh.db.map.forum.CategoriesDTO
import com.sh.db.map.forum.ForumDTO
import com.sh.utils.ForumType

class ModulesTagLib {
    static recordsInPage = 5L
    static defaultEncodeAs = [taglib: 'text']
    static namespace = 'modules'
    def webServicesSession

    //static encodeAsForTags = [tagName: [taglib:'html'], otherTagName: [taglib:'none']]
    def articleList = { attrs ->
        def params = attrs.params
        def module = attrs.params.module
        if (params.forum == null) {
            params.forum = webServicesSession.getForumById(params.project.id, module.forumid ? module.forumid :  project.defaultforum )
        }


        if (module != null) {
            if (!params.params.order) {
                params.params.order = module.params?.order?.value
            }
            if (!params.params.status) {
                params.params.status = module.params?.status?.value
            }


            if (!params.params.type && module.params.type != null) {
                params.params.type = module.params?.type?.value
            }
            params.maxRecords = module.params.maxRecords != null ? module.params.maxRecords.value : recordsInPage;
            params.forumTypes=webServicesSession.getForumTypeByForumid(params.project.id , params.forum.id,1 )
            params.topicStatuses=webServicesSession.getTopicTypeStatusByTopicId(params.project.id , params.params.int('type', -1) )
            def articleListParams = [count: params.maxRecords, offset: params.params.offset, type: params.params.int('type'), status: params.params.int('status'), order: params.params.order, performerid: params.params.int('filter_performer_id',0), userid :params.params.int('filter_user_id',0)]
            articleListParams.catid=params.params.int('category',0)
            if (articleListParams.catid>0){
                params.category=webServicesSession.getCategoryById(params.project.id, articleListParams.catid )
            }
            params.lastArticle = webServicesSession.getArticleList(params.project, params.forum, articleListParams)
            params.pageCount = webServicesSession.getLastArticleRecCount(params.project, params.forum, articleListParams)
            params.catalogParams = articleListParams
            out << render(template: "/project/lastArticle", model: params)
        }

    }

    def articleDetails = { attrs ->
        def params =  attrs.params
        def article = attrs.params.article
        def module =  attrs.params.module
        if (article.type != null) params.topicType= webServicesSession.getForumTypeByid(article.getProjid(),  article.type.id)
        if (module != null) {

            if (module.params.topicPresentation?.value == 'full' && article.answerCommentid) {
                params.answer = article.answerCommentid ? webServicesSession.getCommentbyId(article.answerCommentid) : null;
            }
            out << render(template: "/article/articleItem" +params.forum.type.ordinal(), model: params)
        }

    }

    def articleItems = { attrs ->
        out << render(template: "/article/itemAndReplies" , model: params)
    }

    def repliesItems = { attrs ->
        def params =  attrs.params
        def article = attrs.params.article
        if (article != null) {
            params.comments= webServicesSession.getArticleComments(article.id)
            out << render(template: "/comment/replies" , model: params)
        }
    }

    def customScript = { attrs ->
        out << render(template: "/project/customScript" , model: params)
    }

    def userAvatar = { attrs ->
        def params = attrs.params
        def user = attrs.params.user
        def curuser;

        try {
            curuser=webServicesSession.getCurentUser();
            if (curuser!= null && user.id==curuser.id ) params.canchangeavatar=true
        } catch (Exception e) {
        }


        out << render(template: "/widgets/userAvatar" , model: params)
    }

    def wikiList = { attrs ->
        def params = attrs.params
        def knowledgeForums = webServicesSession.getForumByType(params.project.id, ForumType.Knowledgebase)
        def module = attrs.params.module
        def categoriesDTOs= new ArrayList<CategoriesDTO>()
        if (module != null) {
            params.maxRecords = module.params.maxRecords != null ? module.params.maxRecords.value : recordsInPage;
            for (ForumDTO forumDTO : knowledgeForums) {
                for (CategoriesDTO categoriesDTO : webServicesSession.getCategoryByForumId(params.project.id, forumDTO.getId()) ) {
                    categoriesDTO.articleDTOList = webServicesSession.getArticleList(params.project, forumDTO, [count: params.maxRecords ? params.maxRecords : 5, catid: categoriesDTO.getId()])
                    categoriesDTOs.add(categoriesDTO);
                }
            }
            out << render(template: "/project/projectWiki", model: [knowledgeForums: knowledgeForums, categoriesDTOs:categoriesDTOs, module: module])
        }

    }

    def communityStats = { attrs ->
        def params = attrs.params
        def project = params.project;
        if (project) {
            def projectStats = webServicesSession.getProjectStats(project.id)
            def staffs = webServicesSession.getProjectStaffs(project.id, 3)
            out << render(template: "/widgets/communityStats", model: [projectStats: projectStats, staffs: staffs])
        }
    }

    def forumTypeList = { attrs ->
        def params = attrs.params
        def project = params.project;
        if (project) {
            def communitys = webServicesSession.getForumByType(project.id, ForumType.Community)
            def knowledgebases = webServicesSession.getForumByType(project.id, ForumType.Knowledgebase)
            out << render(template: "/widgets/forums", model: [communitys: communitys, knowledgebases: knowledgebases])
        }
    }

    def projectLinks = { attrs ->
        def params = attrs.params
        def project = params.project;
        def module =  attrs.params.module
        def links=webServicesSession.getModuleLinksDTObyModuleId(module.id)
        if (project) {
            out << render(template: "/widgets/links", model: [links:links])
        }
    }

    def articleTags= {attrs ->
        def params = attrs.params
        def tags=webServicesSession.getArticleTags( params.project.id ,  params.article.id )
        out << render(template: "/article/articleTags", model: [tags:tags ])
    }
    def projectLogo = { attrs ->
        def params = attrs.params
        def project = params.project;
        if (project) {
            out << render(template: "/widgets/projectLogo")
        }
    }

    def projectDescription = { attrs ->
        def params = attrs.params
        def project = params.project;
        if (project) {
            out << render(template: "/project/projectDescription")
        }
    }

    def articleControlePanel = { attrs ->
        def params = attrs.params
        params.forumStatuses=webServicesSession.getTopicTypeStatusByTopicId(params.project.id , params.topictype )
        params.tags=webServicesSession.getTagsByForumId(params.forum.id)
        params.categorys=webServicesSession.getCategoryByForumId(params.project.id , params.forum.id )
        params.staffs = webServicesSession.getProjectStaffs(attrs.params.project.id, 0)
        out << render(template: "/widgets/articleControlPanel", model: params)
    }

    def articleStatus= {attrs ->
        def params = attrs.params
//        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        if (params.forum == null) {
            params.forum = webServicesSession.getForumById(params.project.id,  params.project.defaultforum )
        }

        def articleListParams = [count: params.maxRecords]
        params.pageCount = webServicesSession.getLastArticleRecCount(params.project, params.forum, articleListParams)

        out << render(template: "/project/articleStatus", model: params)

    }


    def settingLeftMenu={ attrs ->
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def module =[UCproject:project];

        def selCom=g.cookie(name: 'selCommunity') as String
        def selKnow=g.cookie(name: 'selKnowledgebase') as String
        def selHelp=g.cookie(name: 'selHelpDesk') as String
        module.selCommunityid = selCom==''?0: Integer.parseInt(selCom)
        module.selKnowledgebaseid = selKnow==''?0: Integer.parseInt(selKnow)
        module.selHelpDeskid = selHelp==''?0: Integer.parseInt(selHelp)

        if (module.selCommunityid!=0){
            module.community=webServicesSession.getForumById(project.id , module.selCommunityid ,  ForumType.Community)
        }else{
            def communities=webServicesSession.getForumByType(project.id , ForumType.Community)
            if (communities.size()>0) {
                module.community=communities.get(0)
                module.selCommunityid=module.community.id
            }
        }

        if (module.selHelpDeskid!=0){
            module.helpDesk=webServicesSession.getForumById(project.id , module.selCommunityid ,  ForumType.HelpDesk)
        }else{
            def communities=webServicesSession.getForumByType(project.id , ForumType.HelpDesk)
            if (communities.size()>0) {
                module.helpDesk=communities.get(0)
                module.selHelpDeskid=module.helpDesk.id
            }
        }


        if (module.selKnowledgebaseid !=0){
            module.knowledgebas=webServicesSession.getForumById(project.id , module.selKnowledgebaseid ,  ForumType.Knowledgebase)
        }else{
            def communities=webServicesSession.getForumByType(project.id , ForumType.Knowledgebase)
            if (communities.size()>0) {
                module.knowledgebas = communities.get(0)
                module.selKnowledgebaseid=module.knowledgebas.id
            }
        }

        out << render(template: "/settings/leftMenu", model: module)

    }

    def mainProjectUrl={
        def writer = out
        def project=webServicesSession.getProject(getResponse(), getRequest(), getSession())
        def domProtocol=grailsApplication.config.domain.protocol
        def mainurl= grailsApplication.config.domain.main.url
        writer << domProtocol + "://" + project.alias +"."+ mainurl
    }

    def forumCategories={ attrs ->
        def params = attrs.params
        def module = attrs.params.module
        params.forum=attrs.forum
        params.categories=webServicesSession.getCategoryByForumId(params.project.id, module.forumid )

        out << render(template: "/widgets/forumCategories", model: params)


    }
}
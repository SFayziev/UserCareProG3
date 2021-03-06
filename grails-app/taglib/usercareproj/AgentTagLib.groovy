package usercareproj

import org.springframework.beans.factory.annotation.Value

class AgentTagLib {
    static defaultEncodeAs = [taglib: 'text']
    static namespace = 'agent'

    @Value('${default.agent.topic.module.id}')
    int agentTopicModuleId

    def webServicesSession

    def searchPanel = { attrs ->
        out << render(template: "/agent/article/searchPanel" , model: params)
    }

    def listArticle={ attrs ->
        def params = attrs.params
        params.module=webServicesSession.getModuleById(0,agentTopicModuleId)
        out << render(template: "/agent/article/articleList" , model: params)
    }

    def forumList={attrs ->
        def params = attrs.params
        def project = params.project;
        params.forums=webServicesSession.getForumbyProject(project.id)
//        params.communitys = webServicesSession.getForumByType(project.id, ForumType.Community)
//        params.knowledgebases = webServicesSession.getForumByType(project.id, ForumType.Knowledgebase)
//        params.helpdesks = webServicesSession.getForumByType(project.id, ForumType.HelpDesk)
//        params.chats = webServicesSession.getForumByType(project.id, ForumType.Chat)
        out << render(template: "/agent/article/searchOption/forumList" , model: params)

    }

    def sortBy={attrs ->
        def params = attrs.params
        out << render(template: "/agent/article/searchOption/sortBy" , model: params)
    }

    def filterBy={attrs ->
        def params = attrs.params
        def project = params.project;
        params.filters=webServicesSession.getArticleFilterByProjId(project.id)
        out << render(template: "/agent/article/searchOption/filterBy" , model: params)
    }
}

package usercareproj

class AgentTagLib {
    static defaultEncodeAs = [taglib: 'text']
    static namespace = 'agent'
    def webServicesSession

    def searchPanel = { attrs ->
        out << render(template: "/agent/searchPanel" , model: params)
    }
}

package usercareproj

class ProjectTagLib {
    static recordsInPage = 5L
    static defaultEncodeAs = [taglib: 'text']
    static namespace = 'project'
    def webServicesSession

    def selectActiveLangs = { attrs ->
        def params = attrs.params
        params.langs=webServicesSession.getProjectActiveLangs(params.project.id)

        out << render(template: "/project/selectLanguages", model: params)


    }
}

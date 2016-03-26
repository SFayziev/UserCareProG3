package usercareproj

import com.sh.utils.ForumType

class CustomisationTagLib {
    static defaultEncodeAs = [taglib: 'text']
    static namespace = 'customisation'
    def webServicesSession

    def linkForm = { attrs ->

        def params = attrs.params
        def module = params.module;
        params.links=webServicesSession.getModuleLinksDTObyModuleId(module.id)
        out << render(template: "/settings/customisation/linksForm", model: params)

    }
}

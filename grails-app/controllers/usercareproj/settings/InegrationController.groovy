package usercareproj.settings

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_MANAGER'])
class InegrationController {

    def index() {}
}

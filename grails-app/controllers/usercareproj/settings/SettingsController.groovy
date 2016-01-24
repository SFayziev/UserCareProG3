package usercareproj.settings

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_MANAGER'])
class SettingsController {

    def index() {
        redirect  controller: 'project', namespace: null
    }
}

package usercareproj.settings

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_MANAGER', 'ROLE_PAYPROJECT' ])
class BillingController {

    
    def index() {}
}

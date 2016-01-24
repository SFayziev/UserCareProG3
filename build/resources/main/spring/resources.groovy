import com.sh.common.AuthenticationProcessingFilter

// Place your Spring DSL code here
beans = {

    importBeans('file:grails-app/conf/spring/resources.xml')
    authenticationProcessingFilter(AuthenticationProcessingFilter) {
        authenticationManager = ref('authenticationManager')
        sessionAuthenticationStrategy = ref('sessionAuthenticationStrategy')
        authenticationSuccessHandler = ref('authenticationSuccessHandler')
        authenticationFailureHandler = ref('authenticationFailureHandler')
        rememberMeServices = ref('rememberMeServices')
        authenticationDetailsSource = ref('authenticationDetailsSource')
        requiresAuthenticationRequestMatcher = ref('filterProcessUrlRequestMatcher')
        usernameParameter = 'username'
        passwordParameter = 'password'
        continueChainBeforeSuccessfulAuthentication =  false
        allowSessionCreation =  true
        postOnly = true

    }

}

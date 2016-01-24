class UrlMappings {


    static mappings = {
        "/robots.txt" (controller: "index" , action: "robots")
        "/login/$action?"(controller: "login")
        "/logout/$action?"(controller: "logout")
        "/list/$id/$catalog?"(controller: "forum" , action: "list" )
        "/dashboard/$id/$catalog?"(controller: "forum", action: "dashboard" )
        "/settings/community/$action?/$id?(.$format)?"(controller: "community")
        "/settings/project/$action?/$id?(.$format)?"(controller: "project")
        "/settings/knowledgebase/$action?/$id?(.$format)?"(controller: "knowledgebase")
        "/settings/helpdesk/$action?/$id?(.$format)?"(controller: "helpdesk")
        "/settings/chat/$action?/$id?(.$format)?"(controller: "chat")
        "/settings/users/$action?/$id?(.$format)?"(controller: "users")
        "/settings/inegration/$action?/$id?(.$format)?"(controller: "inegration")
        "/settings/billing/$action?/$id?(.$format)?"(controller: "billing")
        "/settings/customisation/$action?/$id?(.$format)?"(controller: "customisation")
        "/traslation/projecttrans/$action?/$id?(.$format)?"(controller: "projecttrans")

        "/article/$action?/$forumid?/$id?(.$format)?"(controller: "article")
        "/comment/$action?/$forumid?/$id?(.$format)?"(controller: "comment")
        "/file/$action?/$id?(.$format)?"(controller: "file")
        "/forum/$action?/$id?(.$format)?"(controller: "forum")
        "/user/$action?/$id?(.$format)?"(controller: "user")
        "/messaging/$action?/$id?(.$format)?"(controller: "messaging")

        "/"(controller: "index")
        "500"(view:'/error')
        "404"(view:'/404')
        "401"(view:'/401')
        "401"(view:'/401')
    }
}

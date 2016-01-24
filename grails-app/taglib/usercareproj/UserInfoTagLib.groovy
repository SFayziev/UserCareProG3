package usercareproj

class UserInfoTagLib {
    static defaultEncodeAs = [taglib:'text']
    def webServicesSession
    static namespace = 'userinfo'
    //static encodeAsForTags = [tagName: [taglib:'html'], otherTagName: [taglib:'none']]
    def usermenu={
        def writer = out

        def contents = g.render(template:"/user/usermenu" , model: [user: webServicesSession.getCurentUser() ])
        writer << contents
    }


}

<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="main"/>
    <title></title>

</head>
<body>

<!--=== Content Part ===-->
<div class="container content-sm">

    <div class="row ">
        <div class="col-md-9">

            <div class="tag-box tag-box-v1 margin-bottom-10">

                <div class="panel-body">
                     <g:form controller="user" action="profile" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
                         <div class="form-group">
                             <label  class="col-lg-4 control-label"></label>
                             <div class="col-lg-8">
                                 <h4><g:message code="user.profile.title"/></h4>
                             </div>

                         </div>
                         <div class="form-group">
                             <label for="name" class="col-lg-4 control-label"><g:message code="setting.name"/></label>
                             <div class="col-lg-8">
                                 <label class="input">
                                     <i class="icon-append fa fa-users" data-toggle="popover" title="<g:message code="setting.user.info.visible.forall"/>"  ></i>
                                     <input class="form-control" id="name" name="name" required type="text" value="${user?.name}">
                                     <div class="note note-success"><g:message code="user.profile.name.info"/></div>
                                     <div class="help-block with-errors"></div>
                                 </label>
                             </div>
                         </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-lg-4 control-label"><g:message code="setting.email"/></label>
                            <div class="col-lg-8">
                                <label class="input">
                                    <i class="icon-append fa fa-lock" data-toggle="popover" title="<g:message code="setting.user.info.visible.private"/>"  ></i>
                                    <input class="form-control" id="inputEmail1" placeholder="Email" type="email" readonly value="${user?.email}">
                                    <div class="note note-success"><g:message code="user.profile.email.info"/></div>
                                 </label>
                            </div>
                        </div>
                         <div class="form-group">
                             <label for="TimeZone" class="col-lg-4 control-label">Time Zone</label>
                             <div class="col-lg-8">
                                 <label class="select">
                                 <g:timeZoneSelect name="TimeZone" class="form-control" />
                                     <i></i>
                                 </label>
                             </div>
                         </div>

                        <div class="form-group">
                            <label for="inputPassword1" class="col-lg-4 control-label">Password</label>
                            <div class="col-lg-8">
                                <label class="input">
                                    <i class="icon-append fa fa-lock" data-toggle="popover" title="<g:message code="setting.user.info.visible.private"/>"  ></i>
                                    <input  data-minlength="6" required id="inputPassword1" name="inputPassword1" placeholder="Password" type="password">
                                    <div class="help-block with-errors"></div>
                                </label>
                            </div>
                        </div>

                         <div class="form-group">
                             <label for="inputPassword2" class="col-lg-4 control-label">Repeat password</label>
                             <div class="col-lg-8">
                                 <label class="input">
                                     <i class="icon-append fa fa-lock"></i>
                                     <input   data-minlength="6" required id="inputPassword2" name="inputPassword2" placeholder="Repeat password" type="password" data-match="#inputPassword1">
                                     <div class="help-block with-errors"></div>
                                 </label>
                             </div>
                         </div>

                        <div class="form-group">
                            <div class="col-lg-offset-6 col-lg-6">
                                <button type="submit" name="submit" value="save" class="btn-u btn-u-green">Save changes</button>

                            </div>
                        </div>
                    </g:form>
               </div>
            </div>



        </div>

        <div class="col-xs-3  padding-right-5 padding-left-5">
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userAvatar" />
            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userContact" />
            </div>

            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userMenu" />
            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userAdminMenu" />
            </div>
        </div>


    </div>
</div>
<g:render template="/modal/imageSelector"/>

<asset:javascript src="validator.min.js"/>
<asset:stylesheet  src="sky-forms.css"/>
</body>
</html>
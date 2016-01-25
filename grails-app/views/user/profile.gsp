<g:applyLayout name="userMain">
    <content tag="mainContent1">
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
    </content>
</g:applyLayout>

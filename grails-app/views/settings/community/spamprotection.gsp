<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> /
        <g:link controller="community" action="spamprotection" > <g:message code="setting.leftMenu.community.spam.protection" /> </g:link>
        </h3>

        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3><g:message code="setting.community.moderation.info" /> </h3>
                </div>
            </div>
        </div>

    <div class="col-md-6">
        <g:form controller="community" action="spamprotection" id="${forum.id}" class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >

            <div class="panel panel-default">

                <div class="panel-heading">
                <g:message code="setting.community.moderation.settings" />: <b><g:message code="widget.community.stats.topic" /></b>
            </div>
                <input type="hidden" name="spamProtect.ftype" value="0">
                <input type="hidden" name="spamProtect.id" value="${spamProtectArticle?.id}">

            <div class="panel-body">
                <div class="checkbox c-checkbox">
                 <label class="checkbox state-success">
                     <input id="sso"  name="spamProtect.sanonymousfeedback"  value="1" <g:if test="${spamProtectArticle?.sanonymousfeedback}">checked=""</g:if>  type="checkbox">
                     <span class="fa fa-check"></span>
                     <g:message code="setting.community.moderation.setting.anonymous.feedback"/>
                 </label>
                </div>
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.anonymousvoting"  value="1" <g:if test="${spamProtectArticle?.anonymousvoting}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.setting.anonymous.voting"/> </label>
                </div>
            </div>

            <div class="panel-heading"><g:message code="setting.community.moderation.captcha" /></div>
            <div class="panel-body">
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaanonymous"  value="1" <g:if test="${spamProtectArticle?.captchaanonymous}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.anonymous.user"/> </label>
                </div>
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaauthuser"  value="1" <g:if test="${spamProtectArticle?.captchaauthuser}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.authenticated.user"/> </label>
                </div>

                 <div >
                    <label><g:message code="setting.community.moderation.captcha.note" /></label>
                    <div class="checkbox c-checkbox">
                        <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.captchaemailnotverified"  value="1" <g:if test="${spamProtectArticle?.captchaemailnotverified}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.email.verificate"/> </label>
                    </div>
                     <fieldset>
                         <div class="form-group">
                            <label  class="col-lg-5 control-label"><g:message code="setting.community.moderation.mess.count" /></label>
                             <div class="col-lg-5">
                                <input name="spamProtect.captchamessagecount" class="form-control" value="${spamProtectArticle?.captchamessagecount}"  type="number">
                            </div>
                        </div>
                    </fieldset>
                     <fieldset>
                         <div class="form-group">
                            <label class="col-lg-5 control-label"><g:message code="setting.community.moderation.account.age" /></label>
                             <div class="col-lg-5">
                                <input name="spamProtect.captchaaccountage" class="form-control" value="${spamProtectArticle?.captchaaccountage}"  type="number">
                            </div>
                         </div>
                    </fieldset>
                    <div class="note"> <g:message code="setting.community.moderation.note" /></div>
                </div>
            </div>

            <div class="panel-heading"><g:message code="setting.community.moderation.title" /></div>
            <div class="panel-body">
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modflagbyusers"  value="1" <g:if test="${spamProtectArticle?.modflagbyusers}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.byuser"/> </label>
                </div>
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modbyakismet"  value="1" <g:if test="${spamProtectArticle?.modbyakismet}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.byakisment"/> </label>
                </div>
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modexternallink"  value="1" <g:if test="${spamProtectArticle?.modexternallink}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.external.link"/> </label>
                </div>
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modseletecteduser"  value="1" <g:if test="${spamProtectArticle?.modseletecteduser}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.selected.user"/> </label>
                </div>
                <div >
                    <label><g:message code="setting.community.moderation.captcha.note" /></label>

                    <div class="checkbox c-checkbox">
                        <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.modemailnotverified"  value="1" <g:if test="${spamProtectArticle?.modemailnotverified}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.email.verificate"/> </label>
                    </div>

                    <fieldset>
                        <div class="form-group">
                            <label  class="col-lg-5 control-label"><g:message code="setting.community.moderation.mess.count" /></label>
                            <div class="col-lg-5">
                                <input name="spamProtect.modmessagecount" class="form-control" value="${spamProtectArticle?.modmessagecount}"  type="number">
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label  class="col-lg-5 control-label"> <g:message code="setting.community.moderation.account.age" /> </label>
                            <div class="col-lg-5">
                                <input name="spamProtect.modaccountage" class="form-control" value="${spamProtectArticle?.modaccountage}" type="number">
                            </div>
                        </div>
                    </fieldset>
                    <div class="note"> <g:message code="setting.community.moderation.note" /></div>
                </div>
                <div class="row"><g:render template="/layouts/errorMessage" /></div>
            </div>
            <div class="panel-footer text-center">
                <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
            </div>
        </div>
        </g:form>
    </div>

    <div class="col-md-6">
        <g:form controller="community" action="spamprotection" id="${forum.id}" class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >

            <div class="panel panel-default">
                <div class="panel-heading">
                   <g:message code="setting.community.moderation.settings" />:  <b><g:message code="widget.community.stats.comment" /></b>
                </div>
                <input type="hidden" name="spamProtect.ftype" value="1">
                <input type="hidden" name="spamProtect.id" value="${spamProtectComment?.id}">
            <div class="panel-body">
                <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.sanonymousfeedback"  value="1" <g:if test="${spamProtectComment?.sanonymousfeedback}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.setting.anonymous.feedback"/> </label>
                </div>
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.anonymousvoting"  value="1" <g:if test="${spamProtectComment?.anonymousvoting}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.setting.anonymous.voting"/> </label>
                </div>
            </div>
            <div class="panel-heading"><g:message code="setting.community.moderation.captcha" /></div>
            <div class="panel-body">
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaanonymous"  value="1" <g:if test="${spamProtectComment?.captchaanonymous}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.anonymous.user"/> </label>
                </div>
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaauthuser"  value="1" <g:if test="${spamProtectComment?.captchaauthuser}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.authenticated.user"/> </label>
                </div>

                <div >
                    <label><g:message code="setting.community.moderation.captcha.note" /></label>
                    <div class="checkbox c-checkbox">
                        <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.captchaemailnotverified"  value="1" <g:if test="${spamProtectComment?.captchaemailnotverified}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.email.verificate"/> </label>
                    </div>
                    <fieldset>
                        <div class="form-group">
                            <label  class="col-lg-5 control-label"><g:message code="setting.community.moderation.mess.count" /></label>
                            <div class="col-lg-5">
                                <input name="spamProtect.captchamessagecount" class="form-control" value="${spamProtectComment?.captchamessagecount}"  type="number">
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-lg-5 control-label"><g:message code="setting.community.moderation.account.age" /></label>
                            <div class="col-lg-5">
                                <input name="spamProtect.captchaaccountage" class="form-control" value="${spamProtectComment?.captchaaccountage}"  type="number">
                            </div>
                        </div>
                    </fieldset>
                    <div class="note"> <g:message code="setting.community.moderation.note" /></div>
                </div>
            </div>

            <div class="panel-heading"><g:message code="setting.community.moderation.title" /></div>
            <div class="panel-body">
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modflagbyusers"  value="1" <g:if test="${spamProtectComment?.modflagbyusers}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.byuser"/> </label>
                </div>
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modbyakismet"  value="1" <g:if test="${spamProtectComment?.modbyakismet}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.byakisment"/> </label>
                </div>
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modexternallink"  value="1" <g:if test="${spamProtectComment?.modexternallink}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.external.link"/> </label>
                </div>
               <div class="checkbox c-checkbox">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modseletecteduser"  value="1" <g:if test="${spamProtectComment?.modseletecteduser}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.selected.user"/> </label>
                </div>
                    <div >
                        <label><g:message code="setting.community.moderation.captcha.note" /></label>

                        <div class="checkbox c-checkbox">
                            <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.modemailnotverified"  value="1" <g:if test="${spamProtectComment?.modemailnotverified}">checked=""</g:if>  type="checkbox"><span class="fa fa-check"></span><g:message code="setting.community.moderation.email.verificate"/> </label>
                        </div>

                        <fieldset>
                            <div class="form-group">
                                <label  class="col-lg-5 control-label"><g:message code="setting.community.moderation.mess.count" /></label>
                                <div class="col-lg-5">
                                    <input name="spamProtect.modmessagecount" class="form-control" value="${spamProtectComment?.modmessagecount}"  type="number">
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div class="form-group">
                                <label  class="col-lg-5 control-label"> <g:message code="setting.community.moderation.account.age" /> </label>
                                <div class="col-lg-5">
                                    <input name="spamProtect.modaccountage" class="form-control" value="${spamProtectComment?.modaccountage}" type="number">
                                </div>
                            </div>
                        </fieldset>
                        <div class="note"> <g:message code="setting.community.moderation.note" /></div>
                    </div>
                    <div class="row"><g:render template="/layouts/errorMessage" /></div>
                    </div>
                    <div class="panel-footer text-center">
                        <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                        <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                    </div>

        </div>
        </g:form>
    </div>

        <br>
        <div class="col-md-12">
            <div class="alert alert-info fade in">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><g:message code="setting.community.moderation.captcha" /></h4>
                <p> <g:message code="setting.community.moderation.captcha.info" /> </p>

            </div>
        </div>
        <br>
        <div class="col-md-12">
            <div class="alert alert-info fade in">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><g:message code="setting.community.moderation.title" /></h4>
                <p> <g:message code="setting.community.moderation.premodiration.info" /> </p>

            </div>
        </div>



    </content>
</g:applyLayout>
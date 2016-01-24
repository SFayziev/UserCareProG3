<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="settingMain"/>
    <title></title>
</head>
<body>

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> </li>
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.privacy" /></g:link></li>
    </ol>
    <div class="row">
        <div class="col-md-12">
            <h3><g:message code="setting.community.moderation.info" /> </h3>
        </div>
    <div class="col-md-6">

        <g:form controller="community" action="spamprotection" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
            <input type="hidden" name="spamProtect.ftype" value="0">
            <input type="hidden" name="spamProtect.id" value="${spamProtectArticle?.id}">
            <header><g:message code="setting.community.moderation.settings" />: <b><g:message code="widget.community.stats.topic" /></b> </header>
            <div class="form-group">
                 <label class="checkbox state-success"><input id="sso"  name="spamProtect.sanonymousfeedback"  value="1" <g:if test="${spamProtectArticle?.sanonymousfeedback}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.setting.anonymous.feedback"/> </label>
            </div>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.anonymousvoting"  value="1" <g:if test="${spamProtectArticle?.anonymousvoting}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.setting.anonymous.voting"/> </label>
            </div>
            <header><g:message code="setting.community.moderation.captcha" /></header>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaanonymous"  value="1" <g:if test="${spamProtectArticle?.captchaanonymous}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.anonymous.user"/> </label>
            </div>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaauthuser"  value="1" <g:if test="${spamProtectArticle?.captchaauthuser}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.authenticated.user"/> </label>
            </div>

            <div class="form-group">
                <p><g:message code="setting.community.moderation.captcha.note" /></p>
                <div class="col-lg-12">
                    <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.captchaemailnotverified"  value="1" <g:if test="${spamProtectArticle?.captchaemailnotverified}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.email.verificate"/> </label>
                    <section>
                        <label class="label"><g:message code="setting.community.moderation.mess.count" /></label>
                        <label class="input state-success">
                            <input name="spamProtect.captchamessagecount" class="form-control" value="${spamProtectArticle?.captchamessagecount}"  type="number">
                        </label>
                    </section>
                    <section>
                        <label class="label"><g:message code="setting.community.moderation.account.age" /></label>
                        <label class="input state-success">
                            <input name="spamProtect.captchaaccountage" class="form-control" value="${spamProtectArticle?.captchaaccountage}"  type="number">
                        </label>
                    </section>
                    <div class="note"> <g:message code="setting.community.moderation.note" /></div>


                </div>
            </div>
            <header><g:message code="setting.community.moderation.title" /></header>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.modflagbyusers"  value="1" <g:if test="${spamProtectArticle?.modflagbyusers}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.byuser"/> </label>
            </div>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.modbyakismet"  value="1" <g:if test="${spamProtectArticle?.modbyakismet}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.byakisment"/> </label>
            </div>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.modexternallink"  value="1" <g:if test="${spamProtectArticle?.modexternallink}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.external.link"/> </label>
            </div>
            <div class="form-group">
                <label class="checkbox state-success"><input id="sso"  name="spamProtect.modseletecteduser"  value="1" <g:if test="${spamProtectArticle?.modseletecteduser}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.selected.user"/> </label>
            </div>
            <div class="form-group">
                <p><g:message code="setting.community.moderation.captcha.note" /></p>
                <div class="col-lg-12">
                    <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.modemailnotverified"  value="1" <g:if test="${spamProtectArticle?.modemailnotverified}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.email.verificate"/> </label>
                    <section>
                        <label class="label"><g:message code="setting.community.moderation.mess.count" /></label>
                        <label class="input state-success">
                            <input name="spamProtect.modmessagecount" class="form-control" value="${spamProtectArticle?.modmessagecount}"  type="number">
                        </label>
                    </section>
                    <section>
                        <label class="label"><g:message code="setting.community.moderation.account.age" /></label>
                        <label class="input state-success">
                            <input name="spamProtect.modaccountage" class="form-control" value="${spamProtectArticle?.modaccountage}" type="number">
                        </label>
                    </section>
                    <div class="note"> <g:message code="setting.community.moderation.note" /></div>


                </div>
            </div>

            <footer>
                <div class="row"><g:render template="/layouts/errorMessage" /></div>
                <div class="col-lg-offset-4 col-lg-8 margin-bottom-10">
                    <button type="submit" name="submit" value="save" class="btn-u btn-u-green"><g:message code="button.save" /></button>
                </div>
            </footer>
        </g:form>

    </div>

    <div class="col-md-6">

            <g:form controller="community" action="spamprotection" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
                <input type="hidden" name="spamProtect.ftype" value="1">
                <input type="hidden" name="spamProtect.id" value="${spamProtectComment?.id}">
                <header><g:message code="setting.community.moderation.settings" />:  <b><g:message code="widget.community.stats.commnet" /></b> </header>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.sanonymousfeedback"  value="1" <g:if test="${spamProtectComment?.sanonymousfeedback}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.setting.anonymous.feedback"/> </label>
                </div>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.anonymousvoting"  value="1" <g:if test="${spamProtectComment?.anonymousvoting}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.setting.anonymous.voting"/> </label>
                </div>
                <header><g:message code="setting.community.moderation.captcha" /></header>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaanonymous"  value="1" <g:if test="${spamProtectComment?.captchaanonymous}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.anonymous.user"/> </label>
                </div>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.captchaauthuser"  value="1" <g:if test="${spamProtectComment?.captchaauthuser}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.authenticated.user"/> </label>
                </div>

                <div class="form-group">
                    <p><g:message code="setting.community.moderation.captcha.note" /></p>
                    <div class="col-lg-12">
                        <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.captchaemailnotverified"  value="1" <g:if test="${spamProtectComment?.captchaemailnotverified}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.email.verificate"/> </label>
                        <section>
                            <label class="label"><g:message code="setting.community.moderation.mess.count" /></label>
                            <label class="input state-success">
                                <input name="spamProtect.captchamessagecount" class="form-control" value="${spamProtectComment?.captchamessagecount}"  type="number">
                            </label>
                        </section>
                        <section>
                            <label class="label"><g:message code="setting.community.moderation.account.age" /></label>
                            <label class="input state-success">
                                <input name="spamProtect.captchaaccountage" class="form-control" value="${spamProtectComment?.captchaaccountage}"  type="number">
                            </label>
                        </section>
                        <div class="note"> <g:message code="setting.community.moderation.note" /></div>


                    </div>
                </div>
                <header><g:message code="setting.community.moderation.title" /></header>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modflagbyusers"  value="1" <g:if test="${spamProtectComment?.modflagbyusers}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.byuser"/> </label>
                </div>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modbyakismet"  value="1" <g:if test="${spamProtectComment?.modbyakismet}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.byakisment"/> </label>
                </div>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modexternallink"  value="1" <g:if test="${spamProtectComment?.modexternallink}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.external.link"/> </label>
                </div>
                <div class="form-group">
                    <label class="checkbox state-success"><input id="sso"  name="spamProtect.modseletecteduser"  value="1" <g:if test="${spamProtectComment?.modseletecteduser}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.selected.user"/> </label>
                </div>
                <div class="form-group">
                    <p><g:message code="setting.community.moderation.captcha.note" /></p>
                    <div class="col-lg-12">
                        <label class="checkbox state-success"><input id ="autosubscribe"  name="spamProtect.modemailnotverified"  value="1" <g:if test="${spamProtectComment?.modemailnotverified}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.moderation.email.verificate"/> </label>
                        <section>
                            <label class="label"><g:message code="setting.community.moderation.mess.count" /></label>
                            <label class="input state-success">
                                <input name="spamProtect.modmessagecount" class="form-control" value="${spamProtectComment?.modmessagecount}"  type="number">
                            </label>
                        </section>
                        <section>
                            <label class="label"><g:message code="setting.community.moderation.account.age" /></label>
                            <label class="input state-success">
                                <input name="spamProtect.modaccountage" class="form-control" value="${spamProtectComment?.modaccountage}" type="number">
                            </label>
                        </section>
                        <div class="note"> <g:message code="setting.community.moderation.note" /></div>


                    </div>
                </div>

                <footer>
                    <div class="row"><g:render template="/layouts/errorMessage" /></div>
                    <div class="col-lg-offset-4 col-lg-8 margin-bottom-10">
                        <button type="submit" name="submit" value="save" class="btn-u btn-u-green"><g:message code="button.save" /></button>
                    </div>
                </footer>
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

    </div>
</div>


</body>
</html>
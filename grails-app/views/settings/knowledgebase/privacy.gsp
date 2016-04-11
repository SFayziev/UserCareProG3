<g:applyLayout name="settingMain">
    <content tag="mainContent1">


        <h3><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> /
        <g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.privacy" /></g:link>
        </h3>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4><i class="fa fa-lock "></i> <g:message code="setting.leftMenu.community.privacy" />: <span class="color-green">${forum.name}</span> </h4>
            </div>
            <g:form controller="community" action="privacy" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >

                <div class="panel-body">
                    <div class="form-group">
                        <label  class="col-lg-4 control-label"><g:message code="setting.community.privacy.mode" /></label>
                        <hr>
                    </div>
            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.community.privacy.mode.public" /></label>
                <div class="col-lg-8">
                    <label class="radio state-success"><input id ="tpublic" name="privacy.type"  value="0" <g:if test="${forum.privacy.type==0}">checked=""</g:if>  type="radio"><i></i></label>
                </div>
            </div>

            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.community.privacy.mode.private" /></label>
                <div class="col-lg-8">
                    <label class="radio state-success"><input id ="tprivate" name="privacy.type"  value="1"  <g:if test="${forum.privacy.type==1}">checked=""</g:if>  type="radio"><i></i></label>

                </div>
            </div>


            <div class="form-group">
                <label  class="col-lg-4 control-label"><g:message code="setting.community.private.settings" /></label>
                <hr>
            </div>

            <div class="form-group">
                <label for="sso"  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id="sso"  name="privacy.sso"  value="1" <g:if test="${forum.privacy.sso}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.privacy.sso.text"/> </label>

                </div>
            </div>

            <div class="form-group">
                <label fot="anonymousview" class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id ="anonymousview" name="privacy.anonymousview"  value="1" <g:if test="${forum.privacy.anonymousview}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.privacy.authorizedview.text"/> </label>
                    <div class="note"><g:message code="setting.community.privacy.authorizedview.info"/> </div>
                </div>
            </div>

            <div class="form-group">
                <label for="authorizedview" class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id="authorizedview"  name="privacy.authorizedview"  value="1" <g:if test="${forum.privacy.authorizedview}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.privacy.anonymousview.text"/> </label>
                    <div class="note"><g:message code="setting.community.privacy.anonymousview.info"/> </div>
                </div>
            </div>

            <div class="form-group">
                <label for="autosubscribe"  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id ="autosubscribe"  name="privacy.autosubscribe"  value="1" <g:if test="${forum.privacy.autosubscribe}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.privacy.autosubscribe.info"/> </label>
                </div>
            </div>



             </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
        </div>

    </content>
</g:applyLayout>
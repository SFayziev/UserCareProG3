<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="forum.type0" /></g:link> </li>
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.project.settings" /></g:link></li>
    </ol>

    <div class="panel-body">
        <g:form controller="helpdesk" action="setting" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
            <div class="form-group">
                <label  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span></h4>
                </div>

            </div>
            <div class="form-group">
                <label for="name" class="col-lg-4 control-label"><g:message code="setting.name" /></label>
                <div class="col-lg-8">
                    <label for="name" class="input input-file state-success">
                        <input  id="name" name="forum.name" required type="text" value="${forum?.name}">
                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="firstreplystatus" class="col-lg-4 control-label"><g:message code="setting.community.setting.status.first.reply" /></label>
                <div class="col-lg-8">
                    <label for="firstreplystatus" class="select state-success">
                        <g:select id="firstreplystatus" optionKey="id" value="${forum?.firstreplystatus}"
                                  name="forum.firstreplystatus"  optionValue="name" from="${topicStatuses}" />
                        <i></i>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="satisfactionon" class="col-lg-4 control-label"><g:message code="setting.community.setting.satisfaction.rating" /></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id ="satisfactionon" name="forum.satisfactionon"  value="1" <g:if test="${forum.satisfactionon}">checked=""</g:if>  type="checkbox"><i></i><g:message code="setting.community.setting.satisfaction.rating.description"/> </label>
                </div>
            </div>

            <div class="form-group">
                <label for="forum.langid" class="col-lg-4 control-label"><g:message code="setting.default.language" /></label>
                <div class="col-lg-8">
                    <label for="forum.langid" class="select state-success">
                        <g:select id="forum.langid" optionKey="id" value="${forum?.langid}"
                                  name="forum.langid"  optionValue="name" from="${activleLangs}" />
                        <i></i>
                    </label>
                </div>
            </div>


            <div class="form-group">
                <label for="defkhowlagebase" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.knowlage" /></label>
                <div class="col-lg-8">
                    <label for="defkhowlagebase" class="select state-success">
                        <g:select id="defkhowlagebase" optionKey="id" value="${forum?.defkhowlagebase}"
                                  name="forum.defkhowlagebase"  optionValue="name" from="${knowledgebases}" />
                        <i></i>
                    </label>
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
</div>


    </content>
</g:applyLayout>
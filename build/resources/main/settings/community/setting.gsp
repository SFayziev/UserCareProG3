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
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.project.settings" /></g:link></li>
    </ol>

    <div class="panel-body">
        <g:form controller="community" action="setting" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
            <div class="form-group">
                <label  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span> </h4>
                </div>

            </div>
            <div class="form-group">
                <label for="name" class="col-lg-4 control-label"><g:message code="setting.name" /></label>
                <div class="col-lg-8">
                    <label for="name" class="input input-file state-success">
                        <i class="icon-append fa fa-globe" onclick="translationModal('forum.title', ${forum?.id});"></i>
                        <input  id="name" name="forum.name" required type="text" value="${forum?.name}">
                        <div class="help-block with-errors"></div>
                    </label>
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
                <label  class="col-lg-4 control-label"><g:message code="setting.voting" /></label>
                <div class="col-lg-8">
                    <label for="firstreplystatus" class="select state-success">
                        <g:select name="forum.votetype" from="${['0', '2', '3']}" value="${forum?.votetype}"
                                  valueMessagePrefix="community.voting.type" />
                        <i></i>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="forum.votelimit"  class="col-lg-4 control-label"><g:message code="setting.community.setting.vote.limit" /></label>
                <div class="col-lg-8">
                    <label for="forum.votelimit" class="input input-file state-success">
                        <input  id="forum.votelimit" name="forum.votelimit" required type="text" value="${forum?.votelimit}">
                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="forum.votetopiclimit" class="col-lg-4 control-label"><g:message code="setting.community.setting.vote.topic.limit" /></label>
                <div class="col-lg-8">
                    <label for="forum.votetopiclimit" class="select state-success">
                        <g:select name="forum.votetopiclimit" from="${1..9}" value=""/>
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
                <label for="sharingon" class="col-lg-4 control-label"><g:message code="setting.community.setting.sharing.panel" /></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id ="sharingon" name="forum.sharingon"  value="1" <g:if test="${forum.sharingon}">checked=""</g:if> type="checkbox"><i></i><g:message code="setting.community.setting.sharing.panel.description"/></label>

                </div>
            </div>
            <div class="form-group">
                <label for="meta" class="col-lg-4 control-label"><g:message code="setting.community.setting.meta.description" /></label>
                <div class="col-lg-8">
                    <label for="meta" class="input input-file state-success">
                        <input  id="meta" name="forum.meta"  type="text" value="${forum?.meta}">
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
                <label for="defkhowlagebase" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.knowlage" /></label>
                <div class="col-lg-8">
                    <label for="defkhowlagebase" class="select state-success">
                        <g:select id="defkhowlagebase" optionKey="id" value="${forum?.defkhowlagebase}"
                                  name="forum.defkhowlagebase"  optionValue="name" from="${knowledgebases}" />
                        <i></i>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="defhelpdesk" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.helpdesk" /></label>
                <div class="col-lg-8">
                    <label for="defhelpdesk" class="select state-success">
                        <g:select id="defhelpdesk" optionKey="id" value="${forum?.defhelpdesk}"
                                  name="forum.defhelpdesk"  optionValue="name" from="${helpdesks}" />
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
<div id="translationModal"  class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>



</body>
</html>
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
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <h4><g:message code="user.notification.title" />  </h4>
                <p><g:message code="user.notification.note" /> </p><br>
                <g:form controller="user" action="notification" id="${user.id}" class="sky-form">
                    <div class="tag-box tag-box-v6 margin-bottom-40">

                        <ul class="list-inline margin-bottom-40">
                            <li class="col-md-4"><input type="checkbox" name="notify.topiccreated" value="1" <g:if test="${notify.topiccreated}"> checked="" </g:if>  > <g:message code="user.notification.topic.created" /> </li>
                            <li class="col-md-4"><input type="checkbox" name="notify.statuschanged"  value="1" <g:if test="${notify.statuschanged}"> checked="" </g:if> > <g:message code="user.notification.topic.updates" /> </li>
                            <li class="col-md-4"><input type="checkbox" name="notify.topicmerged" value="1" <g:if test="${notify.topicmerged}"> checked="" </g:if> > <g:message code="user.notification.topic.merged" /> </li>
                            <li class="col-md-4"><input type="checkbox" name="notify.commentcreated"  value="1" <g:if test="${notify.commentcreated }"> checked="" </g:if> > <g:message code="user.notification.comment.created" /> </li>
                            <li class="col-md-4"><input type="checkbox" name="notify.updatwatchtopics" value="1" <g:if test="${notify.updatwatchtopics}"> checked="" </g:if> > <g:message code="user.notification.comment.update" /> </li>
                            <li class="col-md-4"><input type="checkbox" name="notify.ournews" value="1" <g:if test="${notify.ournews}"> checked="" </g:if> > <g:message code="user.notification.news.subcription" /> </li>
                        </ul>

                    </div>
                    <div>
                        <button type="submit" name="submit" value="save" class="btn-u btn-u-default">  <g:message code="default.button.update.label" /> </button>
                    </div>
                </g:form>

            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <h4><g:message code="user.notification.subscription.management" />  </h4>
                <p><g:message code="user.notification.subscription.note" /> </p>
                <div class="tag-box tag-box-v6 margin-bottom-40">
                    <ul>
                        <g:each in="${notifyForums}" var="notifyForum">
                            <li> <input onclick="changeForumNotify(${user.id}, ${notifyForum.forumid} )" type="checkbox" name="notifyForums${notifyForum.forumid}" <g:if test="${notifyForum.enabled}">checked="" </g:if> >
                            <g:each in="${forums}" var="forum"> <g:if test="${forum.id==notifyForum.forumid}">${forum.name}</g:if> </g:each>
                            </li>
                        </g:each>
                    </ul>
                </div>

            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <h4><g:message code="user.notification.feedback.title" />  </h4>
                <p><g:message code="user.notification.feedback.note" /> </p>
                <div class="tag-box tag-box-v6 margin-bottom-40">
                    <ul>
                    <g:each in="${followArtics}" var="article">
                        <li><a >${article.title}  </a></li>
                    </g:each>
                    </ul>
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

</body>
</html>

<div class="module-body" >
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

<div class="module-body" >
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

<div class="module-body" >
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

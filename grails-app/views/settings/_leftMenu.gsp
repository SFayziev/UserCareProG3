<ul class="list-group sidebar-nav-v1" id="sidebar-nav">
    <!-- Project -->
    <li class="list-group-item list-toggle <g:if test="${params.controller=='project'}">active</g:if> ">
        <a aria-expanded="true" data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-project"><i class="fa  fa-cube "></i> <g:message code="setting.leftMenu.project" /></a>
        <ul aria-expanded="true" id="collapse-project" class="collapse <g:if test="${params.controller=='project'}">in</g:if>">
            <li> <g:link controller="project" action="settings"><i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
            <li> <g:link controller="project" action="aliasing"><i class="fa fa-exchange"></i> <g:message code="setting.leftMenu.project.aliasing" /></g:link></li>
            <li> <g:link controller="project" action="emailNotification"><i class="fa fa-envelope"></i> <g:message code="setting.leftMenu.project.mail.settings" /></g:link></li>
            <li> <a  class="disabled" ><i class="fa fa-envelope"></i> <g:message code="setting.leftMenu.project.mail.templates" /></a></li>
            <li> <g:link controller="project" action="design"><i class="fa fa-asterisk"></i> <g:message code="setting.leftMenu.project.design" /></g:link></li>
            <li> <a  class="disabled" ><i class="fa fa-tasks"></i> <g:message code="setting.leftMenu.project.denied" /></a></li>
            <li> <g:link controller="project" action="robots"> <i class="fa  fa-binoculars "></i> <g:message code="setting.leftMenu.project.robots.txt" /></g:link></li>
            %{--<li> <a  class="disabled" ><i class="fa fa-align-justify"></i> <g:message code="setting.leftMenu.project.data.export" /></a></li>--}%
        </ul>
    </li>
    <!-- End Project -->

    <!-- Users -->
    <li class="list-group-item list-toggle <g:if test="${params.controller=='users'}">active</g:if>">
        <a aria-expanded="true" class=" <g:if test="${params.controller!='users'}">collapsed</g:if> " data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-user"><i class="fa fa-users"></i> <g:message code="setting.leftMenu.users" /></a>
        <ul aria-expanded="true" id="collapse-user" class="collapse <g:if test="${params.controller=='users'}">in</g:if>">
            <li> <g:link controller="users"  action="list"><i class="fa fa-user"></i> <g:message code="setting.leftMenu.users" /></g:link></li>
            <li> <g:link controller="users" action="support" ><i class="fa fa-life-ring"> </i> <g:message code="setting.leftMenu.users.agents" /></g:link></li>
            %{--<li> <g:link controller="users" ><i class="fa fa-list"></i> <g:message code="setting.leftMenu.users.custom.fields" /></g:link></li>--}%
        </ul>
    </li>
    <!-- End Users -->

    <!-- Forum -->
    <li class="list-group-item list-toggle <g:if test="${params.controller=='community'}">active</g:if>">
        <a aria-expanded="true" class="<g:if test="${params.controller!='community'}">collapsed</g:if> " data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-Forum"><i class="fa fa-bullhorn"></i> <g:message code="setting.leftMenu.community" /></a>
        <ul  aria-expanded="true" id="collapse-Forum" class="collapse <g:if test="${params.controller=='community'}">in</g:if>">
            <li ><g:link   controller="community" action="control" ><i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
            <li ><g:link controller="community" action="setting"  id="${selCommunityid}" ><i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
            <li><g:link controller="community" action="privacy"  id="${selCommunityid}" ><i class="fa fa-lock"></i> <g:message code="setting.leftMenu.community.privacy" /></g:link></li>
            <li ><g:link controller="community" action="category"  id="${selCommunityid}" ><i class="fa fa-folder-open"></i> <g:message code="setting.leftMenu.community.categories" /></g:link></li>
            <li><g:link controller="community" action="tag"  id="${selCommunityid}" > <i class="fa fa-tags"></i> <g:message code="setting.leftMenu.community.tags" /></g:link></li>
            <li><g:link controller="community" action="topicStatus"  id="${selCommunityid}" > <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></g:link></li>
            <li><g:link controller="community" action="topicType"  id="${selCommunityid}" >  <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /></g:link></li>
            <li><g:link controller="community" action="spamprotection"  id="${selCommunityid}" > <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.spam.protection" /></g:link></li>
            <li><g:link controller="community" action="customisation" id="${selCommunityid}" params="${[vtype="dushboard"]}"><i class="fa  fa-cubes "></i> <g:message code="setting.leftMenu.community.customisation" /></g:link></li>

            %{--<li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.users.custom.fields" /></a></li>--}%
        </ul>
    </li>
    <!-- End Forum -->

    <!-- HelpDesk -->
    <li class="list-group-item list-toggle <g:if test="${params.controller=='helpdesk'}">active</g:if>">
        <a aria-expanded="false" class="collapsed" data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-helpdesk"><i class="fa fa-ticket"></i> <g:message code="forum.type0" /></a>
        <ul  aria-expanded="false" id="collapse-helpdesk" class="collapse <g:if test="${params.controller=='helpdesk'}">in</g:if>">
            <li>
                <span class="badge badge-u">New</span>
                <g:link controller="helpdesk" action="index"><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></g:link>
            </li>
            <li><g:link controller="community" action="setting" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>

            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.privacy" /></a></li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.categories" /></a>
            </li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.tags" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.spam.protection" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.customisation" /></a></li>
            %{--<li><a  class="disabled" ><i class="fa fa-list"></i><g:message code="setting.leftMenu.users.custom.fields" /></a></li>--}%
        </ul>
    </li>
    <!-- end HelpDesk -->

    <!-- KnowlageBase -->
    <li class="list-group-item list-toggle <g:if test="${params.controller=='knowledgebase'}">active</g:if>">
        <a aria-expanded="false" class="collapsed" data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-KnowlageBase"><i class="fa fa-book"></i> <g:message code="forum.type1" /></a>
        <ul  aria-expanded="false" id="collapse-KnowlageBase" class="collapse <g:if test="${params.controller=='knowledgebase'}">in</g:if>">
            <li>    <g:link controller="knowledgebase" action="control"><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
            <li><g:link controller="knowledgebase" action="setting" id="${selKnowledge}"  ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.privacy" /></a></li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.categories" /></a>
            </li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.tags" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.spam.protection" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.customisation" /></a></li>

            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.users.custom.fields" /></a></li>
        </ul>
    </li>
    <!-- End KnowlageBase -->

    <!-- Chat -->
    <li class="list-group-item list-toggle">
        <a aria-expanded="false" class="collapsed" data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-Chat"><i class="fa fa-comments"></i> <g:message code="forum.type3" /></a>
        <ul style="height: 0px;" aria-expanded="false" id="collapse-Chat" class="collapse">
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.project.settings" /></a></li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></a>
            </li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.privacy" /></a></li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.categories" /></a>
            </li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.tags" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.spam.protection" /></a></li>
            <li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.customisation" /></a></li>

            <li><a  class="disabled" ><i class="fa fa-list"></i> <g:message code="setting.leftMenu.users.custom.fields" /></a></li>
        </ul>
    </li>
    <!-- End Chat -->


    <!-- Integration -->
    <li class="list-group-item list-toggle">
        <a aria-expanded="false" class="accordion-toggle" href="#collapse-integration" data-toggle="collapse"><i class="fa fa-cubes"></i> <g:message code="setting.leftMenu.integration" /></a>
        <ul style="" aria-expanded="false" id="collapse-integration" class="collapse">
            <li><a  class="disabled" ><i class="fa fa-comment"></i> <g:message code="setting.leftMenu.integration.website" /></a></li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-tags"></i> <g:message code="setting.leftMenu.integration.analytics" /></a>
            </li>
            <li>
                <span class="badge badge-u">New</span>
                <a  class="disabled" ><i class="fa fa-align-left"></i> <g:message code="setting.leftMenu.integration.social.network" /></a>
            </li>
        </ul>
    </li>
    <!-- End Components -->

    <!-- Accordion and Tabs -->
    <li class="list-group-item"><a  class="disabled" ><i class="fa fa-money"></i> <g:message code="user.menu.payments" /></a></li>
    <!-- End Accordion and Tabs -->

</ul>
<!-- START aside-->
<aside class="aside">
    <!-- START Sidebar (left)-->
    <nav class="sidebar">
        <ul class="nav">

                    <!-- Project -->
            <li class=" <g:if test="${params.controller=='project'}">active</g:if> ">
                <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                    <em class="fa fa-cog"></em>
                    <span class="item-text"><g:message code="setting.leftMenu.project" /></span>
                </a>

                <ul class="nav collapse  <g:if test="${params.controller=='project'}">in</g:if>">
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
            <li class=" <g:if test="${params.controller=='users'}">active</g:if>">
                    <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                        <em class="fa fa-users"></em>
                        <span class="item-text"> <g:message code="setting.leftMenu.users" /></span>
                    </a>

                    %{--<a aria-expanded="true" class=" <g:if test="${params.controller!='users'}">collapsed</g:if> " data-toggle="collapse" data-parent="#sidebar-nav" href="#collapse-user"><i class="fa fa-users"></i> <g:message code="setting.leftMenu.users" /></a>--}%
                <ul  class="nav collapse <g:if test="${params.controller=='users'}">in</g:if>">
                    <li> <g:link controller="users"  action="list"><i class="fa fa-user"></i> <g:message code="setting.leftMenu.users" /></g:link></li>
                    <li> <g:link controller="users" action="support" ><i class="fa fa-life-ring"> </i> <g:message code="setting.leftMenu.users.agents" /></g:link></li>
                </ul>
            </li>
            <!-- End Users -->

            <!-- Forum -->
            <li class=" <g:if test="${params.controller=='community'}">active</g:if>">
                    <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                        <em class="fa fa-bullhorn"></em> <span class="item-text"><g:message code="setting.leftMenu.community" /></span>
                    </a>

                <ul   class="nav collapse <g:if test="${params.controller=='community'}">in</g:if>">
                    <li ><g:link   controller="community" action="control" ><i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
                    <li ><g:link controller="community" action="setting"  id="${selCommunityid}" ><i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
                    <li><g:link controller="community" action="privacy"  id="${selCommunityid}" ><i class="fa fa-lock"></i> <g:message code="setting.leftMenu.community.privacy" /></g:link></li>
                    <li ><g:link controller="community" action="category"  id="${selCommunityid}" ><i class="fa fa-folder-open"></i> <g:message code="setting.leftMenu.community.categories" /></g:link></li>
                    <li><g:link controller="community" action="tag"  id="${selCommunityid}" > <i class="fa fa-tags"></i> <g:message code="setting.leftMenu.community.tags" /></g:link></li>
                    %{--<li><g:link controller="community" action="topicStatus"  id="${selCommunityid}" > <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></g:link></li>--}%
                    <li><g:link controller="community" action="topicType"  id="${selCommunityid}" >  <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /> / <g:message code="setting.leftMenu.community.statuses" /> </g:link></li>
                    <li><g:link controller="community" action="spamprotection"  id="${selCommunityid}" > <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.spam.protection" /></g:link></li>
                    <li><g:link controller="community" action="customisation" id="${selCommunityid}" params="${[vtype="dashboard"]}"><i class="fa  fa-cubes "></i> <g:message code="setting.leftMenu.community.customisation" /></g:link></li>

                    %{--<li><a  class="disabled" ><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.users.custom.fields" /></a></li>--}%
                </ul>
            </li>
            <!-- End Forum -->

            <!-- HelpDesk -->
            <li class=" <g:if test="${params.controller=='helpdesk'}">active</g:if>">
                    <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                        <em class="fa fa-ticket"></em> <span class="item-text"> <g:message code="forum.type0" /></span>
                    </a>
                <ul  class="nav collapse  <g:if test="${params.controller=='helpdesk'}">in</g:if>">
                    <li><g:link controller="helpdesk" action="index"><i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
                    <li><g:link controller="helpdesk" action="setting"  id="${selHelpDeskid}"><i class="fa fa-cog"></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
                    <li ><g:link controller="helpdesk" action="category"  id="${selHelpDeskid}" ><i class="fa fa-folder-open"></i> <g:message code="setting.leftMenu.community.categories" /></g:link></li>
                    <li><g:link controller="helpdesk" action="tag"  id="${selHelpDeskid}" > <i class="fa fa-tags"></i> <g:message code="setting.leftMenu.community.tags" /></g:link></li>
                    %{--<li><g:link controller="helpdesk" action="topicStatus"  id="${selHelpDeskid}" > <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.statuses" /></g:link></li>--}%
                    <li><g:link controller="helpdesk" action="topicType"  id="${selHelpDeskid}" >  <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.types" /> / <g:message code="setting.leftMenu.community.statuses" /> </g:link></li>

                </ul>
            </li>
            <!-- end HelpDesk -->

            <!-- KnowlageBase -->
            <li class=" <g:if test="${params.controller=='knowledgebase'}">active</g:if>">
                    <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                        <em class="fa fa-book"></em> <span class="item-text"> <g:message code="forum.type1" /> </span>
                    </a>
                <ul class="nav collapse <g:if test="${params.controller=='knowledgebase'}">in</g:if>">
                    <li><g:link controller="knowledgebase" action="control"> <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
                    <li><g:link controller="knowledgebase" action="setting" id="${selKnowledgebaseid}"  > <i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.project.settings" /></g:link></li>
                    <li><g:link controller="knowledgebase" action="privacy"  id="${selKnowledgebaseid}" > <i class="fa fa-lock"></i> <g:message code="setting.leftMenu.community.privacy" /></g:link></li>
                    <li><g:link controller="knowledgebase" action="category"  id="${selKnowledgebaseid}" > <i class="fa fa-folder-open"></i> <g:message code="setting.leftMenu.community.categories" /></g:link></li>
                    <li><g:link controller="knowledgebase" action="tag"  id="${selKnowledgebaseid}" > <i class="fa fa-tags"></i> <g:message code="setting.leftMenu.community.tags" /></g:link></li>
                    <li><g:link controller="knowledgebase" action="customisation" id="${selKnowledgebaseid}" params="${[vtype="dashboard"]}"><i class="fa  fa-cubes "></i> <g:message code="setting.leftMenu.community.customisation" /></g:link></li>
                </ul>
            </li>
            <!-- End KnowlageBase -->

            <!-- Chat -->
            <li class="">
                    <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                        <em class="fa fa-comments"></em> <span class="item-text"><g:message code="forum.type3" /></span>
                    </a>
                <ul class="nav collapse <g:if test="${params.controller=='chat'}">in</g:if>">
                    <li><g:link controller="chat" action="control"> <i class="fa fa-chevron-circle-right"></i> <g:message code="setting.leftMenu.community.control" /></g:link></li>
                    <li><g:link controller="chat" action="setting" id="${selKnowledgebaseid}"  > <i class="fa  fa-cog "></i> <g:message code="setting.leftMenu.chat.triggers" /></g:link></li>
                </ul>
            </li>
            <!-- End Chat -->


            <!-- Integration -->
            <li class="">
                <a data-toggle="collapse-next"  href="#" class="has-submenu" >
                    <em class="fa fa-cubes"></em> <span class="item-text"><g:message code="setting.leftMenu.integration" /></span>
                </a>
                <ul class="nav collapse <g:if test="${params.controller=='intagration'}">in</g:if>">
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
            <!-- End Integration -->

            <!-- Payment -->
            <li >
                <a data-toggle="collapse-next"  href="#"  >
                    <em class="fa fa-money"></em> <span class="item-text"><g:message code="user.menu.payments" /></span>
                </a>
            </li>
            <!-- End Payment -->

        </ul>
    </nav>
</aside>
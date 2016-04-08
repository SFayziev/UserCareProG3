<%@ page import="com.sh.utils.ForumType" %>
<g:if test="${forum?.type?.compareTo(ForumType.Community)==0 && !(module.params?.filtertype?.value=='filterTab' || module.params?.filtertype?.value=='filterTabUserStats')}">

<div class="btn-group">
    <button type="button" class="btn btn-u btn-u-blue ">

        <g:if test="${catalogParams?.type>0}">
            <g:each in="${forumTypes}" var="topicTypeDTO">
                <g:if test="${catalogParams?.type==topicTypeDTO?.id}">
                    %{--<g:render template="/file/imageByType" model="${[imgid: "forumtype${topicTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:topicTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
                    %{--<asset:image src="type/${topicTypeDTO?.imageurl}" width="16px" /> --}%
                    <locale:message  proj="${UCproject}" code="topictype.name.$topicTypeDTO.id" default="${topicTypeDTO?.articleTypeDTO?.name}" />
                    %{--${topicTypeDTO?.articleTypeDTO?.name}--}%
                </g:if>
            </g:each>
        </g:if>
        <g:else>
            <i class="fa fa-exchange"></i>    <g:message code="article.type" />
        </g:else>

    </button>
    <button aria-expanded="false" type="button" class="btn btn-u btn-u-blue btn-u-split-blue dropdown-toggle" data-toggle="dropdown">
        <i class="fa fa-angle-down"></i>
        <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu" role="menu">
        <li><a href="#"  onclick="setArticleListType(${module?.id},  -1)"><i class="fa fa-arrows-alt"></i> All  <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(-1 )}</span></a></li>
        <li class="divider"></li>
    %{--<li><a href="#"  onclick="setArticleListType(-1)"><i class="fa fa-arrows-alt"></i> All  <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(-1 )}</span></a></li>--}%
        <g:each in="${forumTypes}" var="topicTypeDTO">
            <li> <a  href="#" data-action="listByType" data-type-value="${topicTypeDTO?.id}" onclick="setArticleListType(${module?.id}, ${topicTypeDTO?.id})" >
                %{--<g:render template="/file/imageByType" model="${[imgid: "forumtype${topicTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:topicTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
                <locale:message  proj="${UCproject}" code="topictype.name.$topicTypeDTO.id" default="${topicTypeDTO?.articleTypeDTO?.name}" /> <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(topicTypeDTO?.id )}</span> </a></li>
        </g:each>
    </ul>
</div>
</g:if>
<g:if test="${forum?.type?.compareTo(ForumType.Community)==0  || forum?.type?.compareTo(ForumType.HelpDesk)==0}">
<div class="btn-group">
    <button type="button" class="btn btn-u btn-u-blue">
        <g:if test="${catalogParams?.status>0}">
            <g:each in="${topicStatuses}" var="forumStatus" >
                <g:if test="${catalogParams?.status==forumStatus.articleStatusDTO?.id}">
                    <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" />
                </g:if>
            </g:each>
        </g:if>
        <g:else>
            <g:message code="article.status" />
        </g:else>
    </button>
    <button aria-expanded="false" type="button" class="btn btn-u btn-u-blue btn-u-split-blue dropdown-toggle" data-toggle="dropdown">
        <i class="fa fa-angle-down"></i>
        <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu" role="menu">
        <li><a href="#"  data-action="listByStatus" onclick="setArticleListStatus(${module?.id}, -1)"> All <span class="badge  badge-blue rounded-x">${pageCount?.getCountByStatus(-1 )}</span></a></li>
        <li class="divider"></li>
        <li><a href="#"   data-action="listByStatus" data-status-value="0" onclick="setArticleListStatus(${module?.id}, 0 )">  Unmarked <span class="badge badge-blue rounded-x">${pageCount?.getUnmarkedTopic()}</span></a></li>
        <li><a href="#"   data-action="listByStatus" data-status-value="-10" onclick="setArticleListStatus(${module?.id}, -10 )">  Active <span class="badge badge-blue rounded-x">${pageCount?.getActiveTopic()}</span></a></li>

        <g:each in="${topicStatuses}" var="forumStatus" >
           <g:if test="${forumStatus.articleStatusDTO?.logicalgroup==0}"> <li><a  href="#"  style="padding-left:20px;white-space:nowrap;" data-action="listByStatus" data-status-value="${forumStatus.articleStatusDTO?.id}" onclick="setArticleListStatus(${module?.id}, ${forumStatus.articleStatusDTO?.id})"> <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" />  <span class="badge badge-blue rounded-x">${pageCount?.getCountByStatus(forumStatus.articleStatusDTO?.id )}</span></a></li></g:if>
        </g:each>

        <li class="divider"></li>
        <li><a  href="#"  data-action="listByStatus" data-status-value="-20" onclick="setArticleListStatus(${module?.id}, -20 )">  Closed <span class="badge badge-blue rounded-x">${pageCount?.getClosedTopic() }</span></a></li>
        <g:each in="${topicStatuses}" var="forumStatus" >
            <g:if test="${forumStatus.articleStatusDTO?.logicalgroup==1}"> <li><a  href="#"  style="padding-left:20px;white-space:nowrap;" data-action="listByStatus" data-status-value="${forumStatus.articleStatusDTO?.id}" onclick="setArticleListStatus(${module?.id}, ${forumStatus.articleStatusDTO?.id})"> <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" />  <span class="badge badge-blue rounded-x">${pageCount?.getCountByStatus(forumStatus.articleStatusDTO?.id )}</span></a></li></g:if>
        </g:each>

    </ul>
</div>
</g:if>
<g:if test="${forum?.type?.compareTo(ForumType.Community)==0  || forum?.type?.compareTo(ForumType.HelpDesk)==0}">
<div class="btn-group pull-right">
    <button type="button" class="btn btn-u btn-default dropdown-toggle" data-toggle="dropdown">
        <i class="fa fa-sort-alpha-desc"></i>
        <g:if test="${catalogParams?.order!= null && catalogParams?.order!=''}">
            <g:message code="order.type.${catalogParams?.order}" default="" />
        </g:if>
        <g:else>
            <g:message code="article.controlPanel.Title" />
        </g:else>

        <i class="fa fa-angle-down"></i>
    </button>
    <ul class="dropdown-menu" role="menu">
        <li onclick="setArticleListOrder(${module?.id},'byupdatedate')"><a href="#" ><i class="fa fa-edit"></i> <g:message code="order.type.byupdatedate" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bycreatedate')"><a href="#" ><i class="fa fa-cloud"></i> <g:message code="order.type.bycreatedate" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bycomment')"><a href="#"  ><i class="fa fa-cloud"></i> <g:message code="order.type.bycomment" /></a></li>
    <g:if test="${forum?.type?.compareTo(ForumType.Community)==0}">
        <li class="divider"></li>
        <li onclick="setArticleListOrder(${module?.id},'top')"><a href="#" ><i class="fa fa-eye"></i> <g:message code="order.type.top" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byupvotes')"><a href="#" ><i class="fa fa-eye"></i> <g:message code="order.type.byupvotes" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bydownvotes')"><a href="#" ><i class="fa fa-edit"></i> <g:message code="order.type.bydownvotes" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byviews')"><a href="#" ><i class="fa fa-cloud"></i> <g:message code="order.type.byviews" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byfollow')"><a href="#" ><i class="fa fa-cloud"></i> <g:message code="order.type.byfollow" /></a></li>
    </g:if>
    </ul>
</div>
</g:if>
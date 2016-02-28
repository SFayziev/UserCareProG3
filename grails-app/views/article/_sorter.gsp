<%@ page import="com.sh.utils.ForumType" %>
<g:if test="${forum?.type?.compareTo(ForumType.Community)==0 && !(module.params?.filtertype?.value=='filterTab' || module.params?.filtertype?.value=='filterTabUserStats')}">

<div class="btn-group">
    <button type="button" class="btn btn-u btn-u-blue ">

        <g:if test="${catalogParams?.type>0}">
            <g:each in="${forumTypes}" var="forumTypeDTO">
                <g:if test="${catalogParams?.type==forumTypeDTO?.id}">
                    %{--<g:render template="/article/imageByType" model="${[imgid: "forumtype${forumTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:forumTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
                    %{--<asset:image src="type/${forumTypeDTO?.imageurl}" width="16px" /> --}%
                    <locale:message  proj="${project}" code="topictype.name.$forumTypeDTO.id" default="${forumTypeDTO?.articleTypeDTO?.name}" />
                    %{--${forumTypeDTO?.articleTypeDTO?.name}--}%
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
        %{--<li><a href="#"  onclick="setArticleListType(-1)"><i class="fa fa-arrows-alt"></i> All  <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(-1 )}</span></a></li>--}%
        <g:each in="${forumTypes}" var="forumTypeDTO">
            <li> <a   data-action="listByType" data-type-value="${forumTypeDTO?.id}" onclick="setArticleListType(${module?.id}, ${forumTypeDTO?.id})" >
                %{--<g:render template="/article/imageByType" model="${[imgid: "forumtype${forumTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:forumTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
                <locale:message  proj="${project}" code="topictype.name.$forumTypeDTO.id" default="${forumTypeDTO?.articleTypeDTO?.name}" /> <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(forumTypeDTO?.id )}</span> </a></li>
        </g:each>
    </ul>
</div>
</g:if>
<g:if test="${forum?.type?.compareTo(ForumType.Community)==0  || forum?.type?.compareTo(ForumType.HelpDesk)==0}">
<div class="btn-group">
    <button type="button" class="btn btn-u btn-u-blue">
        <g:if test="${catalogParams?.status>0}">
            <g:each in="${forumStatuses}" var="forumStatus" >
                <g:if test="${catalogParams?.status==forumStatus.articleStatusDTO?.id}">
                    <locale:message  proj="${project}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" />
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
        <li><a href="#" onclick="setArticleListStatus(${module?.id}, -1)"> All <span class="badge  badge-blue rounded-x">${pageCount?.getCountByStatus(-1 )}</span></a></li>
        %{--<li><a href="#" onclick="setArticleListStatus(${module?.id},0)"> New <span class="badge  badge-blue rounded-x">${pageCount?.getCountByStatus(0 )}</span></a></li>--}%
        <g:each in="${forumStatuses}" var="forumStatus" >
            <li><a   data-action="listByStatus" data-status-value="${forumStatus.articleStatusDTO?.id}" onclick="setArticleListStatus(${module?.id}, ${forumStatus.articleStatusDTO?.id})"> <locale:message  proj="${project}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" />  <span class="badge badge-blue rounded-x">${pageCount?.getCountByStatus(forumStatus.articleStatusDTO?.id )}</span></a></li>
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
        <li onclick="setArticleListOrder(${module?.id},'byupdatedate')"><a><i class="fa fa-edit"></i> <g:message code="order.type.byupdatedate" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bycreatedate')"><a><i class="fa fa-cloud"></i> <g:message code="order.type.bycreatedate" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bycomment')"><a ><i class="fa fa-cloud"></i> <g:message code="order.type.bycomment" /></a></li>
    <g:if test="${forum?.type?.compareTo(ForumType.Community)==0}">
        <li class="divider"></li>
        <li onclick="setArticleListOrder(${module?.id},'top')"><a><i class="fa fa-eye"></i> <g:message code="order.type.top" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byupvotes')"><a><i class="fa fa-eye"></i> <g:message code="order.type.byupvotes" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'bydownvotes')"><a ><i class="fa fa-edit"></i> <g:message code="order.type.bydownvotes" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byviews')"><a ><i class="fa fa-cloud"></i> <g:message code="order.type.byviews" /></a></li>
        <li onclick="setArticleListOrder(${module?.id},'byfollow')"><a ><i class="fa fa-cloud"></i> <g:message code="order.type.byfollow" /></a></li>
    </g:if>
    </ul>
</div>
</g:if>
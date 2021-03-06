<%@ page import="com.sh.utils.ForumType" %>
<div class="module-body ${module?.params?.topicPresentation?.value}"  id="listItems" data-moduleid="${module?.id}"   data-forumid="${forum?.id}" data-statusid="${catalogParams?.status}" data-orderid="${catalogParams?.order}" data-typeid="${catalogParams?.type}" >
    <div class="top-side">
    %{--<g:render template="/forum/forumBreadcrumb"/>--}%
    <g:if test="${module.params?.title && module.params?.title?.value !='' }"><h3>
        <locale:message  proj="${UCproject}" code="forum.module.title.${module.id}" default="${module.params?.title?.value}" />
        <span class="badge badge-u rounded-2x">${pageCount?.getRowCount()}</span></h3>
    </g:if>
    <g:if test="${'none'!= module.params?.filtertype?.value}">
        %{--<g:if test="${module.params?.filtertype?.value=='filterUserStats' || module.params?.filtertype?.value=='filterTabUserStats'}" ><g:render template="/article/statusPanel"/></g:if>--}%
        <g:if test="${module.params?.filtertype?.value=='filterTab' || module.params?.filtertype?.value=='filterTabUserStats'}" ><g:render template="/article/filterTab"/></g:if>
        <g:else><g:render template="/article/sorter"/></g:else>
    </g:if>
    </div>


    <g:if test="${lastArticle?.size>0}">
        <g:each in="${lastArticle}" var="article">
            <div class="topic-side">
                <modules:articleDetails params="${[project:UCproject, forum:forum ,  module:module, article:article,  params:params]}" />
            </div>
        </g:each>
    </g:if>
    <g:else>
        <div class="topic-side">
            <hr>
            <g:message code="article.is.empty" />
        </div>
    </g:else>

    <div class="bottom-side">
        <g:if test="${pageCount?.getRowCount()>maxRecords}">
        <g:if test="${'hide' != module.params?.footerMode?.value}">
            <g:if test="${'paginate' == module.params?.footerMode?.value}">
                <div class="text-center">
                    <g:paginate total="${pageCount?.getRowCount()}"  maxsteps="3" max="${maxRecords}"    params="${params}" />
                </div>
            </g:if>
            <g:else>
                <div class="text-center">
                    <g:link controller="list" action="${forum.id}"><locale:message proj="${UCproject}" code="widget.forumlist..browseall" /></g:link>
                </div>
            </g:else>
        </g:if>
        </g:if>
    </div>

    <script>
        if (typeof __uc_settings == 'undefined') var __uc_settings=[];
        __uc_settings['module_${module?.id}'] = [];
        __uc_settings['module_${module?.id}']['moduleid'] = '${module?.id}';
        __uc_settings['module_${module?.id}']['statusid'] = '${catalogParams?.status}';
        __uc_settings['module_${module?.id}']['typeid'] = '${catalogParams?.type}';
        __uc_settings['module_${module?.id}']['orderid'] = '${catalogParams?.order}';


        <g:if test = "${maxRecords}"> __uc_settings['module_${module?.id}']['maxRecords'] = ${maxRecords};</g:if>
        __uc_settings['module_${module?.id}']['action'] = '${params.action}';
        <g:if test="${params.filter_user_id}">__uc_settings['module_${module?.id}']['filter_user_id'] = '${params.filter_user_id}';</g:if>
        <g:if test="${params.filter_performer_id}">__uc_settings['module_${module?.id}']['filter_performer_id'] = '${params.filter_performer_id}';</g:if>
        <g:if test="${params.category}">__uc_settings['module_${module?.id}']['category'] = '${params.category}';</g:if>
        <g:if test="${params.tag}">__uc_settings['module_${module?.id}']['tag'] = '${params.tag}';</g:if>
    </script>
</div>

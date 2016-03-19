<g:set var="colwidth" value="${(int )(100/  (forumStatuses.size+2))} " />
<table class="table table-bordered">
    <thead>
    <tr>
        <th width="${colwidth+"%"}" onclick="setArticleListStatus(${module?.id}, -1)" style="background-color:rgba(198, 198, 198, 0.73); cursor: pointer;">
            <span class="text-highlights"> All</span>
        </th>
        %{--<th width="${colwidth}%" onclick="setArticleListStatus(${module?.id}, 0)" style="background-color:rgba(160, 160, 160, 0.6); cursor: pointer;">--}%
            %{--<span class="text-highlights"> New </span>--}%
        %{--</th>--}%
    <g:each in="${forumStatuses}" var="forumStatus" >
        <th width="${colwidth}%" onclick="setArticleListStatus(${module?.id}, ${forumStatus.articleStatusDTO?.id})" style="background-color:rgba(${forumStatus.articleStatusDTO?.rgbcolor?.red} , ${forumStatus.articleStatusDTO?.rgbcolor?.green}, ${forumStatus.articleStatusDTO?.rgbcolor?.blue}, 0.6); cursor: pointer;">
            <span class="text-highlights" > <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" /></span>
        </th>
    </g:each>

    </tr>
    </thead>
    <tbody>
    <tr>
        <th onclick="setArticleListStatus(${module?.id}, -1)" style="background-color:rgb(214, 214, 214); cursor: pointer;">
            <g:if test="${params.status== -1 ||  params.status=="-1" }"> <i class="text-highlights fa fa-arrow-circle-right"></i> </g:if>
            <span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(-1 )}</span>

        </th>
        %{--<th onclick="setArticleListStatus(${module?.id}, 0)" style="background-color:rgb(160, 160, 160); cursor: pointer;">--}%
            %{--<g:if test="${params.status=="0" }"> <i class="text-highlights fa fa-arrow-circle-right"></i> </g:if>--}%
            %{--<span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(0)}</span>--}%
        %{--</th>--}%
        <g:each in="${forumStatuses}" var="forumStatus" >
            <th onclick="setArticleListStatus(${module?.id}, ${forumStatus.articleStatusDTO?.id})" style="background-color:${forumStatus.articleStatusDTO?.color}; cursor: pointer; ">
               <g:if test="${params.status==(forumStatus.articleStatusDTO?.id+"") }"> <i class="text-highlights fa fa-arrow-circle-right"></i> </g:if>
                <span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(forumStatus.articleStatusDTO?.id )}</span></th>
        </g:each>

    </tr>

    </tbody>
</table>
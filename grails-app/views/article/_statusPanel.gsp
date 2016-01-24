<g:set var="colwidth" value="${(int )(100/  (articleStatuses.size+2))} " />
<table class="table table-bordered">
    <thead>
    <tr>
        <th width="${colwidth+"%"}" onclick="setArticleListStatus(${module?.id}, -1)" style="background-color:rgba(198, 198, 198, 0.73); cursor: pointer;">
            <span class="text-highlights"> All</span>
        </th>
        <th width="${colwidth}%" onclick="setArticleListStatus(${module?.id}, 0)" style="background-color:rgba(160, 160, 160, 0.6); cursor: pointer;">
            <span class="text-highlights"> New </span>
        </th>
    <g:each in="${articleStatuses}" var="articleStatus" >
        <th width="${colwidth}%" onclick="setArticleListStatus(${module?.id}, ${articleStatus?.id})" style="background-color:rgba(${articleStatus?.rgbcolor?.red} , ${articleStatus?.rgbcolor?.green}, ${articleStatus?.rgbcolor?.blue}, 0.6); cursor: pointer;">
            <span class="text-highlights" > <locale:message  proj="${project}" code="article.status.name.${articleStatus?.id}" default="${articleStatus?.name}" /></span>
        </th>
    </g:each>

    </tr>
    </thead>
    <tbody>
    <tr>
        <th onclick="setArticleListStatus(${module?.id}, -1)" style="background-color:rgb(214, 214, 214); cursor: pointer;">
            <span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(-1 )}</span>
        </th>
        <th onclick="setArticleListStatus(${module?.id}, 0)" style="background-color:rgb(160, 160, 160); cursor: pointer;">
            <span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(0)}</span>
        </th>
        <g:each in="${articleStatuses}" var="articleStatus" >
            <th onclick="setArticleListStatus(${module?.id}, ${articleStatus?.id})" style="background-color:${articleStatus?.color}; cursor: pointer; ">
                <span class="text-highlights" style="float: right;"> ${pageCount?.getCountByStatus(articleStatus?.id )}</span></th>
        </g:each>

    </tr>

    </tbody>
</table>
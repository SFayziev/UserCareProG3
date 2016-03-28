<span class="col-xs-12 kb-col-without-childs col-md-6 col-lg-6 col-sm-6 kb-col">

    <div class="headline">
        <h2> <g:render template="/file/imageByType" model="${[imgid: "forumlogo${forum.id}", imgclass: "img-responsive", iconclass: 'icon-sm', img:knowledgebase?.imgDTO]}" /> <a href="/list/${forum?.id}/${knowledgebase?.id}">${knowledgebase?.name}</a></h2>

    </div>

    <ul class="list-unstyled">
        <g:each in="${knowledgebase.articleDTOList}" var="articleDTO">
        <li>
            <i class="fa fa-fw fa-rss-square"></i>
           <g:link controller="article" action="item" id="${articleDTO.id}"> ${articleDTO.title}</g:link>
        </li>
        </g:each>
    </ul>

</span>

<div id="agentActionBar">
    <div class="module">
        <div class="module-body"  data-article-id="${article?.id}">
            <div  class="btn-group mb-sm">
                <button type="button" data-content="${article.id}" data-action="toggleNeedreview" class="btn btn-labeled btn-default" data-toggle="tooltip"  title='<g:message code="article.action.needs.review"/>'>
                    <span class="btn-label"><g:render template="/agent/article/needReviewButton"/></span>
                </button>
            </div>

            <div class="btn-group mb-sm">
                <button type="button" data-action="replycomment" class="btn btn-labeled btn-default" data-toggle="tooltip"  title='<g:message code="article.action.Reply"/>' >
                    <span class="btn-label"><i class="fa fa-reply"></i></span>
                </button>
            </div>
            <div id="articlestatus" data-content="${article.id}" class="btn-group mb-sm" data-toggle="tooltip"  title='<g:message code="article.action.change.status"/>'>
                <button  type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >
                    <span class="btn-label"><i class="fa fa-exchange"></i></span>
                    <span class="caret"></span>
                </button>
            </div>
            <div class="btn-group mb-sm">
                <button type="button" data-content="${article.id}" data-action="editarticle" data-forumid="${article.forumDTO.id}"  class="btn btn-labeled btn-default" data-toggle="tooltip"  title='<g:message code="article.action.Edit"/>' >
                    <span class="btn-label"><i class="fa fa-edit"></i></span>
                </button>
            </div>

            <div class="btn-group mb-sm">
                <button type="button"  class="btn btn-labeled btn-default" data-toggle="tooltip" data-forumid="${article.forumDTO.id}"  data-content="${article.id}" data-action="deletearticle"  title='<g:message code="article.action.Delete"/>' >
                    <span class="btn-label"><i class="fa fa-trash"></i></span>
                </button>
            </div>
            <div class="btn-group mb-sm">
                <button type="button"  class="btn btn-labeled btn-default" title='<g:message code="article.action.open.new.window"/>'  onclick="window.open('/article/item/${article.forumDTO.id}/${article.id}/')" data-toggle="tooltip" >
                    <span class="btn-label"><i class="fa fa-external-link"></i></span>
                </button>
            </div>
            <div id="assignUser" data-content="${article.id}" class="btn-group mb-sm" data-toggle="tooltip"  title='<g:message code="article.action.AssignTo"/>'>
                <button  aria-expanded="false" type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle"  >
                    <i class="fa fa-users"></i>
                    <span class="caret"></span>
                </button>
            </div>

            <div class="btn-group pull-right">
                <button data-original-title="More actions" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" rel="tooltip" title="">
                    <i class="fa fa-navicon"></i>
                </button>
                <ul style="max-height: 324px;" class="dropdown-menu pull-right" role="menu">
                    <li><a data-action="getinfo-topic" href="#"><i class="fa fa-fw fa-info"></i> Additional information</a></li>
                    <li><a data-action="move-topic" href="#"><i class="fa fa-fw fa-arrow-right"></i> Move to another forum</a></li>
                    <li><a data-action="manage-collaborators" href="#"><i class="fa fa-fw fa-users"></i> Manage collaborators</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
$(document).ready(function(){
    $('#assignUser').on('show.bs.dropdown', function(){
        var obj=$('#assignUser');
        var articleid=obj.data('content');
        if( obj.children('ul').length==0) {
            $.ajax({
                type: 'POST',
                url: '/agent/articles/assignUserlist/' + articleid
            }).done(function (response) {
                obj.append(response.value);
            });
        }
    });

    $('#articlestatus').on('show.bs.dropdown', function(){
        var obj=$('#articlestatus');
        var articleid=obj.data('content');
        if( obj.children('ul').length==0) {
            $.ajax({
                type: 'POST',
                url: '/agent/articles/statuslist/' + articleid
            }).done(function (response) {
                obj.append(response.value);
            });
        }
    });



});
</script>
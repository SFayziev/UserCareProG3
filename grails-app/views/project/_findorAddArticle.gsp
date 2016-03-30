<div class="module-body" data-moduleid="${module?.id}">
    <div class="col-sm-12">
        <div class="input-group">
            <input class="form-control"  name="searchtext" data-isbusy="0" data-prevsearch=""  data-action = 'searchArticle' placeholder="${module?.params?.placeholder?.value}" maxlength="255" type="text">
            <span class="input-group-addon"><i data-action="" class="fa fa-search" style="right: 140px; display: inline;" ></i></span>
            <div class="input-group-btn">
                <g:link  controller="article" action="edit" params="${[forumid:module?.forumid]}" type="button" class="btn btn-primary dropdown-toggle" data-toggle="modal"   data-target="#myModal">
                    <i class="hidden-xs">${module?.params?.addButton?.value}</i><i class="hidden-sm hidden-md hidden-lg fa fa-plus"></i>
                </g:link>
            </div>
        </div>
    </div>

    <div id="searchresult" class="row margin-top-20" >
    </div>

</div>


<div class="modal modal-fullscreen fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"> Submit new feedback </h4>
            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


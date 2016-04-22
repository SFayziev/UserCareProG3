<div class="module-body" data-moduleid="${module?.id}">
    <div class="input-group">
        <input class="form-control"  name="searchtext" data-isbusy="0" data-prevsearch=""  data-action = 'searchArticle' placeholder="${module?.params?.placeholder?.value}" maxlength="255" type="text">
        <span class="input-group-addon"><i data-action="" class="fa fa-search" style="right: 140px; display: inline;" ></i></span>
        <div class="input-group-btn">
            <g:link  controller="article" action="edit" params="${[forumid:module?.forumid]}" type="button" class="btn btn-primary" data-toggle="modal"   data-target="#ucmodal">
                <i class="hidden-xs">${module?.params?.addButton?.value}</i><i class="hidden-sm hidden-md hidden-lg fa fa-plus"></i>
            </g:link>
        </div>
    </div>
    <div id="searchresult" >
    </div>
</div>
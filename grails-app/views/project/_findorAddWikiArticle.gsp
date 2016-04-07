<div class="module-body" data-moduleid="${module?.id}">
    <div class="col-sm-12">
        <div class="input-group">
            <input class="form-control" placeholder="${module?.params?.placeholder?.value}" maxlength="255" type="text">
            <span class="input-group-addon"><i data-action="" class="fa fa-search" style="right: 140px; display: inline;" data-action-default="" data-action-refresh="" data-action-cancel="cancel-search-topic" data-class-default="fa fa-search" data-class-cancel="fa fa-times-circle pointer" data-class-refresh="fa fa-refresh fa-spin" id="input-inline-button"></i></span>
            <div class="input-group-btn">
                <button  type="button" class="btn btn-primary dropdown-toggle" data-toggle="modal" href="/article/edit"  data-target="#ucmodal">
                    ${module?.params?.addButton?.value}
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal modal-fullscreen fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Submit new feedback </h4>
            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


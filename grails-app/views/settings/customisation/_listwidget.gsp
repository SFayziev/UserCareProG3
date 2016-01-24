<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.widget.list.title" /></h4>
</div>
<div class="modal-body">
    <div class="row multi-columns-row">
    <g:each in="${modulTypes}" var="modulType">
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3  ">
            <div class="thumbnail">
                <span class="overlay-zoom">
                    <img class="img-responsive" src="/images/8251509582185.png" alt="" style="width: 100%">
                    <span class="zoom-icon"></span>
                </span>
                <div class="caption">
                    <h3><g:message code="widget.type.${modulType.id}.title" /></h3>
                    <p><g:message code="widget.type.${modulType.id}.note" /></p>
                    <p><a href="#" class="btn-u btn-u-small" onclick="widgetAdd('${params.id}',  '${params.vtype}', '${params.dtype}',  ${modulType.id})"><g:message code="setting.customize.add.new" /></a></p>
                </div>
            </div>
        </div>
    </g:each>
    </div>
</div>

<script type="text/javascript">

</script>

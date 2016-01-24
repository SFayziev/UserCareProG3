<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="settingMain"/>
    <title></title>
</head>
<body>

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> </li>
        <li class="active"><g:link controller="community" action="customisation" > <g:message code="setting.leftMenu.community.customisation" /></g:link></li>
    </ol>

    <div id="customisation">
        <div class="tab-v1 margin-bottom-60">
            <ul class="nav nav-tabs">
                <li class="<g:if test="${params.vtype==null || params.vtype=='dashboard'}"> active</g:if>"><g:link controller="community" action="customisation" id="${params.id}" params="${[vtype: 'dashboard']}" ><g:message code="module.display.type.0" /></g:link></li>
                <li class="<g:if test="${params.vtype=='list'}"> active</g:if>"><g:link controller="community" action="customisation" id="${params.id}" params="${[vtype: 'list']}" ><g:message code="module.display.type.1" /></g:link></li>
                <li class="<g:if test="${params.vtype=='widget'}"> active</g:if>"><g:link controller="community" action="customisation" id="${params.id}" params="${[vtype: 'widget']}" ><g:message code="module.display.type.2" /></g:link></li>
                <div class="btn-group pull-right" >
                    <button type="button" class="btn-u btn-u-blue dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-plus"></i> <g:message code="setting.customize.add.new" /> <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a class="disable"> <g:message code="setting.customize.add.new.note" /></a> </li>

                        <li><a  data-toggle="modal" href="/settings/customisation/listwidget/${params.id}?vtype=${params.vtype}&dtype=0" data-target="#myLargModal" ><g:message code="setting.customize.add.new.tomain" /> </a></li>
                    <g:if test="${params.vtype==null || params.vtype=='dashboard'}">
                        <li><a  data-toggle="modal" href="/settings/customisation/listwidget/${params.id}?vtype=${params.vtype}&dtype=1" data-target="#myLargModal" ><g:message code="setting.customize.add.new.toside" /></a></li>
                    </g:if>
                    </ul>
                </div>
            </ul>
            <div class="tab-content">
                <!-- Icons and Placeholders -->
                <div class="tab-pane fade active in" id="home-1">
                <iframe src="/settings/customisation/${params.vtype}/${params.id}" style="height:480px; width: 100% "  id="iframe1" marginheight="0" frameborder="0"  onLoad="autoResize('iframe1');"></iframe>

                </div>
                <!-- End Icons and Placeholders -->


            </div>
        </div>


    </div>
</div>
<div id="modalDelete"  class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<g:render template="/modal/translationForm"/>
<g:render template="/modal/myLargModal"/>


<script language="JavaScript">
    <!--
    function autoResize(id){
        var newheight;
        if(document.getElementById(id)){
            newheight=document.getElementById(id).contentWindow.document.body.scrollHeight+60;
        }
        document.getElementById(id).style.height= (newheight) + "px";
    }
    //-->
</script>

</body>
</html>
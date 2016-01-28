<g:applyLayout name="moduleContent">
    <content tag="mainContent1">
        <div id="mainBar" class="col-xs-9 padding-right-5 padding-left-5 ">
            <g:render template="/article/itemAndReplies"/>
        </div>
    </content>
    <content tag="menuContent1">
        <div  class="col-xs-3  padding-right-5 padding-left-5">


            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/projectLogo"/>
            </div>
            <sec:ifAllGranted roles='ROLE_MANAGER'>
                <div class=" tag-box tag-box-v1 margin-bottom-10">
                    <g:render template="/modules/articleControlePanelW"/>
                </div>
            </sec:ifAllGranted>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/articleStats"/>
            </div>
            <g:render template="/widgets/poweredBy"/>
        </div>
    </content>
</g:applyLayout>

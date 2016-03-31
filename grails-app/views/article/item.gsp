<g:applyLayout name="moduleContent">
    <content tag="mainContent1">
        <g:render template="/index/mainBar"/>
        %{--<g:render template="/article/itemAndReplies"/>--}%
    </content>
    <content tag="menuContent1">
        <g:render template="/index/miniBar"/>

        %{--<div  class="col-xs-3">--}%


            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/projectLogo"/>--}%
            %{--</div>--}%
            %{--<sec:ifAllGranted roles='ROLE_MANAGER'>--}%
                %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                    %{--<g:render template="/modules/articleControlePanelW"/>--}%
                %{--</div>--}%
            %{--</sec:ifAllGranted>--}%
            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/articleStats"/>--}%
            %{--</div>--}%
            %{--<g:render template="/widgets/poweredBy"/>--}%
        %{--</div>--}%
    </content>
</g:applyLayout>

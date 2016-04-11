<g:applyLayout name="moduleContent">
    <content tag="mainContent1">
        <div  id="mainContent" class="col-md-9">
            <g:pageProperty name="page.mainContent1"/>
        </div>
    </content>
    <content tag="menuContent1">
        <g:render template="/index/miniBar"/>

        %{--<div class="col-md-3  padding-right-5 padding-left-5">--}%
            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/userAvatar" />--}%
            %{--</div>--}%
            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/userContact" />--}%
            %{--</div>--}%

            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/userMenu" />--}%
            %{--</div>--}%
            %{--<div class=" tag-box tag-box-v1 margin-bottom-10">--}%
                %{--<g:render template="/widgets/userAdminMenu" />--}%
            %{--</div>--}%
        %{--</div>--}%

        %{--<g:render template="/modal/imageSelector"/>--}%
        <asset:javascript src="validator.min.js"/>
        %{--<asset:stylesheet  src="sky-forms.css"/>--}%
    </content>
</g:applyLayout>

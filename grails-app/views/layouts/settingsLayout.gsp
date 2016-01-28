<g:applyLayout name="moduleContent">
    <content tag="menuContent1">
        <div class="col-md-3  padding-right-5 padding-left-5">
            <g:render template="/settings/leftMenu"/>
        </div>

    </content>
    <content tag="mainContent1">
        <div  id="mainContent" class="col-md-9">
            <g:pageProperty name="page.mainContent1"/>
        </div>

        <g:render template="/modal/imageSelector"/>
        <asset:javascript src="validator.min.js"/>
        <asset:stylesheet  src="sky-forms.css"/>

    </content>

</g:applyLayout>

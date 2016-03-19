<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.robots.txt" /></g:link></li>
    </ol>
    <div class="panel-body">

        <p><g:message code="setting.project.robots.text1"/> </p>
        <br>
        <br>

        <div class="alert alert-info fade in">
            <p> <g:message code="setting.project.robots.text2"/> <a href="http://www.robotstxt.org/">About /robots.txt</a>  </p>
        </div>
        <br>
        <g:form controller="project" action="robots" id="moduleEditForm"  class="sky-form" >
            <fieldset>
                <section>
                    <label class="label">   <h4>robots.txt</h4></label>
                    <label class="textarea state-success">
                        <textarea name="robotstxt" rows="8">${UCproject.params?.robotstxt?.value}</textarea>
                    </label>
                </section>
            </fieldset>
            <div class="modal-footer">
                <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>

            </div>

        </g:form>
    </div>
</div>


    </content>
</g:applyLayout>


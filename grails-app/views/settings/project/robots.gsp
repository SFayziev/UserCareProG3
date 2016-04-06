<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> /
        <g:link controller="settings" > <g:message code="setting.leftMenu.project.robots.txt" /></g:link>
        </h3>

        <div class="panel panel-default">
            <g:form controller="project" action="robots" id="moduleEditForm"  >
                <div class="panel-body">

                    <p><g:message code="setting.project.robots.text1"/> </p>
                    <br>
                    <br>

                    <div class="alert alert-info fade in">
                        <p> <g:message code="setting.project.robots.text2"/> <a href="http://www.robotstxt.org/">About /robots.txt</a>  </p>
                    </div>
                    <br>

                    <fieldset>
                        <div class="form-group">
                            <label >   <h4>robots.txt</h4></label>
                            <textarea class="form-control" name="robotstxt" rows="8">${UCproject.params?.robotstxt?.value}</textarea>
                        </div>
                    </fieldset>
                </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
        </div>
    </content>
</g:applyLayout>


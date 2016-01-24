<!-- Footer -->
<table class="deviceWidth" align="center" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" width="700">
    <tbody><tr>
        <td>
            <table class="deviceWidth" align="center" border="0" cellpadding="0" cellspacing="0" width="700">
                <tbody><tr>
                    <td class="center" style="padding: 10px ; font-size: 16px; color: #687074; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; ">
                        <g:message code="email.template.regards" args="${[project.name]}" />
                    </td>
                </tr>
                <tr>
                    <td class="center" style="font-size: 12px; color: #687074; font-weight: bold; text-align: center; font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; padding: 30px 10px 0px; ">
                        <g:message code="email.template.delivered.by" /> <a target="_blank"  onclick="null" href="${grailsApplication.config.domain.protocol+ "://" +grailsApplication.config.domain.main.url}" > ${grailsApplication.config.project.main.name}</a>

                    </td>
                </tr>
                <tr>
                    <td class="center" style="font-size: 12px; color: #687074; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; padding: 10px 10px 10px; ">
                        <a target="_blank"  onclick="null" href="${grailsApplication.config.domain.protocol+ "://" + project.alias +"."+ grailsApplication.config.domain.main.url}"> <g:message code="email.template.unsubscribe" /></a> <g:message code="email.template.unsubscribe.note" />
                    </td>
                </tr>
                </tbody></table>
        </td>
    </tr>
    </tbody>
</table>
<!--End Footer-->


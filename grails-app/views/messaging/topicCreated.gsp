<%@ page import="com.sh.utils.ForumType" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="layout" content="mainEmailTemplate"/>

</head>
<body leftmargin="0" topmargin="0" yahoo="fix" style="font-family: Arial, Helvetica, sans-serif" marginheight="0" marginwidth="0">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody><tr>
        <td valign="top" width="100%">
            <table class="deviceWidth" align="center" border="0" cellpadding="0" cellspacing="0" width="700">
                <tbody>
                <tr>
                    <td class="center" style="padding: 10px ; font-size: 16px; color: #687074; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; "  width="100%">
                        <g:message code="email.template.dear" /> ${user.name}
                    </td>
                </tr>
                <tr>
                    <td class="center" style="padding: 10px ; font-size: 16px; color: #687074; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; "  width="100%">
                        <g:message code="email.template.topic.new.into" args="${[article?.getUserDTO()?article?.getUserDTO()?.name :"Anonymous"] }" />
                    </td>
                </tr>

                <tr>
                    <td>
                        <table class="deviceWidth"  align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td bgcolor="#A1A1A1" style="padding: 10px ;text-align: center; font-size: 18px; color: #eeeeee; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; "  >
                                   <a target="_blank"  onclick="null" href="<modules:mainProjectUrl/>/article/item?id=${article?.id}" > <g:message code="email.template.topic.open.link"  /></a>
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#f7f7f7" style="padding: 10px ; font-size: 16px; color: #687074; font-weight: bold;  font-family: Arial, Helvetica, sans-serif; line-height: 20px; vertical-align: middle; "  >
                                    ${article?.title }
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f7f7f7" style="padding: 10px ;" >
                                    <p>${article?.text.encodeAsRaw() } </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <g:render template="topicFooter"/>
            <div style="height:15px">&nbsp;</div>
        </td>
    </tr>
    </tbody></table>
</body>
</html>
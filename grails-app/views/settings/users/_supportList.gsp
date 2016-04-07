<tr  id="user${user.id}" >
    <td><g:if test="${user.userPermissionsDTO.status==1}"><button class="btn-u rounded  btn-u-green" onclick="changeSupportStatus(${user.id}, 0 )" type="button"><i class="fa fa-check-circle-o"></i></button> </g:if>
        <g:else><button class="btn-u rounded  btn-u-green" onclick="changeSupportStatus(${user.id}, 1 )" type="button"><i class="fa fa-circle-o"></i></button></g:else>
    </td>
    <td>${user.name} <g:if test="${user.position}"><br> ( ${user.position} ) </g:if>  </td>
    <td>${user.email} </td>
    %{--<td>${user.position} </td>--}%
    <td><g:if test="${user.userPermissionsDTO.manager}">
        <i class="fa fa-fw  fa-check-circle-o"></i>
    </g:if> <g:else><i class="fa fa-fw   fa-circle-o"></i></g:else>
    </td>
    <td><i class="fa fa-fw   fa-circle-o"></i> </td>

    <td>
        <div class="btn-group">
            <a data-toggle="modal" href="/settings/users/editsupport/${user.id}" data-target="#ucmodal"  id="useredit${user.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
            <a class="btn btn-danger" data-toggle="modal" href="/settings/users/delsupport/${user.id}" data-target="#ucmodal"  ><i class="fa fa-trash-o"></i></a>
        </div>
    </td>
</tr>

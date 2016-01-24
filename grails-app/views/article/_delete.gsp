<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Remote file for Bootstrap Modal</title>
</head>
<body>
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">Delete topic</h4>
</div>			<!-- /modal-header -->
<g:form controller="article" action="delete"  id="${article?.id}" method="post">
    <input type="hidden" name="actiondo" value="delete">
    <div class="modal-body">
        <div class="form-group">
            <label >${article?.title}</label>
        </div>
    </div>			<!-- /modal-body -->
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Delete</button>
    </div>			<!-- /modal-footer -->
</g:form>
</body>
</html>
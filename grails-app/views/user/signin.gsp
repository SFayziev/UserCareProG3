<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="main"/>
    <title></title>

</head>
<body>
<asset:stylesheet href="log_reg.css"/>
<!--=== Content Part ===-->
<div class="container content-sm">

    <div class="row ">

        <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">



            <div class="reg-block-header modal-header">

            <h2>Sign In</h2>
            <g:render template="/layouts/signinsocial" />

            <p>Don't Have Account? Click <a class="color-green" href="page_registration1.html">Sign Up</a> to registration.</p>
        </div>
            <form action='#' class="reg-page"  method="POST"  id='ajaxLoginForm' name='ajaxLoginForm' autocomplete="off">
            <div class="modal-body">
                <div class="input-group margin-bottom-20">
                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                    <input type="text" name="username" class="form-control" placeholder="Email">
                </div>
                <div class="input-group margin-bottom-20">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <hr>

                <div class="checkbox">
                    <label>
                        <input type="checkbox">
                        <p>Always stay signed in</p>
                    </label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-u btn-u-default" data-dismiss="modal">Close</button>
                    <button class="btn-u btn-primary" type="submit" id="authAjax"><i class="fa fa-lock"></i> Log In</button>
                </div>
                <div class="row"><g:render template="/layouts/errorMessage" /></div>
            </div>
        </form>
        </div>
    </div>


</div>
</body>
</html>
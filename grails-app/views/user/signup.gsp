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
        <div class="col-md-9">
            <div class="row margin-bottom-30">
                <g:render template="/project/projectDescription"/>
                <g:form controller="user" action="signup" >
                    <div class="reg-block">
                    <div class="reg-block-header">
                        <h2>Sign Up</h2>
                        <g:render template="/layouts/signinsocial" />
                        <p>Already Signed Up? Click <a class="color-green" href="page_login1.html">Sign In</a> to login your account.</p>
                    </div>

                    <div class="input-group margin-bottom-20">
                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                        <input type="text" name="user.username" required class="form-control" value="${user?.username}" placeholder="Username">
                    </div>
                    <div class="input-group margin-bottom-20">
                        <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                        <input type="email" required name="user.email" class="form-control" value="${user?.email}" placeholder="Email">
                    </div>
                    <div class="input-group margin-bottom-20">
                        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                        <input type="password"  required  name="user.password" class="form-control" value="" placeholder="Password">
                    </div>
                    <div class="input-group margin-bottom-30">
                        <span class="input-group-addon"><i class="fa fa-key"></i></span>
                        <input type="password"  required  name="user.password2" class="form-control" value="" placeholder="Confirm Password">
                    </div>
                    <hr>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" required name="condition">
                            I read <a target="_blank" href="page_terms.html">Terms and Conditions</a>
                        </label>
                    </div>

                    <div class="row">
                        <div class="col-md-10 col-md-offset-1">
                            <button type="submit" name="submit" value="save" class="btn-u btn-block">Register</button>
                        </div>
                    </div>
                        <div class="row"><g:render template="/layouts/errorMessage" /></div>
                </div>
               </g:form>
            </div>
        </div>
        <g:render template="/index/miniBar"/>
        %{--<div class="col-md-3">--}%
            %{--<g:render template="/widgets/projectLogo"/>--}%
            %{--<g:render template="/widgets/communityStats"/>--}%
            %{--<g:render template="/widgets/links"/>--}%
            %{--<g:render template="/widgets/forums"/>--}%
        %{--</div>--}%


    </div>
</div>
</body>
</html>
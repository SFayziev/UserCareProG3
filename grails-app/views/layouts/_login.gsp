
<div class="modal fade" id="responsive" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="reg-block-header modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h2>Sign In</h2>
                <g:render template="/layouts/signinsocial" />

                <p>Don't Have Account? Click <a class="color-green" href="page_registration1.html">Sign Up</a> to registration.</p>
            </div>
            <form action='#'  method="POST"  id='ajaxLoginForm' name='ajaxLoginForm' autocomplete="off">
            <div class="modal-body">
                <div class="input-group margin-bottom-20">
                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                    <input type="text" name="j_username" class="form-control" placeholder="Email">
                </div>
                <div class="input-group margin-bottom-20">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" name="j_password" class="form-control" placeholder="Password">
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
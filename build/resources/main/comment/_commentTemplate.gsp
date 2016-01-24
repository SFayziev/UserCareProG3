<div id="comment-template" class="media media-v2 " data-content="0"  >
    <g:render template="/article/userImage" model="${[userDTO:curUser]}" />
    <h4 class="media-heading">
        <strong><a href="#">${curUser?.username}</a></strong>

    </h4>

    <div class="media-body">
        <div class="commenttext" ></div>
        <textarea name="comment-text" data-content="0"  id="commentDesc" onclick="showCommentReply()" class="form-control" rows="2" placeholder="click to add comment"></textarea>
        <div class="margin-bottom-10"></div>

<sec:ifAllGranted roles='ROLE_MANAGER'>
        <div  id="comment-adminbar" class="row margin-bottom-10" style="display:none">
           <div class="col-md-6">
               <div class="input-group">
                   <select class="form-control"  name="articstatus" id="articstatus" >
                       <option></option>
                       <g:each in="${articleStatuses}" var="status"><option value="${status.id}"><locale:message  proj="${project}" code="article.status.name.${status?.id}" default="${status?.name}" /></option></g:each>
                   </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                <button  class="  btn-u btn-u-default">Canned Response</button>
                <input class="  btn-u btn-u-default" name="answer" id="answerChbox"  value="1" type="checkbox"/> Answer

                </div>
            </div>
        </div>

</sec:ifAllGranted>
        <div id="comment-tmpbar" class="input-group margin-bottom-10" style="display:none">
            <button  class="btn-u btn-u-default comment-submit">Submit</button>
            <button   class="btn-u btn-u-default comment-reset">Reset</button>
        </div>
    </div>
</div>


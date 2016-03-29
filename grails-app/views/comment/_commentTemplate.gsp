<div id="comment-template" class="content" data-content="0"  >
      <div class="testimonials-info">
    <div class="topic-avatar">
        <g:render template="/user/userImage" model="${[userDTO:curUser]}" />
    </div>
    <div class="overflow-h">
        <small>
            <strong><a href="#">${curUser?.username}</a></strong>
        </small>
    </div>


        <div class="commenttext" >
            <textarea name="comment-text" data-content="0"  id="commentDesc" onclick="showCommentReply()" class="form-control" rows="2" placeholder="click to add comment"></textarea>
        </div>



<sec:ifAllGranted roles='ROLE_MANAGER'>
        <div  id="comment-adminbar" class="comment-action-bar" style="display:none">
           <div class="col-md-6">
               <div class="input-group">
                   <select class="form-control"  name="articstatus" id="articstatus" >
                       <option></option>
                       <g:each in="${articleStatuses}" var="status"><option value="${status.id}"><locale:message  proj="${UCproject}" code="article.status.name.${status?.id}" default="${status?.name}" /></option></g:each>
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


<div class="content-boxes-v2-o" >
    <g:render template="/user/userImage"  />
    <div class="media-body">
        <h4 class="media-heading">
            <strong>${userDTO.name}</strong>
        </h4>
        <small> <i class="fa fa-star"></i> ${userDTO.raitings} •
            <i class="fa fa-fw fa-file-text"></i> ${userDTO.articles} •
            <i class="fa  fa-pencil-square-o"></i> ${userDTO.comments}
        </small>
    </div>
</div>
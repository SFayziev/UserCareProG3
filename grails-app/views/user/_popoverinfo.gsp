<div class="content" >
    <div class="testimonials-info" >
        <div class="topic-avatar">
            <g:render template="/user/userImage"/>
        </div>
        <div class="title">
            <h4 class="media-heading">
                <strong>${userDTO.name}</strong>
            </h4>
        </div>
        <div class="overflow-h">
            <small>
                <i class="fa fa-star"></i> ${userDTO.raitings} •
                <i class="fa fa-fw fa-file-text"></i> ${userDTO.articles} •
                <i class="fa  fa-pencil-square-o"></i> ${userDTO.comments}
            </small>
        </div>
    </div>
</div>
<div class="module-body" data-moduleid="${module?.id}">
    <div class="headline">
        <h3><g:message code="widget.article.share.title" /></h3>
    </div>
    <div class="share-buttons">
        <a  id="share-tw" class="sharer button" href="#"><i class="fa fa-2x fa-twitter-square" style="color: #55acee;"></i></a>
        <a id="share-fb" class="sharer button" href="#"><i class="fa fa-2x fa-facebook-square" style="color: #3B5998;"></i></a>
        <a id="share-gp" class="sharer button"  href="#"><i class="fa fa-2x fa-google-plus-square" style="color: #d73925;"></i></a>
        <a  id="share-em" class="sharer button"  href="#"><i class="fa fa-2x fa-envelope-square"></i></a>

        <a id="share-ok" class="sharer button"  href="#"><i class="fa fa-2x fa-odnoklassniki-square" style="color: #fa8d12;"></i> </a>

    </div>

</div>

<asset:javascript src="share.js"/>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function(event) {
        var url = window.location.href;
        var title = document.title;
        var subject = $(".comment-info").html();

//facebook
        $('#share-fb').attr('data-url', url).attr('data-sharer', 'facebook');
//twitter
        $('#share-tw').attr('data-url', url).attr('data-title', title).attr('data-sharer', 'twitter');
//linkedin
//        $('#share-li').attr('data-url', url).attr('data-sharer', 'linkedin');
// google plus
        $('#share-gp').attr('data-url', url).attr('data-title', title).attr('data-sharer', 'googleplus');
        // email
        $('#share-em').attr('data-url', url).attr('data-title', title).attr('data-subject', subject).attr('data-sharer', 'email');

//Prevent basic click behavior
        $( ".sharer button" ).click(function() {
            event.preventDefault();
        });


    });

</script>
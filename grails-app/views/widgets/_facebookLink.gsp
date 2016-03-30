<div class="module-body" data-moduleid="${module?.id}">
<div id="fb-root${module?.id}"></div>
<script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=1125484154132364";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div   data-moduleid="${module?.id}" >
    <div >
        <!-- Page plugin's width will be 190px -->
        <div class="fb-page"
             data-href="${module.params?.url?.value}"
             <g:if test="${module.params?.formheight?.value}">data-height="${module.params?.formheight?.value}" </g:if>
             ></div>
    </div>
</div>
</div>
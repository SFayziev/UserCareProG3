<div   data-moduleid="${module?.id}" >
<a class="twitter-timeline"
   data-widget-id="${module.params?.widgetid?.value}"
   <g:if test="${module.params?.formheight?.value}">height="${module.params?.formheight?.value}" </g:if>

   data-chrome="nofooter">
</a>
</div>

<script>window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));</script>
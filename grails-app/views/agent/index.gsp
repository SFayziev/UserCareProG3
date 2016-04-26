<g:applyLayout name="agentMain">
    <content tag="mainContent1">
        <agent:searchPanel/>


            <div class="row">
            <div class="col-xs-5">
                <div  class="module"  >
                    <agent:listArticle params="${[project:UCproject,   params:params]}" />
                </div>
            </div>
            <div class="col-xs-7">
                <div  class="module"  >
                    <div id="article-0"  class="content ">
                    </div>
                </div>

                <div  class="module"  >
                    <div id="comment-0"  class="content ">
                    </div>
                </div>
            </div>


            </div>
        %{--</div>--}%
    </content>
</g:applyLayout>

<div class="search-block panel panel-default">
    %{--<div class="panel-heading">--}%

    %{--</div>--}%
    <div class="panel-body">
        <form class="navbar-form" role="search">
            <agent:filterBy params="${[project:UCproject,  params:params]}"/>
            <agent:forumList params="${[project:UCproject,  params:params]}"/>
            <agent:sortBy params="${[project:UCproject,  params:params]}"/>

            <div class="form-group">
                <label>Search</label>
                <div class="btn-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-search"></i></div>
                        <input class="form-control add-clear-button" id="id_input_search" placeholder="Search text or ticket ID" value="" type="text">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>&nbsp;</label>
                <div class="btn-group">
                    <button id="id_button_update" type="submit" class="form-control btn btn-primary" onclick="getArticleList(16 );return false;"><i class="fa fa-refresh"></i> Refresh</button>
                </div>
            </div>

        </form>
    </div>
</div>




<!-- Initialize the plugin: -->
<script type="text/javascript">
    $(document).ready(function() {
        $('#forumids').multiselect({
            onChange: function() {
                __uc_settings['module_'+ 16 ]['forumids']=$('#forumids').val();
                getArticleList(16);
                console.log($('#forumids').val());
            }
        }
        );
        getArticleList(16);
    });
</script>


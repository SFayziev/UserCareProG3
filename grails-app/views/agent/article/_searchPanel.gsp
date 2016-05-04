
<div class="search-block panel panel-default">
    %{--<div class="panel-heading">--}%

    %{--</div>--}%
    <div class="panel-body">
        <form class="navbar-form" role="search">
            <div class="form-group">
                <label >Filter</label>
                <div class="btn-group">
                    <select id="filterid" class="form-control singleselect" onchange="onChangeFilter(16);">
                        <optgroup label="Default filters">
                            <option value="needs_review" >Needs review</option>
                            <option selected="selected" value="all">All</option>
                            <option value="opened">Opened</option>
                            <option value="assigned_to_me">Assigned to me</option>
                            <option value="opened_and_assigned_to_me">Opened and assigned to me</option>
                            <option value="moderation">On moderation</option>
                        </optgroup>
                        <optgroup label="Additional filters">
                            <option value="custom" label="Configure <span class='dropdown-action-link'><i class='fa fa-gears'></i></span>">Configure</option>

                        </optgroup>
                    </select>
                </div>
            </div>

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


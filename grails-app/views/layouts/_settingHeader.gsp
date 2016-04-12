<%@ page import="com.sh.utils.ForumType; org.springframework.web.servlet.support.RequestContextUtils" %>

<nav role="navigation" class="navbar navbar-default navbar-top navbar-fixed-top">

    <div class="nav-wrapper">
        <!-- START navbar header-->
        <div class="navbar-header">
            <g:link controller="index" class="navbar-brand" >
                <i class="fa fa-fw fa-home"></i> ${UCproject?.name}
            </g:link>
        </div>
        <!-- START Left navbar-->
        <ul class="nav navbar-nav">
            <li>
                <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                <a href="#" data-toggle-state="aside-collapsed" class="hidden-xs">
                    <em class="fa fa-navicon"></em>
                </a>
                <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->
                <a href="#" data-toggle-state="aside-toggled" class="visible-xs">
                    <em class="fa fa-navicon"></em>
                </a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown dropdown-list">
                %{--<i class="fa fa-globe"></i>--}%
                <g:set var="lang" value="${RequestContextUtils.getLocale(request).displayLanguage}"/>
                <a data-toggle="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-globe"></i> ${lang }</a>

                <project:selectActiveLangs params="${[project:UCproject,lang:lang]}" />
            </li>
            <sec:ifLoggedIn>
                <userinfo:usermenu/>
            </sec:ifLoggedIn>

        </ul>

    </div>
</nav>

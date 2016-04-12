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
        %{--<ul class="nav navbar-nav">--}%
            %{--<li>--}%
                %{--<!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->--}%
                %{--<a href="#" data-toggle-state="aside-collapsed" class="hidden-xs">--}%
                    %{--<em class="fa fa-navicon"></em>--}%
                %{--</a>--}%
                %{--<!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->--}%
                %{--<a href="#" data-toggle-state="aside-toggled" class="visible-xs">--}%
                    %{--<em class="fa fa-navicon"></em>--}%
                %{--</a>--}%
            %{--</li>--}%
        %{--</ul>--}%
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

%{--<%@ page import="com.sh.utils.ForumType; org.springframework.web.servlet.support.RequestContextUtils" %>--}%


%{--<div class="header">--}%
    %{--<div class="navbar navbar-default navbar-fixed-top navbar-sticky">--}%
    %{--<div class="container">--}%
        %{--<!-- Logo -->--}%
        %{--<div class="row">--}%
            %{--<div class="col-xs-4 col-md-2">--}%
                %{--<h2>  <g:link controller="index" class="logo" ><i class="fa fa-fw fa-home"></i> ${UCproject?.name} </g:link></h2>--}%
            %{--</div>--}%
            %{--<!-- End Logo -->--}%

            %{--<!-- Topbar -->--}%
            %{--<div class="col-xs-8 col-md-10">--}%

            %{--<div class="topbar">--}%
                %{--<ul  class="loginbar pull-left">--}%
                    %{--<g:each in="${UCproject?.forumDTOs}" var="forum">--}%
                        %{--<g:if test="${forum?.type==ForumType.HelpDesk}">--}%
                            %{--<sec:ifLoggedIn> <li><i class="${forum.faclass}"></i>   <a href="/list/${forum?.id}/">${forum?.name}</a> </li></sec:ifLoggedIn>--}%
                        %{--</g:if>--}%
                        %{--<g:else>--}%
                            %{--<li><i class="${forum.faclass}"></i>   <a href="/list/${forum?.id}/">${forum?.name}</a> </li>--}%
                        %{--</g:else>--}%

                    %{--</g:each>--}%
                %{--</ul>--}%

                %{--<ul class="loginbar pull-right">--}%
                    %{--<li class="hoverSelector">--}%

                        %{--<i class="fa fa-globe"></i>--}%
                        %{--<g:set var="lang" value="${RequestContextUtils.getLocale(request).displayLanguage}"/>--}%
                        %{--<a href="#">${lang }</a>--}%
                        %{--<project:selectActiveLangs params="${[project:UCproject,lang:lang]}" />--}%
                    %{--</li>--}%
                    %{--<li class="topbar-devider"></li>--}%
                    %{--<sec:ifLoggedIn>--}%
                        %{--<userinfo:usermenu/>--}%
                    %{--</sec:ifLoggedIn>--}%
                    %{--<sec:ifNotLoggedIn>--}%
                        %{--<li>--}%
                            %{--<a href ="#"  onclick="showLogin();"><i class="fa fa-lock"></i> <g:message code="user.signin" /> </a> /--}%
                            %{--<g:link controller="user" action="signup"> <g:message code="user.signout" /> </g:link>--}%
                        %{--</li>--}%
                    %{--</sec:ifNotLoggedIn>--}%
                    %{--<li class="topbar-devider "></li>--}%
                    %{--<li>--}%
                        %{--<!-- Toggle get grouped for better mobile display -->--}%
                        %{--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">--}%
                            %{--<span class="sr-only">Toggle navigation</span>--}%
                            %{--<span class="fa fa-bars"></span>--}%
                        %{--</button>--}%
                        %{--<!-- End Toggle -->--}%

                    %{--</li>--}%

                %{--</ul>--}%

            %{--</div>--}%
            %{--</div>--}%
        %{--</div>--}%
        %{--<!-- End Topbar -->--}%


    %{--</div><!--/end container-->--}%
    %{--</div>--}%
%{--</div>--}%

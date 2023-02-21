<div class="app-sidebar sidebar-shadow">
    <div class="app-header__logo">
        <div class="header__pane ml-auto">
            <div>
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
    </div>
    <div class="app-header__mobile-menu">
        <div>
            <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>
        </div>
    </div>
    <div class="app-header__menu">
        <span>
            <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                <span class="btn-icon-wrapper">
                    <i class="fa fa-ellipsis-v fa-w-6"></i>
                </span>
            </button>
        </span>
    </div>
    <div class="scrollbar-sidebar">
        <div class="app-sidebar__inner">
            <ul class="vertical-nav-menu">
                <li class="app-sidebar__heading">Menu</li>
                <li>
                    <a href="{{ route('Dashboard') }}">
                        <i class="fa fa-tachometer"></i>Quán lý
                        <i class="metismenu-state-icon fa fa-angle-left caret-left"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-list-alt"></i>Danh mục
                        <i class="metismenu-state-icon fa fa-angle-left caret-left"></i>
                    </a>
                    <ul>
                        <li>
                            <a href="{{ route('ListOfCategories') }}">
                                <i class="metismenu-icon"></i> Danh sách danh mục
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('CreateCategory') }}">
                                <i class="metismenu-icon"></i> Thêm danh mục
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-blog"></i>Bài viết
                        <i class="metismenu-state-icon fa fa-angle-left caret-left"></i>
                    </a>
                    <ul>
                        <li>
                            <a href="{{ route('ListOfBlogs') }}">
                                <i class="metismenu-icon"></i> Danh sách bài viết
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('CreateBlog') }}">
                                <i class="metismenu-icon"></i> Thêm bài viết
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-cog"></i>Cài đặt trang web
                        <i class="metismenu-state-icon fa fa-angle-left caret-left"></i>
                    </a>
                </li>
                <li>
                    <a href="{{route('Ip')}}">
                        <i class="fas fa-fan"></i>Ip
                        <i class="metismenu-state-icon fa fa-angle-left caret-left"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

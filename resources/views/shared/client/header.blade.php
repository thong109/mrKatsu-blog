<header class="jlc-hmain-w jlc-hop3 jl_base_menu jl_md_main">
    <div class="jlc-top-w">
        <div class="jlc-container">
            <div class="jlc-row">
                <div class="jlc-col-md-12">
                    <div class="jl_thc">
                        <div class="jl_htl">
                            <div class="jl_hlc">Email admin - {{ $OWNER['email'] }}</div>
                        </div>
                        <div class="jl_htr">
                            <div class="jl_hrsh">
                                <ul class="jl_sh_ic_li">
                                    <li class="jl_facebook"><a href="{{ $OWNER->user_info['facebook'] }}"
                                            target="_blank"><i class="fa-brands fa-facebook"></i></a></li>
                                    <li class="jl_twitter"><a href="{{ $OWNER->user_info['youtube'] }}"
                                            target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
                                    <li class="jl_instagram"><a href="{{ $OWNER->user_info['instagram'] }}"
                                            target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                                    @if (Route::has('login'))
                                        @auth
                                            {{-- <li class="jl_instagram">
                                                <a href="{{ route('logout') }}" title="Đăng xuất"
                                                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                                    <i class="fa-solid fa-right-to-bracket"></i>
                                                </a>
                                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                                    class="d-none">
                                                    @csrf
                                                </form>
                                            </li> --}}
                                            <li class="jl_instagram">
                                                <a href="{{ route('Profile') }}" title="Trang cá nhân">
                                                    <i class="fa-solid fa-user"></i>
                                                </a>
                                            </li>
                                        @else
                                            <li class="jl_instagram">
                                                <a href="{{ route('login') }}" title="Đăng nhập">
                                                    <i class="fa-solid fa-user"></i>
                                                </a>
                                            </li>
                                            {{-- @if (Route::has('register'))
                                                <li
                                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                                    <a href="{{ route('register') }}"><span
                                                            class="jl_mblt">Register</span></a>
                                                </li>
                                            @endif --}}
                                        @endauth
                                    @endif
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="jlc-hmain-in">
        <div class="jlc-container">
            <div class="jlc-row">
                <div class="jlc-col-md-12">
                    <div class="jl_hwrap">
                        <div class="menu-primary-container navigation_wrapper">
                            <ul id="menu-main-menu" class="jl_main_menu">
                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home">
                                    <a href="{{ route('Home') }}"><span class="jl_mblt">Trang chủ</span></a>
                                </li>
                            </ul>
                        </div>
                        <div class="logo_small_wrapper_table">
                            <div class="logo_small_wrapper">
                                <a class="logo_link" href="{{route('Home')}}">
                                    <span>
                                        <img class="jl_logo_n" src="../../imgs/logo.png"
                                            alt="Just another Jellywp Sites site" />
                                        <img class="jl_logo_w" src="../../imgs/logo.png"
                                            alt="Just another Jellywp Sites site" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<div id="jl_sb_nav" class="jl_mobile_nav_wrapper ">
    <div id="nav" class="jl_mobile_nav_inner">
        <div class="logo_small_wrapper_table">
        </div>
        <div class="menu_mobile_icons mobile_close_icons closed_menu"><span class="jl_close_wapper"><span
                    class="jl_close_1"></span><span class="jl_close_2"></span></span></div>
        <ul id="mobile_menu_slide" class="menu_moble_slide">
            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-11723">
                <a href="../../index.html">Trang chủ<span class="border-menu"></span></a>
            </li>
        </ul>
    </div>
    <div class="nav_mb_f">
        <ul class="jl_sh_ic_li">
            <li class="jl_facebook"><a href="#" target="_blank"><i class="fa-brands fa-facebook"></i></a></li>
            <li class="jl_twitter"><a href="#" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            </li>
            <li class="jl_instagram"><a href="#" target="_blank"><i class="fa-brands fa-instagram"></i></i></a>
            </li>
            <li class="jl_pinterest"><a href="#" target="_blank"><i class="fa-brands fa-pinterest-p"></i></i></a>
            </li>
        </ul>
        <div class="cp_txt">© Copyright 2022 Jellywp. All rights reserved powered by <a href="../../../index.html"
                target="_blank">Jellywp.com</a></div>
    </div>
</div> {{-- menu ngang --}}

<div class="search_form_menu_personal">
    <div class="menu_mobile_large_close"><span class="jl_close_wapper search_form_menu_personal_click"><span
                class="jl_close_1"></span><span class="jl_close_2"></span></span></div>
    <form method="get" class="searchform_theme" action="../../index.html">
        <input type="text" placeholder="Type to search..." value="" name="s" class="search_btn" />
        <button type="submit" class="button"><i class="fa fa-search"></i></button>
    </form>
</div> {{--  search --}}

@extends('layouts.client')
@section('title', __('Trang cá nhân'))
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row">
                <div class="jlc-col-md-4 jl_smmain_side">
                    <div class="jl_sidebar_w">
                        <div id="wesper_recent_post_text_widget-1" class="widget post_list_widget">
                            <div class="widget_jl_wrapper">
                                <div class="author-avatar-client">
                                    <img src="{{ $user['user_info']['avatar'] }}" class="border" alt="">
                                </div>
                            </div>
                        </div>
                        <div id="categories-1" class="widget widget_categories">
                            <div class="widget-title text-center">
                                <h2 class="jl_title_c">{{ $user['name'] }}</h2>
                            </div>
                            <ul>
                                <li class="cat-item cat-item-16">
                                    <a href="{{ route('EditProfile') }}">Thay đổi thông
                                        tin cá nhân</a>
                                </li>
                                <li class="cat-item cat-item-20">
                                    <a href="{{ route('logout') }}"
                                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Đăng
                                        xuất</a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="jlc-col-md-8 jl_main_achv jl_achv_tpl_list">
                    <div class="jl_breadcrumbs align-items-center items-justified-center"> <span class="jl_item_bread">
                            Bài viết đã đăng
                        </span>
                    </div>
                    <div class="jl_clear_at block-section jl-main-block jl_wrapper_cat" data-page_current="1"
                        data-page_max="4" data-posts_per_page="10" data-order="date_post" data-section_style="jl_cat_list"
                        data-author="1">
                        <div class="jl_clear_at">
                            <div class="jl_main_list_cw jl_wrap_eb jl_clear_at jl_lm_list">
                                <div class="jl_fli_wrap jl-roww jl_contain jl-col-row">
                                    @foreach ($posts as $post)
                                        <div
                                            class="jl_clist_layout jl_lisep post-2970 post type-post status-publish format-gallery has-post-thumbnail hentry category-business tag-inspiration tag-morning tag-tip tag-tutorial post_format-post-format-gallery">
                                            <div class="jl_li_in">
                                                <div class="jl_img_holder">
                                                    <div class="jl_imgw jl_radus_e">
                                                        <div class="jl_imgin"> <img width="600" height="650"
                                                                src="{{ $post['image'] }}"
                                                                class="attachment-wesper_list size-wesper_listjl-lazyload wp-post-image lazyloaded"
                                                                alt="" decoding="async"
                                                                data-src="{{ $post['image'] }}">
                                                        </div>
                                                        <span class="jl_none"></span>
                                                        <a class="jl_imgl"
                                                            href="{{ route('PostDetail', ['slug' => $post->slug]) }}"></a>
                                                    </div>
                                                </div>

                                                <div class="jl_fe_text">
                                                    <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat17"
                                                            href="{{ route('Home', ['category' => $post['categories']['slug']]) }}"><span>{{ $post['categories']['name'] }}</span></a></span>
                                                    <h3 class="jl_fe_title"><a
                                                            href="{{ route('PostDetail', ['slug' => $post->slug]) }}">{{ $post['name'] }}</a>
                                                    </h3>
                                                    <p class="jl_fe_des">{{ $post['description'] }}</p>
                                                    <span class="jl_post_meta"><span class="jl_author_img_w">Bởi <a
                                                                href="{{ route('PostsByAdmin', ['id' => $post->created_by]) }}"
                                                                title="Posts by Michael"
                                                                rel="author">{{ $user['name'] }}</a></span><span
                                                            class="post-date">{{ $post->created_at->format('d M Y') }}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                            {{ $posts->appends(request()->input())->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@extends('layouts.client')
@section('title', $postDetail['name'])
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container mb-4">
            <div class="jlc-row">
                @include('shared.client._sidebar')
                <div class="jlc-col-md-8 jl_main_achv jl_achv_tpl_list">
                    <div class="jl_sp_con" id="2830">
                        <div class="jl_shead_tpl4 jl_shead_mix10">
                            <div class="jl_ov_layout jl_ov_el">
                                <div class="jl_img_holder">
                                    <div class="jl_imgw">
                                        <div class="video-wrap overlay-media jl_load_vids">
                                            <img src="{{ $postDetail['image'] }}" alt="{{ $postDetail['name'] }}"
                                                width="100%" class="h-100">
                                        </div>
                                    </div>
                                </div>
                                <div class="jl_fe_text">
                                    <div class="jl_fe_inner">
                                        <div class="jl_breadcrumbs"> <span class="jl_item_bread">
                                                <a href="../index.html">
                                                    Trang chủ </a>
                                            </span>
                                            /
                                            <span class="jl_item_bread">{{ $postDetail['name'] }}</span>
                                        </div>
                                        <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat16"
                                                href="{{ route('Home', ['category' => $postDetail['categories']['slug']]) }}"><span>{{ $postDetail['categories']['name'] }}</span></a></span>
                                        <h1 class="jl_head_title jl_fe_title">{{ $postDetail['name'] }}</h1>
                                        <p class="post_subtitle_text">{{ $postDetail['description'] }}</p>
                                        <span class="jl_post_meta jl_slimeta">
                                            <span class="jl_author_img_w">
                                                <span class="jl_aimg_in">
                                                    <img src="{{ $postDetail['avatar'] }}" width="50" height="50"
                                                        class="avatar avatar-50 wp-user-avatar wp-user-avatar-50 alignnone photo ls-is-cached lazyloaded"></span>
                                                <a href="{{ route('PostsByAdmin', ['id' => $postDetail->created_by]) }}"
                                                    title="Posts by Michael" rel="author">{{ $postDetail['author'] }}</a>
                                            </span>
                                            <span
                                                class="post-date">{{ $postDetail['created_at']->format('d M Y') }}</span><span
                                                class="jl_view_options"> {{ count($postDetail->viewed()->get()) }}
                                                Lượt xem</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jl_block_content jl_auths_box">
                            <div class="jlc-container jl_single_tpl_w">
                                <div class="jlc-row main_content jl_single_tpl10">
                                    <div class="jlc-col-md-12">
                                        <div class="jl_smmain_w">
                                            <div class="jl_smmain_in">
                                                <div class="post_content_w">
                                                    <div class="jls_con_w">
                                                        <div class="post_content jl_content" style="word-wrap: break-word;">
                                                            {!! $postDetail['content'] !!}
                                                        </div>
                                                        <div class="single_tag_share">
                                                            <div class="tag-cat">
                                                                <ul class="single_post_tag_layout">
                                                                    @foreach ($postDetail->tags()->get() as $tag)
                                                                        <li><a href="{{ route('Home', ['tag' => $tag->keyword]) }}"
                                                                                rel="tag">{{ $tag->keyword }}</a></li>
                                                                    @endforeach
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="postnav_w">
                                                    <div class="jl_navpost postnav_left d-flex align-items-center">
                                                        @if ($prePost != null)
                                                            <a class="jl_nav_link"
                                                                href="{{ route('PostDetail', ['slug' => $prePost['slug']]) }}"
                                                                id="prepost">
                                                                <span class="jl_nav_img">
                                                                    <img width="150" height="150"
                                                                        src="{{ $prePost['image'] }}"
                                                                        class="attachment-thumbnail size-thumbnailjl-lazyload wp-post-image ls-is-cached lazyloaded"
                                                                        alt="" decoding="async" loading="lazy"
                                                                        data-src="{{ $prePost['image'] }}">
                                                                </span>
                                                                <span class="jl_nav_wrap">
                                                                    <span class="jl_nav_label">Bài viết trước</span>
                                                                    <span
                                                                        class="jl_cpost_title">{{ $prePost['name'] }}</span>
                                                                </span>
                                                            </a>
                                                        @else
                                                            <a class="jl_nav_link" id="prepost">
                                                                <span class="jl_nav_wrap">
                                                                    <span class="jl_nav_label">Bài viết trước</span>
                                                                    <span class="jl_cpost_title">Không có</span>
                                                                </span>
                                                            </a>
                                                        @endif
                                                    </div>
                                                    <div class="jl_navpost postnav_right d-flex align-items-center"
                                                        style="justify-content: end">
                                                        @if ($nextPost != null)
                                                            <a class="jl_nav_link"
                                                                href="{{ route('PostDetail', ['slug' => $nextPost['slug']]) }}"
                                                                id="nextpost">
                                                                <span class="jl_nav_img">
                                                                    <img width="150" height="150"
                                                                        src="{{ $nextPost['image'] }}"
                                                                        class="attachment-thumbnail size-thumbnailjl-lazyload wp-post-image ls-is-cached lazyloaded"
                                                                        alt="" decoding="async" loading="lazy"
                                                                        data-src="{{ $nextPost['image'] }}">
                                                                </span>
                                                                <span class="jl_nav_wrap">
                                                                    <span class="jl_nav_label">Bài viết tiếp theo</span>
                                                                    <span
                                                                        class="jl_cpost_title">{{ $nextPost['name'] }}</span>
                                                                </span>
                                                            </a>
                                                        @else
                                                            <a class="jl_nav_link" id="nextpost">
                                                                <span class="jl_nav_wrap">
                                                                    <span class="jl_nav_label">Bài viết tiếp theo</span>
                                                                    <span class="jl_cpost_title">Không có</span>
                                                                </span>
                                                            </a>
                                                        @endif
                                                    </div>
                                                </div>
                                                <div class="jl_auth_single">
                                                    <div class="author-info jl_info_auth">
                                                        <div class="author-avatar">
                                                            <a
                                                                href="{{ route('PostsByAdmin', ['id' => $postDetail['created_by']]) }}">
                                                                <img src="{{ $postDetail['avatar'] }}" width="165"
                                                                    height="165" alt="Michael"
                                                                    class="avatar avatar-165 wp-user-avatar wp-user-avatar-165 alignnone photo">
                                                            </a>
                                                        </div>
                                                        <div class="author-description">
                                                            <div class="jl_auth_lbl">Tác giả</div>
                                                            <h5 class="jl_fe_title">
                                                                <a
                                                                    href="{{ route('PostsByAdmin', ['id' => $postDetail['created_by']]) }}">
                                                                    {{ $postDetail['author'] }} </a>
                                                            </h5>
                                                            <ul class="jl_auth_link clearfix">
                                                                <li><a href="{{ $postDetail['facebook'] }}"
                                                                        target="_blank" rel="nofollow"><i
                                                                            class="fa-brands fa-facebook"></i></a>
                                                                </li>
                                                                <li><a href="{{ $postDetail['instagram'] != null ? $postDetail['instagram'] : '#' }}"
                                                                        target="_blank" rel="nofollow"><i
                                                                            class="fa-brands fa-instagram"></i></a>
                                                                </li>
                                                                <li><a href="{{ $postDetail['twitter'] != null ? $postDetail['twitter'] : '#' }}"
                                                                        target="_blank" rel="nofollow"><i
                                                                            class="fa-brands fa-twitter"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="single_section_comment">
                                                    <div class="jl_comment_head">
                                                        <h3 class="jl_comment_head_title">Bình luận (<span
                                                                class="fb-comments-count"
                                                                data-href="{{ route('PostDetail', ['slug' => $postDetail['slug']]) }}"></span>)
                                                        </h3>
                                                    </div>
                                                    <div class="jl_comment_wrap jl_no_comment">
                                                        <div id="comments" class="comments-area">
                                                            <div id="respond" class="comment-respond">
                                                                <div id="comments">
                                                                    <div class="fb-comments"
                                                                        data-href="{{ route('PostDetail', ['slug' => $postDetail['slug']]) }}"
                                                                        data-width="100%" data-height="100%"
                                                                        style="height: auto !important" data-numposts="5">
                                                                    </div>
                                                                </div>
                                                            </div><!-- #respond -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jl_relsec_wrap">
            <div class="jl_relsec">
                <div class="jl_relsec_in">
                    <h4>Bài viết liên quan</h4>
                    <div class="jl_rel_posts">
                        @foreach ($relatedPost as $post)
                            <div class="jl_cgrid_layout">
                                <div class="jl_img_holder">
                                    <div class="jl_imgw jl_radus_e">
                                        <div class="jl_imgin">
                                            <img width="680" height="580" src="{{ $post['image'] }}"
                                                class="attachment-wesper_layouts size-wesper_layoutsjl-lazyload wp-post-image lazyloaded"
                                                alt="" decoding="async" loading="lazy"
                                                data-src="{{ $post['image'] }}">
                                        </div>
                                        <span class="jl_none"></span>
                                        <a class="jl_imgl"
                                            href="{{ route('PostDetail', ['slug' => $post['slug']]) }}"></a>
                                    </div>
                                </div>
                                <div class="jl_fe_text">
                                    <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat16"
                                            href="../category/active/index.html"><span>{{ $post['categories']['name'] }}</span></a></span>
                                    <h3 class="jl_fe_title"><a
                                            href="{{ route('PostDetail', ['slug' => $post['slug']]) }}">{{ $post['name'] }}</a>
                                    </h3>
                                    <p class="jl_fe_des">{{ $post['description'] }}</p>
                                    <span class="jl_post_meta"><span class="jl_author_img_w">Lượt xem
                                            <a rel="author">
                                                {{ count($post->viewed()->get()) }}</a></span><span
                                            class="post-date">{{ $post->created_at->format('d M Y') }}</span></span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

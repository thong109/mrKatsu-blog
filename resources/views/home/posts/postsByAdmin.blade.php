@extends('layouts.client')
@section('title', $getAuthor->name)
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row">
                @include('shared.client._sidebar')
                <div class="jlc-col-md-8 jl_main_achv jl_achv_tpl_list">
                    <div class="jl_breadcrumbs"> <span class="jl_item_bread">
                            <a href="{{ route('/') }}">Home</a></span>
                        <span>/</span><span class="jl_item_bread"><a href="">Author</a></span>
                        <span>/</span><span class="jl_item_bread">{{ $getAuthor->name }} </span>
                    </div>
                    <div class="auth">
                        <div class="author-info jl_auth_head jl_info_auth">
                            <div class="author-avatar">
                                <img src="{{ $getAuthor->user_info->avatar }}" width="165" height="165"
                                    alt="{{ $getAuthor->name }}"
                                    class="avatar avatar-165 wp-user-avatar wp-user-avatar-165 alignnone photo">
                            </div>
                            <div class="author-description">
                                <h5><a itemprop="author" href="{{ route('PostsByAdmin', ['id' => $getAuthor->id]) }}">
                                        {{ $getAuthor->name }}</a></h5>
                                <p itemprop="description">
                                    Etiam vitae dapibus rhoncus. Eget etiam aenean nisi montes felis pretium donec veni.
                                    Pede vidi condimentum et aenean hendrerit. Quis sem justo nisi varius </p>
                                <ul class="jl_auth_link clearfix">
                                    <li><a href="{{ $getAuthor->user_info->facebook }}" target="_blank"
                                            rel="nofollow">FB</a></li>
                                    <li><a href="{{ $getAuthor->user_info->youtube }}" target="_blank" rel="nofollow"><i
                                                class="jli-facebook"></i></a></li>
                                    <li><a href="{{ $getAuthor->user_info->instagram }}" target="_blank" rel="nofollow"><i
                                                class="jli-instagram"></i></a></li>
                                    <li><a href="{{ $getAuthor->user_info->groupFB }}" target="_blank" rel="nofollow"><i
                                                class="jli-pinterest"></i></a></li>
                                </ul>
                                <span class="author_postcount">{{ $countPosts }} Articles</span>
                                {{-- <span class="author_commentcount">23 Comments</span> --}}
                            </div>
                        </div>
                    </div>
                    <div class="jl_clear_at block-section jl-main-block jl_wrapper_cat" data-page_current="1"
                        data-page_max="4" data-posts_per_page="10" data-order="date_post" data-section_style="jl_cat_list"
                        data-author="1">
                        <div class="jl_clear_at">
                            <div class="jl_main_list_cw jl_wrap_eb jl_clear_at jl_lm_list">
                                <div class="jl_fli_wrap jl-roww jl_contain jl-col-row">
                                    @foreach ($getPostsByAdmin as $post)
                                        <div
                                            class="jl_clist_layout jl_lisep post-2970 post type-post status-publish format-gallery has-post-thumbnail hentry category-business tag-inspiration tag-morning tag-tip tag-tutorial post_format-post-format-gallery">
                                            <div class="jl_li_in">
                                                <div class="jl_img_holder">
                                                    <div class="jl_imgw jl_radus_e">
                                                        <div class="jl_imgin"> <img width="600" height="650"
                                                                src="{{ $post->image }}"
                                                                class="attachment-wesper_list size-wesper_listjl-lazyload wp-post-image lazyloaded"
                                                                alt="" decoding="async"
                                                                data-src="{{ $post->image }}">
                                                        </div>
                                                        <span class="jl_none"></span>
                                                        <a class="jl_imgl"
                                                            href="../../this-sundress-is-a-must-have-for-summer/index.html"></a>
                                                    </div>
                                                </div>
                                                <div class="jl_fe_text">
                                                    <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat17"
                                                            href=""><span>{{ $post->nameCate }}</span></a></span>
                                                    <h3 class="jl_fe_title"><a
                                                            href="../../this-sundress-is-a-must-have-for-summer/index.html">{{ $post->name }}</a>
                                                    </h3>
                                                    <p class="jl_fe_des">{{ $post->description }}</p>
                                                    <span class="jl_post_meta"><span class="jl_author_img_w">Bởi <a
                                                                href="index.html" title="Posts by Michael"
                                                                rel="author">{{ $post->author }}</a></span><span
                                                            class="post-date">{{ $post->created_at->format('d M Y') }}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                            {{ $getPostsByAdmin->appends(request()->input())->links() }}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

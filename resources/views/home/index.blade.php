@extends('layouts.client')
@section('title', __('Home'))
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row">
                @include('shared.client._sidebar')
                <div class="jlc-col-md-8 jl_main_achv jl_achv_tpl_list">
                    <div class="jl_breadcrumbs" style="justify-content:center">
                        <span class="jl_item_bread">
                            <legend><a href="{{ route('/') }}" class="listpost">Danh sách bài viết</a></legend>
                        </span>
                    </div>
                    <div class="jl_clear_at block-section jl-main-block jl_wrapper_cat" data-page_current=1 data-page_max=1
                        data-posts_per_page=10 data-order=date_post data-section_style=jl_cat_list data-categories=17>
                        <div class="jl_clear_at">
                            <div class="jl_main_list_cw jl_wrap_eb jl_clear_at jl_lm_list">
                                <div class="jl_fli_wrap jl-roww jl_contain jl-col-row">
                                    @if (count($blogs) > 0)
                                        @foreach ($blogs as $blog)
                                            <div
                                                class="jl_clist_layout jl_lisep post-2970 post type-post status-publish format-gallery has-post-thumbnail hentry category-business tag-inspiration tag-morning tag-tip tag-tutorial post_format-post-format-gallery">
                                                <div class="jl_li_in">
                                                    <div class="jl_img_holder">
                                                        <div class="jl_imgw jl_radus_e">
                                                            <div class="jl_imgin"> <img width="600" height="650"
                                                                    src="{{ $blog->image }}"
                                                                    class="attachment-wesper_list wp-post-image"
                                                                    alt="" decoding="async" loading="lazy"
                                                                    data-src="{{ $blog->image }}" />
                                                            </div>
                                                            <span class="jl_none"></span>
                                                            <div class="container-donut jl-donut-front">
                                                            </div>
                                                            <a
                                                                class="jl_imgl"href="{{ route('PostDetail', ['slug' => $blog->slug]) }}">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="jl_fe_text">
                                                        <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat17"
                                                                href="{{ route('Home', ['category' => $blog->slugCate]) }}"><span>{{ $blog->nameCate }}</span></a></span>
                                                        <h3 class="jl_fe_title"><a
                                                                href="{{ route('PostDetail', ['slug' => $blog->slug]) }}">{{ $blog->name }}</a>
                                                        </h3>
                                                        <p class="jl_fe_des">{{ $blog->description }}</p>
                                                        <span class="jl_post_meta mb-3"><span class="jl_author_img_w">Bởi
                                                                <a href="{{ route('PostsByAdmin', ['id' => $blog->created_by]) }}"
                                                                    title="Posts by Michael"
                                                                    rel="author">{{ $blog->author }}</a></span><span
                                                                class="post-date">{{ $blog->created_at->format('d M Y') }}</span></span>
                                                        <div class="single_tag_share">
                                                            <div class="tag-cat">
                                                                <ul class="single_post_tag_layout">
                                                                    @foreach ($blog->tags()->get() as $tag)
                                                                        <li><a href="{{ route('Home', ['tag' => $tag->keyword]) }}"
                                                                                rel="tag">{{ $tag->keyword }}</a></li>
                                                                    @endforeach
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                    @else
                                        <div
                                            class="jl_clist_layout jl_lisep post-2970 post type-post status-publish format-gallery has-post-thumbnail hentry category-business tag-inspiration tag-morning tag-tip tag-tutorial post_format-post-format-gallery">
                                            <span>Không có bài viết</span>
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <nav class="jellywp_pagination">
                                {{ $blogs->appends(request()->input())->links() }}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

<div class="jlc-col-md-4 jl_smmain_side">
    <div class="jl_sidebar_w">
        <div id="categories-3" class="widget widget_categories">
            <div class="widget-title">
                <h2 class="jl_title_c">Tìm kiếm</h2>
            </div>
            <div class="search-container">
                <form method="GET" action="{{ route('Home') }}" class="search-home">
                    <input type="text" placeholder="Tìm kiếm.." name="keyword" value="{{ $keyword ?? $keyword }}"
                        style="display: block !important">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
        <div id="categories-1" class="widget widget_categories">
            <div class="widget-title">
                <h2 class="jl_title_c">Danh mục</h2>
            </div>
            <ul>
                @foreach ($CATEGORIES as $category)
                    <li class="cat-item cat-item-21"><a
                            href="{{ route('Home', ['category' => $category->slug]) }}">{{ $category->name }}</a>
                    </li>
                @endforeach
            </ul>
        </div>
        <div id="wesper_recent_post_text_widget-1" class="widget post_list_widget">
            <div class="widget_jl_wrapper">
                <div class="widget-title">
                    <h2 class="jl_title_c">Bài viết nhiều lượt xem</h2>
                </div>
                <div class="bt_post_widget">
                    @foreach ($BLOGVIEW as $item)
                        <div class="jl_mmlist_layout jl_lisep jl_li_num">
                            <div class="jl_li_in">
                                <div class="jl_img_holder">
                                    <div class="jl_imgw jl_radus_e">
                                        <div class="jl_imgin">
                                            <img width="150" height="150" src="{{ $item->image }}"
                                                class="wp-post-image" data-src="{{ $item->image }}" />
                                        </div>
                                        <span class="jl_li_lbl"></span>
                                        <a class="jl_imgl"
                                            href="{{ route('PostDetail', ['slug' => $item->slug]) }}"></a>
                                    </div>
                                </div>
                                <div class="jl_fe_text">
                                    <span class="jl_f_cat jl_lb1"><a class="jl_cat_txt jl_cat17"
                                            href="{{ route('Home', ['category' => $item->slugCate]) }}"><span>{{ $item->nameCate }}</span></a></span>
                                    <h3 class="jl_fe_title jl_txt_2row"><a
                                            href="{{ route('PostDetail', ['slug' => $item->slug]) }}">{{ $item->name }}</a>
                                    </h3>
                                    <span class="jl_post_meta">
                                        <span class="post-date">{{ $item->created_at->format('d M Y') }}</span>
                                        <span class="post-date">View: {{ count($item->viewed()->get()) }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div id="wesper_recent_post_text_widget-1" class="widget post_list_widget">
            <div class="widget_jl_wrapper">
                <div class="widget-title">
                    <h2 class="jl_title_c">Từ khoá</h2>
                </div>
                <div class="bt_post_widget">
                    <ul class="d-flex mb-3">
                        @foreach ($TAGS as $tag)
                            <li class="tag"><a
                                    href="{{ route('Home', ['tag' => $tag->keyword]) }}">{{ $tag->keyword }}</a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

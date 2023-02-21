@if ($paginator->hasPages())
    <div class="pt-pagination">
        <nav aria-label="Page navigation" class="jellywp_pagination">
            <ul class="page-numbers">
                {{-- Previous Page Link --}}
                @if ($paginator->onFirstPage())
                    <li aria-disabled="true" aria-label="@lang('pagination.previous')">
                        <span class="next page-numbers disabled" aria-hidden="true">&lsaquo;</span>
                    </li>
                @else
                    <li>
                        <a class="next page-numbers" href="{{ $paginator->previousPageUrl() }}" rel="prev"
                            aria-label="@lang('pagination.previous')">&lsaquo;</a>
                    </li>
                @endif

                {{-- Pagination Elements --}}
                @foreach ($elements as $element)
                    {{-- "Three Dots" Separator --}}
                    @if (is_string($element))
                        <li class="page-item disabled page-numbers" aria-disabled="true"><span
                                class="page-link">{{ $element }}</span></li>
                    @endif

                    {{-- Array Of Links --}}
                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                {{-- <li class="page-item active" aria-current="page"><span class="page-link">{{ $page }}</span></li> --}}
                                <li>
                                    <span aria-current="page" class="page-numbers current page-numbers">{{ $page }}</span>
                                </li>
                            @else
                                <li><a class="page-numbers page-numbers" href="{{ $url }}">{{ $page }}</a></li>
                            @endif
                        @endforeach
                    @endif
                @endforeach

                {{-- Next Page Link --}}
                @if ($paginator->hasMorePages())
                    <li>
                        <a class="next page-numbers" href="{{ $paginator->nextPageUrl() }}" rel="next"
                            aria-label="@lang('pagination.next')">&rsaquo;</a>
                    </li>
                @else
                    <li aria-disabled="true" aria-label="@lang('pagination.next')">
                        <span class="next page-numbers disabled" aria-hidden="true">&rsaquo;</span>
                    </li>
                @endif
            </ul>
        </nav>
    </div>
@endif

@extends('layouts.admin')
@section('title', __('Địa chỉ Ip'))

@section('css')
    {!! Html::style('/css/modules/admin/categories-management/list-of-categories.css') !!}
@stop

@section('scripts')
    <script>
        const urls = {
            listOfCategories: '{{ route('ListOfCategories') }}',
            editCategory: '{{ route('EditCategory', '') }}',
            deleteCategories: '{{ route('DeleteCategories') }}',
            changeStatus: '{{ route('ChangeStatusOfCategory') }}',
        }
    </script>
    {!! Html::script('/js/modules/admin/categories-management/list-of-categories.js') !!}
@stop

@section('admin-content')
    <!-- Page Header -->
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="fa fa-list"></i>
                    </div>
                    <div>Địa chỉ Ip
                        <div class="page-title-subheading">Quản lý Địa chỉ Ip</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <div class="main-card mb-3 card">
                <div class="card-body">
                    <div class="card-body">
                    </div>
                    <div class="card-body">
                        <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table style="width: 100%;" id="example"
                                        class="table-hover table-striped table-bordered dataTable dtr-inline" role="grid"
                                        aria-describedby="example_info">
                                        <thead>
                                            <tr role="row">
                                                <th>Ip</th>
                                                <th>Thời gian</th>
                                                <th>Bài viết đã xem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($ips as $ip)
                                                <tr role="row" class="odd">
                                                    <td class="sorting_1 dtr-control cursor bold p-3">{{ $ip->ip }}
                                                    </td>
                                                    <td class="p-3">{{ $ip->date }}</td>
                                                    <td class="p-3"><a
                                                            href="{{ route('PostDetail', ['slug' => $ip->blog->slug]) }}"
                                                            target="_blank">{{ $ip->blog->name }}</a></td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

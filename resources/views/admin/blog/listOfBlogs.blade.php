@extends('layouts.admin')
@section('title', __('Danh sách bài viết'))

@section('css')
    {!! Html::style('/css/modules/admin/blogs-management/list-of-blogs.css') !!}
@stop

@section('scripts')
    <script>
        const urls = {
            listOfBlogs: '{{ route('ListOfBlogs') }}',
            fetchBlogs: '{{ route('FetchBlogs') }}',
            editBlog: '{{ route('EditBlog', '') }}',
            deleteBlogs: '{{ route('DeleteBlogs') }}',
            changeStatus: '{{ route('ChangeStatusOfBlog') }}',
        }
    </script>
    {!! Html::script('/js/modules/admin/blogs-management/list-of-blogs.js') !!}
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
                    <div>Bài viết
                        <div class="page-title-subheading">Quản lý bài viết</div>
                    </div>
                </div>
                <div class="page-title-actions">
                    <a href="{{ route('CreateBlog') }}" data-toggle="tooltip" class="btn-shadow mr-3 btn btn-dark">
                        <i class="fa fa-plus"></i> Thêm bài viết
                    </a>
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
                                                <th class="max-30 col-for-action text-center">
                                                    <input type="checkbox" class="check-all">
                                                </th>
                                                <th class="sorting_asc" tabindex="0" aria-controls="example"
                                                    rowspan="1" colspan="1" style="width: 20%;" aria-sort="ascending"
                                                    aria-label="Title: activate to sort column descending">Tên bài viết</th>
                                                <th class="sorting" tabindex="0" aria-controls="example" rowspan="1"
                                                    colspan="1" style="width: 20%;"
                                                    aria-label="Description: activate to sort column ascending">Tiêu đề
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="example" rowspan="1"
                                                    colspan="1" style="width: 10%;"
                                                    aria-label="User: activate to sort column ascending">Tác giả</th>
                                                <th class="sorting" tabindex="0" aria-controls="example" rowspan="1"
                                                    colspan="1" style="width: 50%;"
                                                    aria-label="Body: activate to sort column ascending">Nội dung</th>
                                                <th style="width: 5%;">...</th>
                                            </tr>
                                        </thead>
                                        <tbody id="featchBlogs">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="submit-section in-list">
                                    <button type="button" id="btn-bulk-delete"
                                        class="btn btn-danger btn-sm">{{ __('Xoá cột đã chọn') }}</button>
                                    <button type="button" id="btn-bulk-lock"
                                        class="btn btn-warning btn-sm">{{ __('Ẩn cột đã chọn') }}</button>
                                    <button type="button" id="btn-bulk-unlock"
                                        class="btn btn-primary btn-sm">{{ __('Hiện cột đã chọn') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@extends('layouts.admin')
@section('title', $isInsert ? __('Thêm danh mục') : __('Sửa danh mục'))

@section('scripts')
    <script>
        const urls = {
            editCategory: '{{ route('EditCategory', '') }}',
            deleteCategories: '{{ route('DeleteCategories') }}',
            createCategory: '{{ route('CreateCategory') }}',
            changeStatus: '{{ route('ChangeStatusOfCategory') }}',
        };
    </script>
    {!! Html::script('/js/modules/admin/categories-management/category-detail.js') !!}
@stop

@section('admin-content')
    <div class="app-main__inner">
        <div class="tab-content">
            <div class="main-card mb-3 card">
                <div class="card-body">
                    <h5 class="card-title">{{ $isInsert ? 'Thêm danh mục' : 'Sửa danh mục' }}</h5>
                    <form id="form-category" method="POST"
                        action="{{ $isInsert ? route('InsertCategory') : route('UpdateCategory', $category->id) }}">
                        <div class="form-row">
                            <div class="col-md-6">
                                <div class="position-relative form-group">
                                    <label for="name" class="">Tên danh mục</label>
                                    <input name="name" id="name" type="text" class="form-control"
                                        placeholder="Tên danh mục" value="{{ !$isInsert ? $category->name : '' }}">
                                    <input type="hidden" value="{{ $isInsert ? '0' : $category->id }}" id="id"
                                        name="id" />
                                    <input type="hidden" value="{{ csrf_token() }}" id="_token" name="_token" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="status" class="">Trạng thái</label>
                                <select id="status" class="form-control">
                                    @foreach ($status as $key => $val)
                                        <option value="{{ $key }}"
                                            @if (!$isInsert && $key == $category->status) selected="selected" @endif>
                                            {{ $val }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <button type="button" class="mt-2 btn btn-primary" id="btn-save">{{ __('Lưu') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

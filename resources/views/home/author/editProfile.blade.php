@extends('layouts.client')
@section('title', __('Tài khoản'))
@section('scripts')
    <script>
        const urls = {
            editProfile: '{{ route('EditProfile', '') }}',
        };
    </script>
    {!! Html::script('/js/modules/client/profile/profile.js') !!}
@stop
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row main_content">
                <div class="jlc-col-md-12 jl_smmain_con jl_smmain_full">
                    <div class="content_single_page jl_content post-7667 page type-page status-publish hentry">
                        <div class="woocommerce">
                            <div class="woocommerce-notices-wrapper"></div>
                            <h2>Thay đổi thông tin cá nhân</h2>
                            <form method="POST" class="woocommerce-form woocommerce-form-login login">
                                <input type="hidden" name="id" value="{{ $user['id'] }}" id="id">
                                <div class="d-flex jlc-col-md-12 mb-20">
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="name" type="text" placeholder="Tên" value="{{ $user['name'] }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="name"
                                            required autofocus>
                                    </p>
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pl-10">
                                        <input id="full_name" type="text" placeholder="Họ và tên"
                                            value="{{ $user['user_info']['full_name'] }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="full_name"
                                            required autofocus>
                                    </p>
                                </div>
                                <div class="d-flex jlc-col-md-12 mb-20">
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="email" type="email" placeholder="Email"
                                            value="{{ $user['email'] }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="email"
                                            required autofocus disabled>
                                    </p>
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <select id="gender" class="woocommerce-Input woocommerce-Input--text input-text"
                                            name="gender" required>
                                            @foreach ($gender as $key => $item)
                                                <option value="{{ $key }}"
                                                    {{ $user['user_info']['gender'] == $key ? 'selected' : '' }}>
                                                    {{ $item }}</option>
                                            @endforeach
                                        </select>
                                    </p>
                                </div>

                                <div class="d-flex jlc-col-md-12 mb-20">
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="phone" type="number" placeholder="Điện thoại"
                                            value="{{ $user['user_info']['phone'] }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="phone"
                                            autofocus>
                                    </p>
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="birthday" type="date" value="{{ $user['user_info']['birthday'] }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text date"
                                            name="birthday" autofocus>
                                    </p>
                                </div>

                                <p
                                    class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-12 mb-20">
                                    <input id="address_detail" type="text" placeholder="Địa chỉ"
                                        value="{{ $user['user_info']['address_detail'] }}"
                                        class="woocommerce-Input woocommerce-Input--text input-text" name="address_detail"
                                        autofocus>
                                </p>
                                <div class="d-flex jlc-col-md-12 mb-20">
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="facebook" type="text" placeholder="Facebook"
                                            value="{{ $user['user_info']['facebook'] != null ? $user['user_info']['facebook'] : '' }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="facebook"
                                            autofocus>
                                    </p>
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="youtube" type="text" placeholder="Twitter"
                                            value="{{ $user['user_info']['youtube'] != null ? $user['user_info']['youtube'] : '' }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text date" name="youtube"
                                            autofocus>
                                    </p>
                                </div>

                                <div class="d-flex jlc-col-md-12 mb-20">
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="instagram" type="text" placeholder="Instagram"
                                            value="{{ $user['user_info']['instagram'] != null ? $user['user_info']['instagram'] : '' }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text" name="instagram"
                                            required autofocus>
                                    </p>
                                    <p
                                        class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide jlc-col-md-6 pr-10">
                                        <input id="groupFB" type="text" placeholder="Group Facebook"
                                            value="{{ $user['user_info']['groupFB'] != null ? $user['user_info']['groupFB'] : '' }}"
                                            class="woocommerce-Input woocommerce-Input--text input-text date" name="groupFB"
                                            required autofocus>
                                    </p>
                                </div>

                                <p class="form-row mt-3 d-flex items-justified-center" style="margin-top: 16px">
                                    <button type="button" id="btn-save"
                                        class="woocommerce-button button woocommerce-form-login__submit wp-element-button"
                                        name="login" value="Lưu">Lưu</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

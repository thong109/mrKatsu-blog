@extends('layouts.client')
@section('title', __('Tài khoản'))
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row main_content">
                <div class="jlc-col-md-12 jl_smmain_con jl_smmain_full">
                    <div class="jl_breadcrumbs"> <span class="jl_item_bread">
                            <a href="../index.html">
                                Trang chủ </a>
                        </span>/
                        <span class="jl_item_bread">
                            Tài khoản </span>
                    </div>
                    <div class="content_single_page jl_content post-7667 page type-page status-publish hentry">
                        <div class="woocommerce">
                            <div class="woocommerce-notices-wrapper"></div>
                            <h2>Đăng nhập</h2>
                            @error('email')
                                <div class="woocommerce-notices-wrapper">
                                    <ul class="woocommerce-error" role="alert">
                                        <li>{{ $message }}</li>
                                    </ul>
                                </div>
                            @enderror
                            @error('password')
                                <div class="woocommerce-notices-wrapper">
                                    <ul class="woocommerce-error" role="alert">
                                        <li>{{ $message }}</li>
                                    </ul>
                                </div>
                            @enderror
                            <form method="POST" action="{{ route('login') }}"
                                class="woocommerce-form woocommerce-form-login login">
                                @csrf
                                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                    <label for="username">Tài khoản email<span class="required">*</span></label>
                                    <input id="email" type="email"
                                        class="woocommerce-Input woocommerce-Input--text input-text @error('email') is-invalid @enderror"
                                        name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                </p>
                                <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                    <label for="password">Mật khẩu<span class="required">*</span></label>
                                    <input id="password" type="password"
                                        class="woocommerce-Input woocommerce-Input--text input-text @error('password') is-invalid @enderror"
                                        name="password" required autocomplete="current-password">
                                </p>
                                <p class="form-row mt-3 d-flex align-items-center" style="margin-top: 16px">
                                    <span
                                        class="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember"
                                            {{ old('remember') ? 'checked' : '' }}>
                                        <span>Lưu tài khoản</span>
                                    </span>
                                    <button type="submit"
                                        class="woocommerce-button button woocommerce-form-login__submit wp-element-button"
                                        name="login" value="Đăng nhập">Đăng nhập</button>
                                </p>
                                <p class="woocommerce-LostPassword lost_password">
                                    @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            Quên mật khẩu ?
                                        </a>
                                    @endif
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@extends('layouts.client')
@section('title', __('Blogger'))
@section('content')
    <div class="jl_block_content">
        <div class="jlc-container">
            <div class="jlc-row main_content">
                <div class="jlc-col-md-12 jl_smmain_con jl_smmain_full">
                    <div class="jl_breadcrumbs"> <span class="jl_item_bread">
                            <a href="../../index.html">
                                Home </a>
                        </span>
                        <i class="jli-right-chevron"></i>
                        <span class="jl_item_bread">
                            My account </span>
                    </div>
                    <div class="jl_pc_sec_title">
                        <h1 class="jl_pc_sec_h">My account</h1>
                    </div>
                    <div class="content_single_page jl_content post-7667 page type-page status-publish hentry">
                        <div class="woocommerce">
                            <div class="woocommerce-notices-wrapper"></div>
                            @if (session('status'))
                                <div class="woocommerce-notices-wrapper">
                                    <ul class="woocommerce-error" role="alert">
                                        <li>{{ session('status') }}</li>
                                    </ul>

                                </div>
                            @endif
                            @error('email')
                                <div class="woocommerce-notices-wrapper">
                                    <ul class="woocommerce-error" role="alert">
                                        <li>{{ $message }}</li>
                                    </ul>
                                </div>
                            @enderror
                            <form method="post" class="woocommerce-ResetPassword lost_reset_password"
                                action="{{ route('password.email') }}">
                                @csrf
                                <p>Lost your password? Please enter your email address. You will receive a link
                                    to create a new password via email.</p>
                                <p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                                    <label for="user_login">Email address</label>
                                    <input id="email" type="email"
                                        class="woocommerce-Input woocommerce-Input--text input-text @error('email') is-invalid @enderror"
                                        name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                </p>
                                <div class="clear"></div>
                                <p class="woocommerce-form-row form-row">
                                    <button type="submit" class="woocommerce-Button button wp-element-button"
                                        value="Reset password">Reset password</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

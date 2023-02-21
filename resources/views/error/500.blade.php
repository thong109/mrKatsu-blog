@section('title', __('Server error'))

<section class="pt-breadcrumb">
    <div class="pt-bg-overley1 pt-opacity2" style="background-image: url('/imgs/main-home/26.jpg');"></div>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center">
                <h1 class="pt-breadcrumb-title">Error</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('Home') }}"><i
                                    class="fas fa-home mr-2"></i>Home</a></li>
                        <li class="breadcrumb-item text-white" aria-current="page">Error</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</section>
<section class="pt-section">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="pt-error-block">
                    <div class="pt-errot-text">500</div>
                    <h2>{{ __('SERVER ERROR') }}</h2>
                    <p>{{ __('Oops! Server have error, please try again.') }}</p>
                    @if (config('app.debug'))
                        <p>{{ $error }}</p>
                    @endif
                    <div class="pt-btn-block">
                        <div class="pt-btn-container">
                            <a href="{{ route('Home') }}" class="pt-button">
                                <div class="pt-button-block">
                                    <span class="pt-button-line-left"></span>
                                    <span class="pt-button-text">{{ __('Back to Home') }}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

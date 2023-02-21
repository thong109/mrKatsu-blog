<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Client\ErrorController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\PostController;
use App\Http\Controllers\Client\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$namespace = 'App\Modules\Controllers\Client';

Route::group(
    ['namespace' => $namespace, 'prefix' => 'error', 'middleware' => ['web']],
    function () {
        Route::get('', [ErrorController::class, 'serverError'])->name('ErrorIndex');
        Route::get('error', [ErrorController::class, 'serverError'])->name('ServerError');
        Route::get('500', [ErrorController::class, 'serverError'])->name('Error500');
        Route::get('404', [ErrorController::class, 'pageNotFound'])->name('Error404');
        Route::get('403', [ErrorController::class, 'accessDenied'])->name('Error403');
    }
);

$namespaceAdmin = 'App\Http\Controllers\Admin';

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('Home');
Route::get('/', [HomeController::class, 'index'])->name('/');
Route::get('post/{slug}', [PostController::class, 'postDetail'])->name('PostDetail');
Route::get('posts/admin/{id}', [PostController::class, 'postsByAdmin'])->name('PostsByAdmin');
Route::get('profile', [ProfileController::class, 'profile'])->name('Profile');
Route::get('profile/edit', [ProfileController::class, 'editProfile'])->name('EditProfile');
Route::post('profile/edit', [ProfileController::class, 'saveProfile'])->name('SaveProfile');

Route::group(
    ['namespace' => $namespaceAdmin, 'prefix' => 'admin', 'middleware' => ['auth', 'isAdmin']],
    function () {
        Route::get('dashboard', [AdminHomeController::class, 'index'])->name('Dashboard');
        Route::post('dashboard', [AdminHomeController::class, 'dashboard'])->name('DashboardFilter');
        Route::get('fetch-dashboard', [AdminHomeController::class, 'fetchDashboard'])->name('FetchDashboard');

        //Category
        Route::get('category', [CategoryController::class, 'listOfCategories'])->name('ListOfCategories');
        Route::get('category/create', [CategoryController::class, 'createCategory'])->name('CreateCategory');
        Route::post('category/create', [CategoryController::class, 'insertCategory'])->name('InsertCategory');
        Route::get('category/edit/{id}', [CategoryController::class, 'editCategory'])->name('EditCategory');
        Route::post('category/edit/{id}', [CategoryController::class, 'updateCategory'])->name('UpdateCategory');
        Route::post('category/change-status', [CategoryController::class, 'changeStatus'])->name('ChangeStatusOfCategory');
        Route::post('category/delete', [CategoryController::class, 'deleteCategories'])->name('DeleteCategories');
        //Blog
        Route::get('blog', [BlogController::class, 'listOfBlogs'])->name('ListOfBlogs');
        Route::get('blog/create', [BlogController::class, 'createBlog'])->name('CreateBlog');
        Route::post('blog/create', [BlogController::class, 'insertBlog'])->name('InsertBlog');
        Route::get('blog/edit/{id}', [BlogController::class, 'editBlog'])->name('EditBlog');
        Route::post('blog/edit/{id}', [BlogController::class, 'updateBlog'])->name('UpdateBlog');
        Route::post('blog/change-status', [BlogController::class, 'changeStatus'])->name('ChangeStatusOfBlog');
        Route::post('blog/delete', [BlogController::class, 'deleteBlogs'])->name('DeleteBlogs');
        Route::get('list-of-blogs',  [BlogController::class, 'fetchBlogs'])->name('FetchBlogs');
        //Ip
        Route::get('ip', [BlogController::class, 'listOfIp'])->name('Ip');
    }
);

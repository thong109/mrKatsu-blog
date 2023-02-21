<?php

namespace App\Providers;

use App\Commons\CodeMasters\BlogStatus;
use App\Commons\CodeMasters\CategoryStatus;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $owner = User::where('id', 1)->with('user_info')->first();
        $blogsView = Post::where('posts.deleted_at', null)
            ->leftJoin('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('categories', 'categories.id', '=', 'posts.category_id')
            ->select('posts.*', 'categories.name as nameCate', 'categories.slug as slugCate', 'users.name as author')
            ->where('posts.status', BlogStatus::PUBLISHED())
            ->limit(5)
            ->get();
        $categories = Category::where('deleted_at', null)->where('status', CategoryStatus::USING())->get();
        $tags = Tag::where('deleted_at', null)->get();

        View::share('OWNER', $owner);
        View::share('BLOGVIEW', $blogsView);
        View::share('CATEGORIES', $categories);
        View::share('TAGS', $tags);
        Paginator::defaultView('pagination.pagination');
    }
}

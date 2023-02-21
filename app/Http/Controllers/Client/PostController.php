<?php

namespace App\Http\Controllers\Client;

use App\Commons\CodeMasters\BlogStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Ip;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function postsByAdmin(Request $request, $id)
    {
        $keyword = "";
        if ($request['keyword']) {
            $keyword = $request['keyword'];
        }
        $getAuthor = User::with('user_info')->where('id', $id)->first();
        $query = Post::leftJoin('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('categories', 'categories.id', '=', 'posts.category_id')
            ->select('posts.*', 'categories.name as nameCate', 'categories.slug as slugCate', 'users.name as author')
            ->where('posts.status', BlogStatus::PUBLISHED())
            ->where('posts.created_by', $id);
        $getPostsByAdmin = $query->paginate(10);
        $countPosts = $query->count();
        return view('home.posts.postsByAdmin', compact('getPostsByAdmin', 'getAuthor', 'keyword', 'countPosts'));
    }

    public function getPostByCategory($slug)
    {
        $getPostByCategory = Category::where('slug', $slug)
            ->with('posts', function ($q) {
                $q->where('posts.deleted_at', null)
                    ->where('status', BlogStatus::PUBLISHED())
                    ->get();
            })
            ->where('categories.deleted_at', null)
            ->where('categories.status', 1)
            ->get();
        return view('home.category.getPostByCategory', compact('getPostByCategory'));
    }

    public function postDetail(Request $request, $slug)
    {
        $keyword = "";
        if ($request['keyword']) {
            $keyword = $request['keyword'];
        }
        $postDetail = Post::where('slug', $slug)
            ->with('tags')
            ->leftJoin('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('user_infos', 'users.id', '=', 'user_infos.id')
            ->select('posts.*', 'users.name as author', 'user_infos.avatar as avatar', 'user_infos.facebook as facebook', 'user_infos.instagram as instagram', 'user_infos.youtube as twitter')
            ->where('posts.deleted_at', null)
            ->where('posts.status', BlogStatus::PUBLISHED())
            ->first();
        if (!isset($postDetail) || empty($postDetail)) {
            return view('error.404');
        }

        $nextPostdId = Post::where('id', '>', $postDetail->id)->min('id');
        $nextPost = Post::where('id', $nextPostdId)->where('status', BlogStatus::PUBLISHED())->where('deleted_at', null)->first();
        $prePostdId = Post::where('id', '<', $postDetail->id)->max('id');
        $prePost = Post::where('id', $prePostdId)->where('status', BlogStatus::PUBLISHED())->where('deleted_at', null)->first();

        $relatedPost = Post::where('category_id', $postDetail['category_id'])
            ->whereNotIn('id', [$postDetail['id']])
            ->where('posts.deleted_at', null)
            ->where('posts.status', BlogStatus::PUBLISHED())
            ->limit(4)
            ->get();
        $postDetail->save();
        // Get Ip
        $getIp = Ip::where('ip', request()->ip())
            ->where('blog_id', $postDetail['id'])
            ->latest()
            ->first();
        if (isset($getIp)) {
            $getIp->date = Carbon::now()->toDateTimeString();
            $getIp->save();
            if ($getIp['date'] > $getIp['created_at']->addDay()) {
                $ip = new Ip();
                $ip->ip = request()->ip();
                $ip->blog_id = $postDetail->id;
                $ip->created_by = 0;
                $ip->save();
                return view('home.posts.detailPost', compact('postDetail', 'relatedPost', 'keyword', 'nextPost', 'prePost'));
            }
            return view('home.posts.detailPost', compact('postDetail', 'relatedPost', 'keyword', 'nextPost', 'prePost'));
        }
        $ip = new Ip();
        $ip->ip = request()->ip();
        $ip->blog_id = $postDetail->id;
        $ip->created_by = 0;
        $ip->save();

        return view('home.posts.detailPost', compact('postDetail', 'relatedPost', 'keyword', 'nextPost', 'prePost'));
    }
}

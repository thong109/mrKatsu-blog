<?php

namespace App\Http\Controllers\Admin;

use App\Commons\CodeMasters\AccountStatus;
use App\Commons\CodeMasters\BlogStatus;
use App\Http\Controllers\Controller;
use App\Models\Ip;
use App\Models\Keyword;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function fetchDashboard()
    {
        $times = Carbon::now()->format('m/Y');


        $keyword = Keyword::select('keyword', DB::raw('count(*) as total'))
            ->where(DB::raw('DATE_FORMAT(created_at, "%m/%Y")'), $times)
            ->groupBy('keyword')
            ->orderByDesc('total')
            ->first();
        $getKeyword = '';
        if (!is_null($keyword)) {
            $getKeyword = $keyword;
        }

        $getProduct = Ip::select('blog_id', DB::raw('count(*) as total'))
            ->where(DB::raw('DATE_FORMAT(created_at, "%m/%Y")'), $times)
            ->groupBy('blog_id')
            ->orderByDesc('total')
            ->first();
        $product = [];
        if (!is_null($getProduct)) {
            $product = Post::where('id', $getProduct['blog_id'])
                ->select('name', 'id', 'slug')
                ->first();
        }

        $query = Post::where('posts.deleted_at', null)
            ->where('posts.status', BlogStatus::PUBLISHED());
        $countPosts = $query->count();

        $totalPosts = $query
        ->where(DB::raw('DATE_FORMAT(posts.created_at, "%m/%Y")'), $times)
        ->count();

        $getPosts = $query->select(
            'users.name as author',
            'users.id as authorId',
            'user_infos.avatar as avatar',
            DB::raw('count(posts.created_by) as total'),
        )
            ->join('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('user_infos', 'user_infos.id', '=', 'users.id')
            ->where('users.status', AccountStatus::USING())
            ->where(DB::raw('DATE_FORMAT(posts.created_at, "%m/%Y")'), $times)
            ->groupBy('posts.created_by')
            ->get();

        return response()->json([
            'time' => $times,
            'keyword' => $getKeyword,
            'view' => $product,
            'PostByUser' => $getPosts,
            'totalPosts' => $totalPosts,
            'countPosts' => $countPosts
        ]);
    }

    public function dashboard(Request $request)
    {
        $data = $request->all();
        if (isset($data['dashboard'])) {
            $time = strtotime($data['dashboard']);
            $times = date('m/Y', $time);
        } else {
            $times = Carbon::now('Asia/Ho_Chi_Minh')->format('m/Y');
        }
        $getKeyword = Keyword::select('keyword', DB::raw('count(*) as total'))
            ->where(DB::raw('DATE_FORMAT(created_at, "%m/%Y")'), $times)
            ->groupBy('keyword')
            ->orderByDesc('total')
            ->first();
        $getProduct = Ip::select('blog_id', DB::raw('count(*) as total'))
            ->where(DB::raw('DATE_FORMAT(created_at, "%m/%Y")'), $times)
            ->groupBy('blog_id')
            ->orderByDesc('total')
            ->first();
        if (!isset($getKeyword)) {
            $getKeyword['keyword'] = null;
        }
        if (isset($getProduct)) {
            $product = Post::where('id', $getProduct['blog_id'])
                ->select('name', 'id', 'slug')
                ->first();
        } else {
            $product = [
                'slug' => null,
                'name' => null
            ];
        }

        $query = Post::where('posts.deleted_at', null)
            ->where('posts.status', BlogStatus::PUBLISHED());
        $countPosts = $query->count();
        $totalPosts = $query
            ->where(DB::raw('DATE_FORMAT(posts.created_at, "%m/%Y")'), $times)
            ->count();

        $getPosts = $query->select(
            'users.name as author',
            'users.id as authorId',
            'user_infos.avatar as avatar',
            DB::raw('count(posts.created_by) as total'),
        )
            ->join('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('user_infos', 'user_infos.id', '=', 'users.id')
            ->where('users.status', AccountStatus::USING())
            ->where(DB::raw('DATE_FORMAT(posts.created_at, "%m/%Y")'), $times)
            ->groupBy('posts.created_by')
            ->get();

        return response()->json([
            'time' => $times,
            'keyword' => $getKeyword,
            'view' => $product,
            'PostByUser' => $getPosts,
            'totalPosts' => $totalPosts,
            'countPosts' => $countPosts
        ]);
    }
}

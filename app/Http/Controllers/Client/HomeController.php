<?php

namespace App\Http\Controllers\Client;

use App\Commons\CodeMasters\AccountStatus;
use App\Commons\CodeMasters\BlogStatus;
use App\Commons\Constants;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Ip;
use App\Models\Keyword;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PHPUnit\TextUI\XmlConfiguration\Constant;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $keyword = "";
        if ($request['keyword']) {
            $keyword = $request['keyword'];
        }
        // Get Detail
        $query = Post::where('posts.deleted_at', null)
            ->leftJoin('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('categories', 'categories.id', '=', 'posts.category_id')
            ->select('posts.*', 'users.name as author', 'categories.name as nameCate', 'categories.slug as slugCate')
            ->where('posts.status', BlogStatus::PUBLISHED());

        if (isset($request['category'])) {
            $getCate = Category::where('slug', $request['category'])
                ->where('status', Constants::SHOW())
                ->where('deleted_at', null)
                ->first();
            $cateId = $getCate['id'];
            $query->where('posts.category_id', $cateId);
        }
        if (isset($request['keyword'])) {
            if ($request['keyword'] != '') {
                $key = new Keyword();
                $key->keyword = $request['keyword'];
                $key->created_by = 0;
                $key->save();
            }
            $query->where('posts.name', 'like', '%' . $request['keyword'] . '%');
        }

        if (isset($request['tag'])) {
            $query->leftJoin('tags', 'posts.id', '=', 'tags.blog_id')
                ->where('tags.keyword', 'like', '%' . $request['tag'] . '%');
        }

        $blogs = $query->paginate(Constants::BLOG_PAGINATE());
        return view('home.index', compact('blogs', 'keyword'));
    }
}

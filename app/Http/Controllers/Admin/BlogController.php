<?php

namespace App\Http\Controllers\Admin;

use App\Commons\CodeMasters\BlogStatus;
use App\Commons\CodeMasters\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Ip;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function listOfBlogs()
    {
        return view('admin.blog.listOfBlogs');
    }

    public function fetchBlogs()
    {
        $blogs = Post::where('posts.deleted_at', null)
            ->leftJoin('users', 'users.id', '=', 'posts.created_by')
            ->leftJoin('categories', 'categories.id', '=', 'posts.category_id')
            ->select('posts.*', 'users.name as author', 'categories.name as nameCate')
            ->get();
        return response()->json([
            'blogs' => $blogs
        ]);
    }

    public function editblog($id)
    {
        $blog = Post::where('id', $id)->where('deleted_at', null)->first();
        $status = BlogStatus::toArray();
        $isInsert = false;
        $tags = Tag::where('blog_id', $id)->where('deleted_at', null)->get();
        $categories = Category::where('deleted_at', null)->where('status', CategoryStatus::USING())->get();
        $arr = [];
        foreach ($tags as $tag) {
            array_push($arr, $tag->keyword);
        }
        $getTag = implode(",", $arr);
        return view('admin.blog.addblog', compact('isInsert', 'status', 'blog', 'categories', 'getTag'));
    }

    public function createblog(Request $request)
    {
        $status = BlogStatus::toArray();
        $isInsert = true;
        $categories = Category::where('deleted_at', null)->where('status', CategoryStatus::USING())->get();
        return view('admin.blog.addblog', compact('isInsert', 'status', 'categories'));
    }

    public function insertBlog(Request $request)
    {
        try {
            $data = $request->all();
            DB::beginTransaction();
            $blog = new Post();
            $blog->name = $data['name'];
            $blog->description = $data['description'];
            $blog->content = $data['content'];
            $blog->category_id = $data['category_id'];
            $blog->slug = SlugController::slugify($data['name']);
            $blog->status = $data['status'];
            $blog->created_by = Auth::id();
            $files = $data['image'];
            if ($files != "") {
                $fileImage = $files->getClientOriginalName();
                $nameImage = str_replace([' ', '-'], '_', current(explode('.', $fileImage)));
                $newImage = $nameImage . '-' . rand(0, 99) . '.' . $files->getClientOriginalExtension();
                $picture = '/imgs/blog-images/' . $newImage;
                $files->move(public_path('imgs/blog-images'), $newImage);
            }
            $blog->image = $picture;
            $blog->save();
            if (isset($data['keyword']) || !empty($data['keyword'])) {
                $tags = explode(',', $data['keyword']);
                foreach ($tags as $tag) {
                    $newTag = new Tag();
                    $newTag->keyword = $tag;
                    $newTag->blog_id = $blog->id;
                    $newTag->save();
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            dd($e);
            return [];
        }
        return response()->json([
            'data' => $blog,
            'code' => 200
        ]);
    }

    public function updateBlog(Request $request)
    {
        $data = $request->all();
        $blog = Post::where('id', $data['id'])->where('deleted_at', null)->first();
        if (!isset($blog) || empty($blog)) {
            return view('error.404');
        }
        DB::beginTransaction();
        $blog->name = $data['name'];
        $blog->description = $data['description'];
        $blog->content = $data['content'];
        $blog->category_id = $data['category_id'];
        $blog->slug = SlugController::slugify($data['name']);
        $blog->status = $data['status'];
        $blog->created_by = Auth::id();
        $oldImage = null;
        $files = $data['image'];
        if ($files != "") {
            $oldImage = public_path() . '/' . $blog->image;
            $fileImage = $files->getClientOriginalName();
            $nameImage = str_replace([' ', '-'], '_', current(explode('.', $fileImage)));
            $newImage = $nameImage . '-' . rand(0, 99) . '.' . $files->getClientOriginalExtension();
            $picture = '/imgs/blog-images/' . $newImage;
            $files->move(public_path('imgs/blog-images'), $newImage);
            $blog->image = $picture;
        }
        $blog->save();
        Tag::where('blog_id', $blog->id)->delete();
        if (isset($data['keyword']) || !empty($data['keyword'])) {
            $tags = explode(',', $data['keyword']);
            foreach ($tags as $tag) {
                $newTag = new Tag();
                $newTag->keyword = $tag;
                $newTag->blog_id = $blog->id;
                $newTag->save();
            }
        }
        DB::commit();
        if ($oldImage != null) {
            if (file_exists($oldImage)) {
                unlink($oldImage);
            }
        }

        return response()->json([
            'data' => $blog,
            'code' => 200
        ]);
    }

    public function deleteBlogs(Request $request)
    {
        $data = $request->all();
        $ids = $data['ids'];
        // delete blog
        $now = new DateTime(date('Y-m-d H:i:s'));
        $dataUpdate = [
            'deleted_at' => $now,
            'deleted_by' => Auth::id()
        ];
        DB::beginTransaction();
        Post::whereIn('id', $ids)->update($dataUpdate);
        Ip::whereIn('blog_id', $ids)->update($dataUpdate);
        Tag::whereIn('blog_id', $ids)->update($dataUpdate);
        DB::commit();
        //remove image of blog if deleted blog
        $blogs = Post::whereIn('id', $ids)->get();
        // unlink image
        foreach ($blogs as $blog) {
            if (isset($blog->image) || !empty($blog->image)) {
                $image = public_path() . '/' . $blog->image;
                if (isset($image) || !empty($image)) {
                    if (file_exists($image)) {
                        unlink($image);
                    }
                }
            }
        }
        return response()->json(['code' => 200]);
    }

    public function changeStatus(Request $request)
    {
        $data = $request->all();
        $ids = $data['ids'];
        $now = new DateTime(date('Y-m-d H:i:s'));
        $dataUpdate = [
            'updated_at' => $now,
            'updated_by' => Auth::id(),
            'status' => $data['status']
        ];
        DB::beginTransaction();
        Post::whereIn('id', $ids)->update($dataUpdate);
        DB::commit();
        return response()->json(['code' => 200]);
    }

    public function listOfIp()
    {
        $ips = Ip::get();
        return view('admin.ip.index', compact('ips'));
    }
}

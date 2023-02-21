<?php

namespace App\Http\Controllers\Client;

use App\Commons\CodeMasters\AccountStatus;
use App\Commons\CodeMasters\BlogStatus;
use App\Commons\CodeMasters\Gender;
use App\Commons\Constants;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Keyword;
use App\Models\Post;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile()
    {
        $posts = Post::where('created_by', Auth::id())->where('status', BlogStatus::PUBLISHED())->where('deleted_at', null)->paginate(6);
        $user = User::with('user_info')->where('id', Auth::id())->where('status', AccountStatus::USING())->first();
        return view('home.author.profile', compact('user', 'posts'));
    }

    public function editProfile()
    {
        $gender = Gender::toArray();
        $user = User::with('user_info')->where('id', Auth::id())->where('status', AccountStatus::USING())->first();
        return view('home.author.editProfile', compact('user', 'gender'));
    }

    public function saveProfile(Request $request)
    {
        $data = $request->all();
        $user = User::where('id', $data['id'])->first();
        $user->name = $data['name'];
        $user->save();

        $userInfo = UserInfo::where('id', $user['id'])->first();
        $userInfo->full_name = $data['full_name'];
        $userInfo->gender = $data['gender'];
        $userInfo->birthday = $data['birthday'];
        $userInfo->phone = $data['phone'];
        $userInfo->address_detail = $data['address_detail'];
        $userInfo->facebook = $data['facebook'];
        $userInfo->youtube = $data['youtube'];
        $userInfo->instagram = $data['instagram'];
        $userInfo->groupFB = $data['groupFB'];
        $userInfo->save();

        return response()->json(['code' => 200]);
    }
}

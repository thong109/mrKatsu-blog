<?php

namespace App\Http\Controllers\Admin;

use App\Commons\CodeMasters\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function listOfCategories()
    {
        $categories = Category::where('deleted_at', null)->get();
        return view('admin.category.listOfCategories', compact('categories'));
    }

    public function editCategory($id)
    {
        $category = Category::where('id', $id)->where('deleted_at', null)->first();
        $status = CategoryStatus::toArray();
        $isInsert = false;
        return view('admin.category.addCategory', compact('isInsert', 'status', 'category'));
    }

    public function createCategory(Request $request)
    {
        $status = CategoryStatus::toArray();
        $isInsert = true;
        return view('admin.category.addCategory', compact('isInsert', 'status'));
    }

    public function insertCategory(Request $request)
    {
        try {
            $data = $request->all();
            DB::beginTransaction();
            $category = new Category();
            $category->name = $data['name'];
            $category->slug = SlugController::slugify($data['name']);
            $category->status = $data['status'];
            $category->created_by = Auth::id();
            $category->save();
            DB::commit();
        } catch (\Exception $e) {
            return [];
        }
        return response()->json([
            'data' => $category,
            'code' => 200
        ]);
    }

    public function updateCategory(Request $request)
    {
        try {
            $data = $request->all();
            $category = Category::where('id', $data['id'])->where('deleted_at', null)->first();
            if (!isset($category) || empty($category)) {
                return view('error.404');
            }
            DB::beginTransaction();
            $category->name = $data['name'];
            $category->slug = SlugController::slugify($data['name']);
            $category->status = $data['status'];
            $category->save();
            DB::commit();
        } catch (\Exception $e) {
            return [];
        }
        return response()->json([
            'data' => $category,
            'code' => 200
        ]);
    }

    public function changeStatus(Request $request)
    {
        try {
            $data = $request->all();
            $categoryIds = Category::where('deleted_at', null)
                ->whereIn('id', $data['ids'])
                ->pluck('id')->toArray();
            $now = new DateTime(date('Y-m-d H:i:s'));
            DB::beginTransaction();
            Category::whereIn('id', $categoryIds)->update([
                'status' => $data['status'],
                'updated_at' => $now,
                'updated_by' => Auth::id()
            ]);
            DB::commit();
        } catch (\Exception $e) {
            throw $e;
        }
        return response()->json(['code' => 200]);
    }

    public function deleteCategories(Request $request)
    {
        try {
            $data = $request->all();
            $categoryIds = Category::where('deleted_at', null)
                ->whereIn('id', $data['ids'])
                ->pluck('id')->toArray();
            $now = new DateTime(date('Y-m-d H:i:s'));
            $dataUpdate = [
                'deleted_at' => $now,
                'deleted_by' => Auth::id()
            ];
            DB::beginTransaction();
            Category::whereIn('id', $categoryIds)->update($dataUpdate);
            DB::commit();
        } catch (\Exception $e) {
            throw $e;
        }
        return response()->json(['code' => 200]);
    }
}

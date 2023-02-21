<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public function categories()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function viewed()
    {
        return $this->belongsTo(Ip::class, 'id', 'blog_id');
    }
    public function tags()
    {
        return $this->hasMany(Tag::class, 'blog_id', 'id');
    }
}

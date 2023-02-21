<?php

namespace App\Commons\CodeMasters;

class BlogStatus
{
    private static $_DRAFT = 0;
    private static $_PUBLISHED = 1;
    public static function DRAFT()
    {
        return self::$_DRAFT;
    }
    public static function PUBLISHED()
    {
        return self::$_PUBLISHED;
    }
    public static function toArray()
    {
        return [
            self::$_DRAFT => __('Ẩn'),
            self::$_PUBLISHED => __('Hiện')
        ];
    }
}

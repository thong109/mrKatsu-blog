<?php

namespace App\Commons\CodeMasters;

class CategoryStatus
{
    private static $_BLOCK = 0;
    private static $_USING = 1;
    public static function BLOCK()
    {
        return self::$_BLOCK;
    }
    public static function USING()
    {
        return self::$_USING;
    }
    public static function toArray()
    {
        return [
            self::$_BLOCK => __('Ẩn'),
            self::$_USING => __('Hiện')
        ];
    }
}

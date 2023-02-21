<?php

namespace App\Commons\CodeMasters;

class CategoryStatus
{
    private static $_UNACTIVE = 0;
    private static $_ACTIVE = 1;

    public static function UNACTIVE()
    {
        return self::$_UNACTIVE;
    }
    public static function ACTIVE()
    {
        return self::$_ACTIVE;
    }

    public static function toArray()
    {
        return [
            self::$_UNACTIVE => __('Unactive'),
            self::$_ACTIVE => __('Active'),
        ];
    }
}

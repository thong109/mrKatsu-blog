<?php

namespace App\Commons\CodeMasters;

class VideoGender {
    private static $_ALL = 0;
    private static $_MALE = 10;
    private static $_FEMALE = 20;
    private static $_CHILDREN = 30;
    public static function ALL() {
        return self::$_ALL;
    }
    public static function MALE() {
        return self::$_MALE;
    }
    public static function FEMALE() {
        return self::$_FEMALE;
    }
    public static function CHILDREN() {
        return self::$_CHILDREN;
    }
    public static function toArray() {
        return [
            self::$_ALL => __('All'),
            self::$_MALE => __('Male'),
            self::$_FEMALE => __('Female'),
            self::$_CHILDREN => __('Children')
        ];
    }
}

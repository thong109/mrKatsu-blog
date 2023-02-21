<?php

namespace App\Commons\CodeMasters;

class VideoStatus {
    private static $_DRAFT = 10;
    private static $_PUBLISHED = 20;
    public static function DRAFT() {
        return self::$_DRAFT;
    }
    public static function PUBLISHED() {
        return self::$_PUBLISHED;
    }
    public static function toArray() {
        return [
            self::$_DRAFT => __('Draft'),
            self::$_PUBLISHED => __('Published')
        ];
    }
}

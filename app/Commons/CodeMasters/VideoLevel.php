<?php

namespace App\Commons\CodeMasters;

class VideoLevel {
    private static $_FREE = 0;
    private static $_STANDARD = 10;
    private static $_PROFESSIONAL = 20;

    public static function FREE() {
        return self::$_FREE;
    }
    public static function STANDARD() {
        return self::$_STANDARD;
    }
    public static function PROFESSIONAL() {
        return self::$_PROFESSIONAL;
    }

    public static function toArray() {
        return [
            self::$_FREE => __('Free'),
            self::$_STANDARD => __('Standard'),
            self::$_PROFESSIONAL => __('Professional')
        ];
    }
}

<?php

namespace App\Commons\CodeMasters;

class NotificationType {
    private static $_GENERAL = 10;
    public static function GENERAL() {
        return self::$_GENERAL;
    }
    public static function toArray() {
        return [
            self::$_GENERAL => __('General')
        ];
    }
}

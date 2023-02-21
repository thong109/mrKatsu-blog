<?php

namespace App\Commons\CodeMasters;

class AccountStatus {
    private static $_USING = 10;
    private static $_LOCK = 20;
    public static function USING() {
        return self::$_USING;
    }
    public static function LOCK() {
        return self::$_LOCK;
    }
    public static function toArray() {
        return [
            self::$_USING => __('Using'),
            self::$_LOCK => __('Locking')
        ];
    }
}

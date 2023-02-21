<?php

namespace App\Commons\CodeMasters;

class AccountType {
    private static $_PERSONAL = 10;
    private static $_COMPANY = 20;
    public static function PERSONAL() {
        return self::$_PERSONAL;
    }
    public static function COMPANY() {
        return self::$_COMPANY;
    }
    public static function toArray() {
        return [
            self::$_PERSONAL => __('Personal'),
            self::$_COMPANY => __('Company')
        ];
    }
}

<?php

namespace App\Commons\CodeMasters;

class Role {
    private static $_DEV = 'DEV';
    private static $_ADM = 'ADM';
    private static $_USER = 'USER';
    public static function DEV() {
        return self::$_DEV;
    }
    public static function ADM() {
        return self::$_ADM;
    }
    public static function USER() {
        return self::$_USER;
    }
    public static function toArray() {
        return [
            self::$_DEV => __('Developer'),
            self::$_ADM => __('Admin'),
            self::$_USER => __('User')
        ];
    }
}

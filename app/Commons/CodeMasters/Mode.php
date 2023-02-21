<?php

namespace App\Commons\CodeMasters;

class Mode {
    private static $_INSERT = 'I';
    private static $_UPDATE = 'U';
    public static function INSERT() {
        return self::$_INSERT;
    }
    public static function UPDATE() {
        return self::$_UPDATE;
    }
    public static function toArray() {
        return [
            self::$_INSERT => __('Insert'),
            self::$_UPDATE => __('Update')
        ];
    }
}

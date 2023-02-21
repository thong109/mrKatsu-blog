<?php

namespace App\Commons\CodeMasters;

class NotificationStatus {
    private static $_UNSENT = 10;
    private static $_SENDING = 20;
    private static $_ERROR = 30;
    private static $_UNREAD = 40;
    private static $_READ = 50;
    private static $_ARCHIVE = 60;

    public static function UNSENT() {
        return self::$_UNSENT;
    }
    public static function SENDING() {
        return self::$_SENDING;
    }
    public static function ERROR() {
        return self::$_ERROR;
    }
    public static function UNREAD() {
        return self::$_UNREAD;
    }
    public static function READ() {
        return self::$_READ;
    }
    public static function ARCHIVE() {
        return self::$_ARCHIVE;
    }

    public static function toArray() {
        return [
            self::$_UNSENT => __('Unsent'),
            self::$_SENDING => __('Sending'),
            self::$_ERROR => __('Error'),
            self::$_UNREAD => __('Unread'),
            self::$_READ => __('Read'),
            self::$_ARCHIVE => __('Archive'),
        ];
    }
}

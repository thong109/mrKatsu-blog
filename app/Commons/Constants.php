<?php

namespace App\Commons;

class Constants
{
    private static $_HIDDEN = 0;
    private static $_SHOW = 1;
    private static $_DEFAULT_AVATAR = '/imgs/user.jpg';
    private static $_DEFAULT_COVER = '/imgs/user.jpg';
    private static $_BLOG_LIMIT = 5;
    private static $_GALLERY_LIMIT = 8;
    private static $_CLIENTSAY_LIMIT = 5;
    private static $_TEAM_LIMIT = 5;
    private static $_PARTNER_LIMIT = 7;
    private static $_BLOG_PAGINATE = 10;
    private static $_VIDEO_PAGINATE = 5;
    private static $_CATEGORY_LIMIT = 5;
    private static $_VIDEO_PAGINATION = 6;
    public static function DEFAULT_AVATAR()
    {
        return self::$_DEFAULT_AVATAR;
    }
    public static function DEFAULT_COVER()
    {
        return self::$_DEFAULT_COVER;
    }
    public static function BLOG_LIMIT()
    {
        return self::$_BLOG_LIMIT;
    }
    public static function GALLERY_LIMIT()
    {
        return self::$_GALLERY_LIMIT;
    }
    public static function CLIENTSAY_LIMIT()
    {
        return self::$_CLIENTSAY_LIMIT;
    }
    public static function TEAM_LIMIT()
    {
        return self::$_TEAM_LIMIT;
    }
    public static function PARTNER_LIMIT()
    {
        return self::$_PARTNER_LIMIT;
    }
    public static function BLOG_PAGINATE()
    {
        return self::$_BLOG_PAGINATE;
    }
    public static function VIDEO_PAGINATE()
    {
        return self::$_VIDEO_PAGINATE;
    }
    public static function CATEGORY_LIMIT()
    {
        return self::$_CATEGORY_LIMIT;
    }
    public static function VIDEO_PAGINATION()
    {
        return self::$_VIDEO_PAGINATION;
    }
    public static function SHOW()
    {
        return self::$_SHOW;
    }
    public static function HIDDEN()
    {
        return self::$_HIDDEN;
    }
}

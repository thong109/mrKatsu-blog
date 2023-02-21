<?php

namespace App\Commons\CodeMasters;

class OptionKey {
    private static $_SITE_NAME = 'siteName';
    private static $_SITE_DESCRIPTION = 'siteDescription';
    private static $_SITE_KEYWORD = 'siteKeyword';
    private static $_OG_IMAGE = 'ogImage';
    private static $_AUTHOR = 'author';
    private static $_FACEBOOK_ID = 'facbookId';
    private static $_GOOGLE_ID = 'googleId';
    private static $_GOOGLE_SITE_VERIFICATION = 'googleSiteVerification';
    private static $_ADDRESS = 'address';
    private static $_PHONE_NUMBER = 'phoneNumber';
    private static $_EMAIL = 'email';
    private static $_LINK_FACEBOOK = 'linkFacebook';
    private static $_LINK_YOUTUBE = 'linkYoutube';
    private static $_LINK_MESSENGER = 'linkMessage';
    private static $_LINK_INSTAGRAM = 'linkInstagram';
    private static $_EMAIL_SETTING = 'emailSetting';
    private static $_CDN = 'cdn';
    private static $_VNPAY = 'vnPay';
    private static $_MOMO = 'momo';
    private static $_ONE_SIGNAL = 'oneSignal';

    public static function SITE_NAME() {
        return self::$_SITE_NAME;
    }
    public static function SITE_DESCRIPTION() {
        return self::$_SITE_DESCRIPTION;
    }
    public static function SITE_KEYWORD() {
        return self::$_SITE_KEYWORD;
    }
    public static function OG_IMAGE() {
        return self::$_OG_IMAGE;
    }
    public static function AUTHOR() {
        return self::$_AUTHOR;
    }
    public static function FACEBOOK_ID() {
        return self::$_FACEBOOK_ID;
    }
    public static function GOOGLE_ID() {
        return self::$_GOOGLE_ID;
    }
    public static function GOOGLE_SITE_VERIFICATION() {
        return self::$_GOOGLE_SITE_VERIFICATION;
    }
    public static function ADDRESS() {
        return self::$_ADDRESS;
    }
    public static function EMAIL() {
        return self::$_EMAIL;
    }
    public static function PHONE_NUMBER() {
        return self::$_PHONE_NUMBER;
    }
    public static function LINK_FACEBOOK() {
        return self::$_LINK_FACEBOOK;
    }
    public static function LINK_YOUTUBE() {
        return self::$_LINK_YOUTUBE;
    }
    public static function LINK_MESSENGER() {
        return self::$_LINK_MESSENGER;
    }
    public static function LINK_INSTAGRAM() {
        return self::$_LINK_INSTAGRAM;
    }
    public static function EMAIL_SETTING() {
        return self::$_EMAIL_SETTING;
    }
    public static function CDN() {
        return self::$_CDN;
    }
    public static function VNPAY() {
        return self::$_VNPAY;
    }
    public static function MOMO() {
        return self::$_MOMO;
    }
    public static function ONE_SIGNAL() {
        return self::$_ONE_SIGNAL;
    }
}

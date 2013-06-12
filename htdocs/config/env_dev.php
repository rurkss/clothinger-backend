<?php

ini_set( 'display_errors', 'On');

$strTemp = '/home/clw_dev/temp';
$strDataPath = '/home/clw_dev/data';
$strHost = 'http://dev.system.clothingwire.com';

return array(
    'base'             => '/',
    'base_static'      => '/',

    'bundle'           => 'file',
    'dbwrite_log' => $strTemp .'/dbwrite.log',
    
    'exceptions'       => array(
        'throw'     => 1,
        'on_errors' => 1,
//        'on_debug'  => 1,
        'html'      => 1,
//        'render'    => '501.html',
        'log'       => $strTemp.'/exception',
//      'mail'   => array(
//          'to'      => 'webcerebrium@gmail.com,artur.zheludkov@datasub.com',
//          'subject' => 'System.Billevkoff Test Exception',
//          'headers' => 'From: robot@webcerebrium.com',
//          'method'  => 'php-mailer',
//      ),
        "smtp" => array(
            "host" => "smtp.gmail.com",
            "port" => 465,
            "ssl" => "ssl",
            "username" => "robot@webcerebrium.com",
            "password" => ""
        )
        
    ),
    'tfpdf' => array(
        'fontpath' => $strDataPath . '/tfpdf/font',
        'fontcache' => $strDataPath . '/tfpdf/cache',
    ),   
    
    'display_time_generated' => 1,
    'display_build' => 1,
    
    'connections' => array(
        'default' => array(
            'read'   => 'DBx_Driver_Pdo_Mysql_Read',
            'write'  => 'DBx_Driver_Pdo_Mysql_Write',

            'cache'  => array(
                'class' => 'Sys_Cache_File',
                'options' => array(
                    'cache_dir' => $strTemp.'/dbcache',
                    'lifetime'  => 60*60*24*30,
                ),
            ),

            'params'   => array(
                'host'     => '127.0.0.1',
                'port'     => 3306,
                'username' => '',
                'password' => '',
                'dbname'   => 'dev_clothingwire',
                'driver_options' => array( 1002 => 'SET NAMES \'UTF8\' '),
                'profiler' => array( 
                    'enabled' => true, 
                    'class' => 'DBx_Profiler_WriteLog',
                ),
            ),
        ),
    ),
       
    'test' => array(
        'crawl' => $strHost,
        'token' => '/app/index/index/format/json', // JSON of where to get token value
        'group' => array(
            'debug'    => 'debug',
            // 'unit'     => 'unit',
            'ui-api'    => 'ui/api',
        )    
    ),       
    
    'php_settings' => array(
        'log_errors'  => 1,
        'error_log'   => $strTemp.'/error_log',
        'session.save_path'       => $strTemp,
        'session.gc_maxlifetime'  => 30*24*60*60,
        'session.cookie_lifetime' => 30*24*60*60,        
    ),
    'cache_dir' => $strTemp.'/cache',
    
   
);

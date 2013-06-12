<?php

// DO NOU DELETE! universal!
if ( getenv( 'CWA_TEMP_ROOT') )
    $strTempPath = getenv( 'CWA_TEMP_ROOT' ).'/clwsystem';
else if ( getenv( 'CWA_HOME' ) )  
    $strTempPath = getenv( 'CWA_HOME' ).'/temp/clwsystem';
else
    $strTempPath = '/home/'.trim( shell_exec( 'whoami' ) ).'/temp/clwsystem';

if ( getenv( 'CWA_DATA_ROOT') )
    $strDataPath = getenv( 'CWA_DATA_ROOT');
else if ( getenv( 'CWA_HOME' ) )  
    $strDataPath = getenv( 'CWA_HOME' ).'/data';
else 
    die( 'no /webapps/data path');
// die( $strDataPath );

// this is for test crawler
$strHostName = trim(shell_exec( 'hostname' ));
$strHost = 'http://system-clothingwire-com.'.$strHostName;

return array(
    'base'             => '/',
    'base_static'      => '/',
    
    'bundle'           => 'file',
    
    'exceptions'    => array(
        'throw'     => 1,
        'on_errors' => 1,
        'html'   => 1,
        'log'       => $strTempPath.'/exception',
//        
//        'mail'   => array(
//            'to'      => 'webcerebrium@gmail.com',
//            'subject' => 'System.Billevkoff Local Exception',
//            'headers' => 'From: robot@webcerebrium.com',
//            'method'  => 'php-mailer',
//        ),
//        "smtp" => array(
//            "host" => "smtp.gmail.com",
//            "port" => 465,
//            "ssl" => "ssl",
//            "username" => "robot@webcerebrium.com",
//            "password" => "hjjSm2bu"
//        )        
    ),

    'action_log' => $strTempPath .'/actions.log',
    'dbwrite_log' => $strTempPath .'/dbwrite.log',
    'display_time_generated' => 1,
    'display_build' => 1,

    'bl' => array(
        // path for CSV folder storage
        // path should be manually linked
        'csv_path' => $strTempPath .'/data',        
    ),
    
    

    'tfpdf' => array(
        'fontpath' => $strDataPath . '/tfpdf/font',
        'fontcache' => $strDataPath . '/tfpdf/cache',
    ),    
    
    'connections' => array(
        'default' => array(
            'read'   => 'DBx_Driver_Pdo_Mysql_Read',
            'write'  => 'DBx_Driver_Pdo_Mysql_Write',

            'cache'  => array(
                'class' => 'Sys_Cache_File',
                'options' => array(
                    'cache_dir' => $strTempPath . '/dbcache',
                    'lifetime'  => 60*60*24*30,
                ),
            ),

            'params'   => array(
                'host'     => '127.0.0.1',
                'port'     => 3306,
                'username' => 'root',
                'password' => '',
                'dbname'   => 'dev_clothingwire',
                'nocache'  => 1,
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
        'error_log'   => $strTempPath.'/error_log',
        'session.save_path'       => $strTempPath,
        'session.gc_maxlifetime'  => 30*24*60*60,
        'session.cookie_lifetime' => 30*24*60*60,        
    ),
    
    'cache_dir' => $strTempPath.'/blsystem',
    'temp_dir' => $strTempPath,   
    
    
);

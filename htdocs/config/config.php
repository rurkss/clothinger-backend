<?php

/*
 * this file contain components and plugins of the current application 
 */
return array(
    'env' => array(
        'system.clothingwire.com'       => 'production',
    ),

    'charset' => 'utf-8',

    // associative array of included classes namespaces: used for patches
    'namespaces' => array(
        'User', 'Lang', 'Option', 'ClwSystem'
    ),
    // default namespace
    'ns' => 'ClwSystem',

    'lang' => array(
        'list' => array( 'en' ),
        'default_lang' => 'en',
        'default_component' => 'app',
        'source' => 'null',
    ),
    'dateformat' => Sys_Date::US,

    // associative array binding(section -> theme)
    'sections' => array(
        ''         => array( 'bootstrap' ),
        'backend'  => array( 'bootstrap' ),
        //'frontend'     => array( 'bootstrap' )        
    ),

    'ctrlplugin' => array(
        'User_Auth_CtrlPlugin',
    ),

    'user' => array(
        // roles which will be created on patch
        'role' => array(
            'Administrator', // Super admin
            'Customer',     // Role for using customers interface
            'Application User',   // Role for using native applications (redfrod, reporting, etc. )
            
        ),
        // list of predefined roles (which permissions cannot be modified)
        'predefined' => array(
            'Administrator', 'Customer', 'Application User'
        ),
        // users which will be created on patch
        'list' => array( // users, created on installation
            array( 'login' => 'alex',     'password' => 'Qwerty11',  'roles' => array( 'Administrator' ) )            
        ),
        // list of resources
        'resource' => include 'resources.php',
        // administrative areas
        'area' => array ( // user areas
//            'apps' => array(
//                'theme' => array( 'bootstrap' ),
//                'section' => 'apps',
//                // ? or this could be overloader with CtrlPlugin  for this section
//                // 'require_login' => 1, 
//                // 'role_required' => 'Applications'
//            ),
//            'cli' => array(
//                'theme' => array( 'bootstrap' ),
//                'section' => 'cli',
//                'http'    => 0,
//                'https'   => 0,
//            ),
            
            '' => array(
                'theme' => array( 'bootstrap' ),
                'section' => 'backend',
                'require_login' => 1,
                //'role_forbidden' => 'Customer',
            ),
            
        ),
    ),
    'menu' => include 'menu.php',

    'default_section'         => 'backend',
    'default_controller'      => 'App_IndexCtrl',
    'default_renderer'        => 'Everzet_Jade_View',
    'default_layout_renderer' => 'Everzet_Jade_Layout',

    'export' => include 'export.php',
    
//    'documentation' => array(
//        
//        'namespaces' => array( 'BlSystem', 'BlRetailer' ),
//        // absolute paths where classes are located
//        'classpath'  => array( CWA_DIR_CLASSES.'/BlSystem', CWA_DIR_CLASSES.'/BlRetailer' ),
//        // absolute path where to place autogenerated index files
//        'indexpath'  => CWA_APPLICATION_DIR.'/static/docs/html',
//        // absolute path where static ( hand-written articles ) are located
//        'articlepath' => CWA_APPLICATION_DIR.'/static/docs/articles',
//        // http path for image root
//        'imgroot'    => '/static/docs/images',
//    ),
    
    // website specific routes:
    // DO NOT USE "default" route in any case!
    'routes' => array (
    
        'homepage' => array(
            'route' => '/',
            'defaults' => array( 'module' => 'app', 'controller' => 'index', 'action' => 'index' ),
        ),
//
//        'user-profile' => array(
//            'type' => 'regex',
//            'route' => '/profile/(\d+)$',
//            'defaults' => array( 'module' => 'user', 'controller' => 'account', 'action' => 'get' ),
//            'map' => array( 1 => 'ucac_id'),
//        ),
//        
//        array(
//            'route' => '/saved-reports',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'index' ),
//        ),
//        array(
//            'route' => '/my/saved-reports',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'index', 'my' => 1 ),
//        ),
//        array(
//            'route' => '/my/profile',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'index', 'action' => 'profile' ),
//        ),
//        
//        array(
//            // page to enter invitation code
//            'route' => '/zip',
//            'defaults' => array( 'module' => 'geocoder', 'controller' => 'index', 'action' => 'suggest', 'format' => 'json' ),
//        ),
//        
//        array(
//            'type' => 'regex',
//            'route' => '/wiki/(.+)$',
//            'defaults' => array( 'module' => 'app', 'controller' => 'doc-page', 'action' => 'get', 'layout' => 'blank' ),
//            'map' => array( 1 => 'page'),
//        ),
        
        
        // - - - - - - - - - - - - - - - - - - - - 
        // application api: start
//        array(            
//            'route' => '/apps/auth',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'auth', 'action' => 'index', 'section' => 'apps', 'format' => 'xml' )            
//        ),
//        array(            
//            'route' => '/apps/generate-report',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'redford-orderexp-range', 'action' => 'generate', 'section' => 'apps', 'format' => 'xml' )
//        ),
//        array(                        
//            'route' => '/apps/save-report',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'save', 'section' => 'apps', 'format' => 'xml' ),
//        ),
//        array(            
//            'route' => '/apps/get-report',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'get', 'section' => 'apps', 'format' => 'xml' ),
//        ),
//        array(            
//            'route' => '/apps/get-reports',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'getlist', 'section' => 'apps', 'format' => 'xml', 'join_user' => 1, "include_shared" => 1 ),
//        ),
//        array(
//            'route' => '/apps/delete-report',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report', 'action' => 'delete', 'section' => 'apps', 'format' => 'xml'),
//        ),
//        array(
//            'route' => '/apps/get-users',
//            'defaults' => array( 'module' => 'user', 'controller' => 'account', 'action' => 'getlist', 'section' => 'apps', 'format' => 'xml', 'ucac_status' => 1),
//        ),
//        array(
//            'route' => '/apps/share-report',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report-access', 'action' => 'edit', 'section' => 'apps', 'format' => 'xml'),
//        ),
//        array(
//            'route' => '/apps/share-report-remove',
//            'defaults' => array( 'module' => 'bl-system', 'controller' => 'user-report-access', 'action' => 'delete', 'section' => 'apps', 'format' => 'xml'),
//        ),
        // application api: end
    ),
        
);

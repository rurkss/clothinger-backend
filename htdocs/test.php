<?php  

    define( 'CWA_APPLICATION_DIR', realpath( dirname( __FILE__ ) ));
    if ( getenv('CWA_CLASS_ROOT') )
        define( 'CWA_DIR_CLASSES', getenv('CWA_CLASS_ROOT') );
    else
        define( 'CWA_DIR_CLASSES', CWA_APPLICATION_DIR.'/classes' );

    require_once CWA_DIR_CLASSES . '/App/model/Loader.php';
    cwa_init_web_application();
    cwa_test_web_application();
    
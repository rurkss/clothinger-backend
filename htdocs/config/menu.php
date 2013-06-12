<?php

$arrMenu = array();

$arrMenu['Administrator'] = array(
    
    array('url' => '/clw-system/service/index',
        'title' => '<i class="icon-user"></i> Service list',
        'perm' => 'Service/service.view'),

    array('url' => '/clw-system/advertiser/index',
        'title' => '<i class="icon-user"></i> Vendor list',
        'perm' => 'Advertiser/advertiser.view')
);

$arrMenu['Categories'] = array(

    array('url' => '/clw-system/category/index',
        'title' => '<i class="icon-user"></i> Category list',
        'perm' => 'Category/category.view'),
    
    array('url' => '/clw-system/catproduction/index',
        'title' => '<i class="icon-user"></i> Category Production list',
        'perm' => 'Catproduction/catproduction.view')
);

$arrMenu['Product'] = array(

    array('url' => '/clw-system/product/index',
        'title' => '<i class="icon-user"></i> Products list',
        'perm' => 'Product/product.view')
);



return $arrMenu;
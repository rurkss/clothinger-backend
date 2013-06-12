#!/usr/bin/env node
// WARNING: LINUX-only WATCHER !!!
var strCurrentDir = process.cwd();
var strProject = 'ClwSystem';
    
var Inotify = require('inotify').Inotify;
var inotify = new Inotify(); //persistent by default, new Inotify(false) //no persistent
var sys = require('util');
var exec = require('child_process').exec;



//var dir2 = { path:     strCurrentDir + '/less', // <--- change this for a valid directory in your machine
//	watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( strProject + ': Recompiling CSS...' + d.toLocaleString() );
//
//        exec("cd " + strCurrentDir +"/less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir2 );
//
//var dir3 = { path:     strCurrentDir +  '/less/style', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling CSS... From - /style ' + d.toLocaleString() );
//        exec("cd " + strCurrentDir +"/less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir3 );
//
//var dir4 = { path:    strCurrentDir +  '/js/style', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling Style JS bundle... ' + d.toLocaleString() );
//        exec("cd " + strCurrentDir +"/js; node bundle-js.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir4 );
//
//
//var dir5 = { path:    strCurrentDir + '/js/style/tab', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling Style JS (tab( bundle... ' + d.toLocaleString() );
//        exec("cd  " + strCurrentDir +"/js; node bundle-js.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir5 );
//
//var dir6 = { path:    strCurrentDir + '/less/customer', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling CSS... From - /customer ' + d.toLocaleString() );
//        exec("cd  " + strCurrentDir +"/less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir6 );
//
//var dir7 = { path:   strCurrentDir +  '/less/master', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling CSS... From - /master ' + d.toLocaleString() );
//        exec("cd  " + strCurrentDir +"/less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir7 );
//
//var dir8 = { path:   strCurrentDir + '/less/order', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling CSS... From - /order ' + d.toLocaleString() );
//        exec("cd  " + strCurrentDir +"/less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//inotify.addWatch( dir8 );
//
//var dir9 = { path:      './less/company', // <--- change this for a valid directory in your machine
//    watch_for: Inotify.IN_CLOSE_WRITE | Inotify.IN_DELETE,
//    callback:  function(event) {
//        var d = new Date();
//        console.log( 'Recompiling CSS... From - /company ' + d.toLocaleString() );
//        exec("cd less; node bundle-css.js", function (error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr); });
//    }
//};
//
//inotify.addWatch( dir9 );
//
//
//console.log( strProject + ": watcher started, " + strCurrentDir );

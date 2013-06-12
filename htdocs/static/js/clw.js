var clw = {
    init : function() {
        $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
        clw.console();
        clw.scrollTop();
    }
    ,
    loading : function() {
        return  "<div style='text-align:center'><img src='"+app.base + "/static/clw/images/ajax-loader.gif' alt='please wati while loading' /></div>";
    }
    ,
    reload : function() {
        window.location.reload()
    }
    , scrollTop : function() {
        $("html,body").animate({scrollTop: 0});
    }
    , scrollTo : function( selector )
    {
        $('html,body').animate({
            scrollTop: $( selector ).offset().top + 'px'
        }, 'fast');
    }
    ,
    nothing : function() {}
    ,
    uc : function() {
        alert( "Under Contruction");
        return false;
    }
    ,
    alert : function(strMessage, title, callback )  {
        alert( strMessage );
        if ( undefined !== callback ) callback();
    }
    ,
    confirm : function(strMessage, callback )  {
        var r = confirm( strMessage );
        if ( undefined !== callback ) callback(r);
    },

    console: function(){
        if (!window.console) {
            window.console = {};
        }
        // union of Chrome, FF, IE, and Safari console methods
        var m = [
        "log", "info", "warn", "error", "debug", "trace", "dir", "group",
        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
        ];
        // define undefined methods as noops to prevent errors
        for (var i = 0; i < m.length; i++) {
            if (!window.console[m[i]]) {
                window.console[m[i]] = function() {};
            }
        }
    }
}

clw.skin = {
    choose : function( strSkin ) {
        $.get( app.base + "/clw-system/index/skin-choose", {
            "skin" : strSkin
        }, clw.reload );
        return false;
    }
}

clw.functions = {

    strPad : function(input, pad_length, pad_string, pad_type){

        var output = input.toString();
        if (!pad_string) {
            pad_string = "";
        }
        if (pad_type === undefined) {
            pad_type = "STR_PAD_RIGHT";
        }
        if (pad_type == "STR_PAD_RIGHT") {
            while (output.length < pad_length) {
                output = output + pad_string;
            }
        } else if (pad_type == "STR_PAD_LEFT") {
            while (output.length < pad_length) {
                output = pad_string + output;
            }
        } else if (pad_type == "STR_PAD_BOTH") {
            var j = 0;
            while (output.length < pad_length) {
                if (j % 2) {
                    output = output + pad_string;
                } else {
                    output = pad_string + output;
                }
                j++;
            }
        }
        return output;
    },

    ucfirst: function( str )
    {
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1, str.length-1);
    },

     urldecode: function(str) {
        return decodeURIComponent((str+'').replace(/\+/g, '%20'));
    }
}

clw.shortcut = {
    list : {},

    init : function() {
        if ( typeof(Mousetrap) != "object" ){
            return;
        }
        if (typeof(Mousetrap.bindGlobal) != "function"){
            return;
        }

        for( var key in clw.shortcut.list ) {
            // shortcuts[n].event
            Mousetrap.bindGlobal( key, function(e, key ) {
                var path = clw.shortcut.list[ key ];
                if ( path.indexOf( "javascript:") != -1 ) {
                    var sCall = path.substr( 11 );
                    if ( sCall != "" ) eval( sCall );
                } else {
                    location.href = path;
                }
            } );
        }
    }
}

clw.rowset = function( options ) {
    // Unique name of the rowset
    // each row should have ID (name)-ID
    this.o = options;
    // TODO: check for mandatory fields
    me = this;

    this.e = this.o.events;

    /*
     * actionMode needs to detect on submit action, which action is in use
     */
    this.actionMode = '';

    this.init = function() {
        
        me.bind();
        me.recalc();

        me.shortcut();

        if(typeof(me.e.init) == "function"){
            me.e.init();
        }

        if (me.o.add.selector)
            $(me.o.add.selector).hide();
        if (me.o.edit.selector)
            $(me.o.edit.selector).hide();


        if(me.o.add.mode == "modal"){
            $(me.o.add.selector).on("shown", function(){
                if( me.o.editable[0] != undefined ){
                    var el = $(me.o.add.selector).find('[name=' + me.o.editable[0] + ']').focus();
                }

            });

            $(me.o.add.selector).on("hidden", function(){

                $( me.o.add.selector ).removeClass("edit-mode");

                if(typeof(me.e.onhide) == "function"){
                    me.e.onhide();
                }

                for(var nIndex in me.o.editable){
                    var el = $(me.o.add.selector).find('[name=' + me.o.editable[nIndex] + ']');
                    if( el.length > 0 ){
                        el.val("");
                    }
                }
            });
        }

        if(typeof(me.o.ignore_hash) == "boolean" && me.o.ignore_hash == true){
            return;
        }

        var url = document.location.toString();

        if (url.match('#')) {
            var arrHash = url.split('#');
            var strParams;
            //var strParams = arrHash[1].replace(/\&/g, "/").replace(/\=/g, "/");
            var strHash = decodeURIComponent($.trim(arrHash[1]).replace(/\+/g, '%20'));
            var arrParams = arrHash[1].split("&");
            var newQueryString = [];
            if( arrParams.length > 0 ){
                for(var i=0; i<arrParams.length; i++){
                    var keyVal = arrParams[i].split("=");
                    if(keyVal.length > 0){
                        newQueryString.push( keyVal[0] + "=" + encodeURIComponent(keyVal[1]) );
                    }
                }
            }
            if( newQueryString.length > 0 ){
                strParams = newQueryString.join("&").replace(/\&/g, "/").replace(/\=/g, "/");
            }else{
                strParams = arrHash[1].replace(/\&/g, "/").replace(/\=/g, "/");
            }
            me.refresh(strParams, "custom");
        }
    }

    this.shortcut = function(){

        if( typeof(Mousetrap) != "object" ){
            return;
        }

        if(typeof(Mousetrap.bindGlobal) != "function"){
            return;
        }

        Mousetrap.bindGlobal("enter", function() {

            if( $("div.modal").length > 0 && $("div.modal").is(":visible")){
                $("div.modal").find("button.btn-submit").click();
                document.activeElement.blur();
            }else if( $("tr.edit-mode").length > 0 ){
                $("tr.edit-mode").find("button.btn-submit").click();

                document.activeElement.blur();
            }
        });

        Mousetrap.bindGlobal("esc", function() {
            if( $("div.modal").length > 0 && $("div.modal").is(":visible")){
                $("div.modal").modal('hide');
            }else if( $("tr.edit-mode").length > 0 ){
                setTimeout(function(){
                    $("tr.edit-mode").find("button.btn-cancel").click();
                    document.activeElement.blur();
                }, 500);
            }
        });

        /**
        * ADD Line
        */
        if(me.o.add.mode == "modal"){

            Mousetrap.bind(["n", "shift+n"], function() {
                if( $("div.modal").length > 0 && !$("div.modal").is(":visible") ){
                    $("a.btn-add").click();
                }
            });

        }

        /**
         * filters
         */

        if( $(document).find("ul.breadcrumb" + ">" + "li").find("a.filter").length > 0 ){
            Mousetrap.bind(["f", "shift+f"], function() {
                if( $(document).find("ul.breadcrumb" + ">" + "li").find("a.filter").is(":visible") ){
                    $(document).find("ul.breadcrumb" + ">" + "li").find("a.filter").click();
                }
            });
        }

        if(me.o.edit.mode == "inline"){

            if( 0 && me.o.edit.arrows == true){

                Mousetrap.bindGlobal("up", function(e) {
                    //                    if(e.currentTarget.activeElement.nodeName == "SELECT"){
                    //                        return;
                    //                    }

                    if( $("tr.edit-mode").length > 0 ){

                        var elemRow = $("table").find("tr.edit-mode");
                        var prev = $(elemRow).prev();
                        $(elemRow).find("button.btn-submit").click();

                        if( prev.length > 0){
                            $(prev).find("button.btn-edit").click();
                        }


                    }
                })

                Mousetrap.bind("e", function() {

                    if( $("div.modal").length > 0 && !$("div.modal").is(":visible")){

                        if( $("tr.edit-mode").length > 0 ){

                            var elemRow = $("table").find("tr.edit-mode");
                            var elemRows = $("table").find("tr:first-child");
                            $(elemRow).find("button.btn-submit").click();

                            if( elemRows.length > 0){
                                $(elemRows[0]).find("button.btn-edit").click();
                            }
                        }else{
                            var elemButtons = $("table").find("tr:first-child").find("button.btn-edit");
                            if(elemButtons.length > 0){
                                $(elemButtons[0]).click();
                            }
                        }
                    }
                })

                Mousetrap.bindGlobal("down", function(e) {

                    //                    if(e.currentTarget.activeElement.nodeName == "SELECT"){
                    //                        return;
                    //                    }

                    if( $("tr.edit-mode").length > 0 ){

                        var elemRow = $("tr.edit-mode")
                        var next = $(elemRow).next();
                        $(elemRow).find("button.btn-submit").click();

                        if( next.length > 0){
                            $(next).find("button.btn-edit").click();
                        }
                    }
                })
            }
        }


    }

    // handler to show add-form
    this.add = function() {
        //console.info( "starting add dialog");
console.warn(me.e);
        me.actionMode = 'add';
        switch ( me.o.add.mode ) {
            case "modal":
                // By default bootstrap modal popup doesn't need javascript
                // Npthing here.
                if(typeof(me.e.onadd) == "function" ){
                    me.e.onadd();
                }
                break;
            case "inline":
                //TODO:
                break;
            case "form":
                //TODO:
                break;
        }
    }
    // handler to show edit-form
    this.edit = function() {

        //        var f = me.o.name.charAt(0).toUpperCase();
        //        var placeHolder = f + me.o.name.substr(1);

        me.actionMode = "edit";

        switch ( me.o.edit.mode ) {
            case "modal":

                var elemRow = $( this ).closest("tr");
                var elemId = elemRow.attr( "id" );
                if ( elemId ) {
                    var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );
                    if ( rowId ) {
                        $.getJSON ( me.o.path + "get/format/json/" + me.o.primary + "/" + rowId, function( r ){

                            var modal = $( me.o.edit.selector );
                            if( r.errors == null ){

                                for(nIndex in me.o.editable){
                                    if(r[me.o.editable[nIndex]] != undefined){
                                        var editField = modal.find('[name=' + me.o.editable[nIndex] + ']');
                                        if( editField.length > 0 ){
                                            var v = r[me.o.editable[nIndex]];
                                            if(editField.is("input[type='checkbox']")){
                                                if(v == 1){
                                                    editField.attr('checked', true);
                                                }else{
                                                    editField.attr('checked', false);
                                                }
                                            }else{
                                                editField.val(v)
                                            }
                                            editField.val( v );
                                        }
                                    }
                                }

                                var primaryInput = modal.find("input[name=" + me.o.primary + "]");
                                if( primaryInput.length > 0 ){
                                    primaryInput.val(rowId);
                                }else{
                                    modal.append("<input type='hidden' name=" + me.o.primary + " value='" + rowId + "'>");
                                }


                                if(typeof(me.e.edit) == "object" && typeof(me.e.edit.onedit) == "function" ){
                                    me.e.edit.onedit( r );
                                }

                                $( me.o.edit.selector ).addClass("edit-mode");
                                $(me.o.edit.selector).modal('show')


                            }
                        })
                    }
                }

                break;
            case "inline":

                console.log( "edit-inline");

                var elemTable = $( '.table' );
                if ( elemTable.length ) {
                    var elemRow = $(this).closest('tr');
                    var elemId = elemRow.attr( "id" );
                    if ( elemId ) {
                        var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );
                        if ( rowId ) {
                            $.getJSON ( me.o.path + "edit/format/json/" + me.o.primary + "/" + rowId, function(data){

                                console.log( "edit-inline-response");
                                console.log( data );

                                for(nIndex in me.o.editable){
                                    if(data[me.o.editable[nIndex]] != undefined){
                                        var editField = elemRow.find('[name=' + me.o.editable[nIndex] + ']');
                                        if( editField.length > 0 ){
                                            editField.val( data[me.o.editable[nIndex]] );

                                            if(nIndex == 0){
                                                var focusInput = editField;
                                                setTimeout(function(){
                                                    editField.focus();
                                                }, 500, focusInput);
                                            }
                                        }
                                    }
                                }

                                if(typeof(me.e.onrender) == "function"){
                                    me.e.onrender( data );
                                }

                                elemTable.addClass('edit-mode');
                                elemRow.addClass('edit-mode');
                            } );
                        }
                    }
                }

                break;

            case "form":
                //TODO:
                break;

            case "link": {
                var elemTable = $( '.table' );
                if ( elemTable.length ) {
                    var elemRow = $(this).closest('tr');
                    var elemId = elemRow.attr( "id" );
                    if ( elemId ) {
                        var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );

                        var template = me.o.edit.template == undefined ? "" : "/template/" + me.o.edit.template;
                        var hash = me.o.edit.hash == undefined ? "" : me.o.edit.hash;
                        var url = me.o.path + "get/" + me.o.primary + "/" + rowId + template + hash;
                        window.location.href = url;
                    }
                }
                break;
            }

        }
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }

    }

    // (re-)bind all event handlers again for the interface
    this.bind = function() {

        // mapping the buttons
        var map = {
            ".btn-add"    : me.add
            ,
            ".btn-remove" : me.remove
            ,
            ".btn-edit"   : me.edit
            ,
            ".btn-submit" : me.submit
            ,
            ".btn-cancel" : me.cancel
            ,
            ".btn-as-csv" : me.csv
            ,
            ".btn-as-pdf" : me.pdf
            ,
            ".btn-remove-confirm" : me.confirm
            ,
            ".btn-confirmed" : me.confirmed
        }
        for ( var s in map ) {
            $( me.o.selector + ' ' + s ).die('click').live( 'click', map[s] );
            console.log($( me.o.selector + ' ' + s ))
            
        }

        //
        // binding double editing start on a double click - if enabled
        //
        if ( me.o.edit.dblclick ) {

            $('table.table:not(.edit-mode)').find('tbody tr').die('dblclick').live('dblclick', function(e){
               $( this ).find(".btn-edit").click();
            });
        }

        //
        // binding sorting routines to a table header rows
        //
        $(".i").each(function(){
            $( this ).unbind('click').bind("click", function(){
                $(this).closest("tr").find("th").find("span").each(function(){
                    $( this ).removeClass("active");
                });

                $(".table").removeClass("edit-mode");
                $(".table").find("tr").each(function(){
                    $( this ).removeClass("edit-mode");
                });
                if( $( this ).is(".sort-asc") ){
                    $(this).parent().addClass("active");
                    me.refresh('dir/asc/sort/' + $( this ).attr("data-field") + "/", "sort" );
                }else if( $( this ).is(".sort-desc") ){
                    $(this).parent().addClass("active");
                    me.refresh('dir/desc/sort/' + $( this ).attr("data-field") + "/", "sort" );
                }
            })
        })

        // binding cancelling event on clicking outside of the working area
        // during editing mode
        // commented out 13/03/22
//        $(me.o.selector).die('click').live("click", function( e ){
//            if( $("table.table").hasClass("edit-mode")
//                && !$(e.target).is("button")
//                && !$(e.target).is("a")
//                && $(e.target).closest("a").length == 0
//                && !$(e.target).is("input")
//                && !$(e.target).is("label")
//                && !$(e.target).is("select")
//                && !$(e.target).is("option")
//                && !$(e.target).is("checkbox")
//                && !$(e.target).is("radio")
//                && !$(e.target).is("i")
//                ){
//                console.info("normalize data in table");
//
//                if(typeof(me.e.cancel) == "function"){
//                    me.e.cancel();
//                }
//
//                $(".table").find("tr:not(.hidden)").slice(1).each(function(){
//                    var c = $( this ).find(".btn-cancel:visible");
//                    if(c.length > 0 ){
//                        c.click();
//                        return false;
//                    }
//                });
//            }
//        });

        me.pagination();
    }

    this.pagination = function(){
        var lis = $(".pagination").find("ul").find("li:not(.disabled)");

        if( lis.length > 0 ){
            $(lis).each(function(){
                var a = $( this ).find("a");
                a.unbind('click').bind("click", function(e){
                    e.preventDefault();

                    // var paging =
                    if( $(".pagination").find("select.inputbox:visible").length > 0 ){
                        $(".pagination").find("select.inputbox").change(function(){

                            });
                    }

                    me.refresh( $( this ).attr("href"), "paging" );
                })
            })
        }
    },

    this.error = function( el, error ){
        if(error == undefined){
            error = "Required field.";
        }

        var cgroup = el.closest(".control-group");
        if ( cgroup.length ) {
            cgroup.addClass("error");

            // @TODO:how to add named messages?
        } else {
            // if there was no group, add error to the input/select directly
            el.addClass("error").focus( function() {
                // remove error on next focus...
                $(this).removeClass("error");
            })
        }

        if( cgroup.find("span.help-inline").length > 0 ){
            return;
        }
        $('.error-line' ,".modal-footer").remove();
        $(".modal-footer").prepend('<span class="help-inline error-line" style="color:red; font-size: 20px; display:block; float:left;">' + error + '</span>');

        $(".help-inline").animate({
            opacity: 0.25,
            height: 'fadeOut'
        }, 3000, function() {
            $(".control-group").removeClass("error");
            $( this ).remove();
            el.focus();
        });
    },

    // handler to recalc iterators and hide table if the last item was deleted
    this.recalc = function() {
        var nIterator = 1,
        el = $( me.o.selector ).find( '.iterator' );

        if ( $( me.o.selector + ' .csv-url' ).length ) {
            $('a.btn.btn-as-csv')
            .attr( "target",   "_blank" )
            .attr( "href",  $( me.o.selector + ' .csv-url' ).html() );
        }
        if ( $( me.o.selector + ' .pdf-url' ).length ) {
            $('a.btn.btn-as-pdf')
            .attr( "target",   "_blank" )
            .attr( "href",  $( me.o.selector + ' .pdf-url' ).html() );
        }

        var paging = $("#page-paging").text();
        var results = $("#page-results").text();

        if( paging.length > 0 && results.length > 0 ){

            var p = parseInt( paging.replace("page/", "") );
            var rs = parseInt( results.replace("results/", "") );

            p -= 1;
            if( p > 0){
                nIterator = p*rs;
                nIterator += 1;
            }

        }

        el.each( function() {
            $(this).html( nIterator + "." );
            nIterator++;
        });
        if ( el.length == 0 ) {
            // hide table if there are no rows
            $( me.o.selector + ' table.table' ).hide();
        } else {
            // show table )
            $( me.o.selector + ' table.table' ).show();
        }

        if(typeof(me.e.onrecalc) == "function"){
            me.e.onrecalc();
        }
    // TODO: hilight here current sorting mode
    // TODO: could be hidden only without filter mode, in filter mode
    }

    this.current_confirm = null;

    this.confirm = function(){
        if($("#modal-delete-confirm").length == 0){
            me.remove(this)
        }
        me.current_confirm = this;
        if( me.o.confirm != undefined ){
            $("#modal-delete-confirm").find("p.text").text(me.o.confirm);
        }

        $("#modal-delete-confirm").modal("show");
    }

    this.confirmed = function(){
        $("#modal-delete-confirm").modal("hide");

        me.remove(me.current_confirm);
    }

    // handler to remove record ??
    this.remove = function(obj) {

        if($(obj).hasClass("btn-remove-confirm")){
            var elemRow = $( obj ).closest( 'tr' );
        }else{
            var elemRow = $( this ).closest( 'tr' );
        }

        if ( elemRow.length ) {
            var elemId = elemRow.attr( "id" );
            if ( elemId ) {
                var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );
                if ( rowId ) {
                    elemRow.addClass('deleted');
                    elemRow.animate({
                        opacity: 0.25,
                        height: 'toggle'
                    }, 500, function() {
                        var sibling1 = elemRow.next();
                        var sibling2 = elemRow.prev();
                        elemRow.remove();
                        if( sibling1.length == 0 && sibling2.length == 0 ){

                            var p = $("#page-paging");

                            if(p.length > 0){
                                var pg = p.text().replace("page/", "");
                                if( parseInt(pg) > 1 ){
                                    var page = parseInt(pg) - 1;
                                    $("#page-paging").text("page/" + page);
                                    me.refresh("", "paging");
                                }
                            }
                        }
                        me.recalc();
                    });
                    $.getJSON ( me.o.path + "delete/" + me.o.primary + "/" + rowId, function(){
                        if(typeof(me.e.onremove) == "function"){
                            me.e.onremove();
                        }
                    } );
                }
            }
        }
    }

    this.validate = function( ){
        var bValid = true;

        console.warn( "validate" + me.actionMode );

        //Validation for inline block
        if ( me.actionMode == 'edit' ) {
            if ( 'validate' in me.o.edit ) {
                if ( me.o.edit.validate == true ) {
                    if ( 'validation' in me.o.edit ) {
                        //TODO WARN: need refactored
                        $.each( me.o.edit.validation, function( key, value ) {
                            var elem = $(me.o.edit.selector + " " + '[name=' + key + '].' + me.actionMode + ':visible');
                            console.log( key );
                            console.log( elem );
                            //debugger;
                            switch ( value ){
                                case "required":

                                    //debugger;
                                    //For all checkboxes by name

                                    if( $(elem).size() > 1 && $(elem).eq(0).is('input[type="checkbox"]') ) {

                                        var onceItem = false;
                                        $(elem).each(function(){
                                            if ( $(this).is(':checked') ) {
                                                onceItem = true;
                                            }
                                        });

                                        if ( onceItem == false ) {
                                            console.log( $(elem).eq(0) );
                                            //debugger;
                                            me.error( $(elem).eq(0) );
                                            bValid = false;
                                            return false;
                                        }

                                    }

                                    if($.trim(elem.val()) == ""){
                                        me.error( elem );
                                        bValid = false;
                                        return false;
                                    }

                                    break;


                            }
                        } );
                    }
                }
            }
        }

        $.each(me.o.validation, function(k,v){

            //if($.inArray(k, me.o.editable) != "-1" ){

            var selector  = "";
            if ( me.actionMode == 'add' ) {
                selector = me.o.add.selector;
            } else {
                selector = me.o.edit.selector;
            }

            var elem = $( selector + " " + "[name=" + k + "]:visible");

            console.log( "each.me.o.validation" );
            console.log( selector );
            if( $(elem).length > 0){
                if( typeof(v) == "object" ){

                    switch( v.rule ){
                        case "elem_or_elem":
                            if(v.elems.length > 0){
                                var arrVals = [];
                                for( var n in v.elems){
                                    if($(selector + " " + "[name=" + v.elems[n] + "]:visible").val() != ""){
                                        arrVals.push($(selector + " " + "[name=" + v.elems[n] + "]:visible").val());
                                    }
                                }

                                if(arrVals.length == 0){
                                    for( var n in v.elems){
                                        var elem2= $(selector + " " + "[name=" + v.elems[n] + "]:visible").closest(".control-group");
                                        elem2.closest(".control-group").addClass("error");
                                    }
                                    me.error( elem2, "At least one field should be filled up." );
                                    bValid = false;
                                    //return false;
                                }
                            }
                            break;
                    }
                }else{
                    var el;
                    switch ( v ){
                        case "required": {

                            //debugger;
                            //For all checkboxes by name

                            if( $(elem).size() > 1 && $(elem).eq(0).is('input[type="checkbox"]') ) {

                                var onceItem = false;
                                $(elem).each(function(){
                                    if ( $(this).is(':checked') ) {
                                        onceItem = true;
                                    }
                                });

                                if ( onceItem == false ) {
                                    //debugger;
                                    console.log( "checkbox?" );
                                    console.log( $(elem).eq(0) );
                                    me.error( $(elem).eq(0) );
                                    bValid = false;
                                    //return false;
                                }

                            }
                            if (  $(elem).size() > 1 && $(elem).eq(0).is("textarea") ){
                                if($.trim($(elem).eq(($(elem).size()-1)).val()) == ""){

                                    console.log( "textarea" );
                                    console.log( elem );

                                    me.error( elem );
                                    bValid = false;
                                    //return false;
                                }
                            } else {
                                if($.trim(elem.val()) == ""){

                                    console.log( "lastly" );
                                    console.log( elem );

                                    me.error( elem );
                                    bValid = false;
                                    //return false;
                                }
                            }

                            break;
                        }
                        case "price": {

                            el = $.trim(elem.val());

                            if (el != "") {
                                el = parseFloat(el);
                                if (! (/^\d*(?:\.\d{0,2})?$/.test(el)) ) {
                                    me.error( elem, "Fields must be price value." );
                                    bValid = false;
                                    //return false;
                                }
                            }
                            break;
                        }
                        case "number_more_than_zero_int" : {
                            if( isNaN(parseInt(elem.val())) || parseInt(elem.val()) == 0 ){
                                me.error( elem, "Field must have numeric value more than 0." );
                                bValid = false;
                                //return false;
                            }
                            break;
                        }
                        case "email": {
                            el = $.trim(elem.val());

                            if (el == "") {
                                me.error( elem, "\""+el+"\" is not a valid email address" );
                                bValid = false;
                                //return false;
                            }
                            var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
                            if( !pattern.test(el)){
                                me.error( elem, "\""+el+"\" is not a valid email address" );
                                bValid = false;
                                //return false;
                            }
                            break;
                        }
                        case "email_if_exists": {
                            el = $.trim(elem.val());

                            if (el != "") {
                                var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
                                if( !pattern.test(el)){
                                    me.error( elem, "\""+el+"\" is not a valid email address" );
                                    bValid = false;
                                    //return false;
                                }
                            }
                            break;
                        }
                        case 'url':
                            el = $.trim(elem.val());

                            if (el != "") {
                                var pattern = new RegExp(/^(ftp|http|https):\/\/[A-Za-z0-9\.-]{1,}\.[A-Za-z]{2}/ );
                                if( !pattern.test(el)){
                                    me.error( elem, "\""+el+"\" is not a valid website address" );
                                    bValid = false;
                                    //return false;
                                }
                            }
                            break;
                        case "date":
                            el = $.trim(elem.val());
                            if (el != "") {
                                var comp = el.split('/');
                                var m = parseInt(comp[0], 10);
                                var d = parseInt(comp[1], 10);
                                var y = parseInt(comp[2], 10);
                                var date = new Date(y,m-1,d);
                                if (date.getFullYear() != y || date.getMonth() + 1 != m || date.getDate() != d) {
                                    me.error( elem, "\""+el+"\" is not a valid date." );
                                    bValid = false;
                                }
                            }
                            break;
                    }
                }
            }
        });

        if (bValid == true) {
            if (typeof(me.e) == "object" && typeof(me.e.onvalidate) == "function" ){
                bValid = me.e.onvalidate();
            }
        }
        
        return bValid;


    }

    //
    // handler to submit data that was edited or added
    //
    this.submit = function() {

        //cleaning up...
        $(".error").removeClass( "error");

        var data = {};

        // do not continue if client side validation was not passed
        if(me.o.validation != undefined && !me.validate()){
            return;
        }

        // collect values from editable controls
        if ( me.o.editable ) {
            for(nIndex in me.o.editable){
                // add me.o.edit.selector + " " + ?

                var elem = null;
                if (  me.actionMode == 'edit' ) {
                    elem = $(me.o.edit.selector + " " + "[name=" + me.o.editable[nIndex] + "]:visible");
                } else if (  me.actionMode == 'add' ) {
                    elem = $(me.o.add.selector + " " + "[name=" + me.o.editable[nIndex] + "]:visible");
                }
                var v;
                if(elem.is("input[type='checkbox']")){
                    if ( $(elem).is(':checked') ) {
                        v = 1;
                    }else{
                        v = 0;
                    }
                }else{
                    v = $(elem).val();
                }
                data[me.o.editable[nIndex]] = v;
            }
        }

        //
        // adding additionally collected data
        //
        if( typeof(me.e.data) == "object" && typeof(me.e.data.collect) == "function"){
            $.extend(data, me.e.data.collect());
        }


        switch ( me.actionMode ) {
            case 'edit':

                switch( me.o.edit.mode ){
                    case 'inline':
                        var elemTable = $( '.table' );
                        if ( elemTable.length ) {
                            var elemRow = $(this).closest('tr');
                            var elemId = elemRow.attr( "id" );
                            if ( elemId ) {
                                var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );
                                if ( rowId ) {

                                    data = {};
                                    data[me.o.primary] = rowId;

                                    for(nIndex in me.o.editable){
                                        // no selector here - we are in Row context
                                        var el = elemRow.find("[name=" + me.o.editable[nIndex] + "]");
                                        if( el.length > 0 && el.is(":visible") ){
                                            data[me.o.editable[nIndex]] = el.val();
                                        }
                                    }

                                    $.ajax( {
                                        url      : me.o.path + 'edit/format/json',
                                        type     : 'POST',
                                        dataType : 'json',
                                        data     :  data,
                                        success  :  function( r ){

                                            console.log( "submit-edit-inline-response" );
                                            console.log( r );

                                            if( r.errors && r.errors.length > 0 ){
                                                console.log( "submit-edit-inline-response-errors" );
                                                console.log( r.errors );

                                                for( nIndex in r.errors ){
                                                    for(key in r.errors[nIndex]){
                                                        console.log( "submit-edit-inline-response-error-" + key );
                                                        console.log( key  );
                                                        console.log( r.errors[nIndex][key]  );
                                                        me.error(elemRow.find("[name=" + key + "]"), r.errors[nIndex][key] );
                                                    }
                                                }
                                                return;
                                            }

                                            elemRow.addClass('saved');
                                            elemTable.removeClass('edit-mode');
                                            elemRow.removeClass('edit-mode');

                                            for( nIndex in me.o.editable ){
                                                var el = elemRow.find("[name=" + me.o.editable[nIndex] + "]");
                                                if( r[me.o.editable[nIndex]] != undefined && el.length > 0){
                                                    var elemCell = el.closest("td");
                                                    elemCell.find("span.edit-hidden").text( r[me.o.editable[nIndex]] );
                                                }
                                            }

                                            if(typeof(me.e.onsubmit) == "function"){
                                                console.log( "submit-edit-inline-onsubmit");
                                                me.e.onsubmit( r );
                                            }

                                            var t = setTimeout(function(){
                                                elemRow.removeClass('saved');
                                            }, 100, elemRow);

                                            delete t;

                                        }
                                    } );
                                }
                            }
                        }

                        break;
                    case 'modal':
                        data[me.o.primary] = $(me.o.edit.selector).find("input[name=" + me.o.primary + "]").val();

                        var selector = me.o.edit.selector;

                        $.post( me.o.path + 'edit/format/json'  , data,
                            function( r ){
                                console.log( "submit-edit-modal-response" );
                                console.log( r );

                                if( r.errors && r.errors.length > 0 ){

                                    console.log( "submit-edit-modal-response-errors" );
                                    console.log( r.errors );

                                    for( nIndex in r.errors ){
                                        for(key in r.errors[nIndex]){
                                            me.error($(selector + " [name=" + key + "]"), r.errors[nIndex][key] );
                                        }
                                    }
                                    if(typeof(me.e.onerror) == "function"){
                                        me.e.onerror( r );
                                    }
                                    return;
                                }
                                if(typeof(me.e.edit) == "object" &&  typeof(me.e.edit.onsubmit) == "function"){
                                    console.log( "submit-edit-modal-onsubmit");
                                    me.e.edit.onsubmit( r );
                                }

                                $( me.o.edit.selector ).removeClass("edit-mode");
                                $( me.o.edit.selector ).modal('hide');


                                if( r[me.o.primary] != undefined ){
                                    var elemRow = $(".table").find("#" + me.o.name + "-"  + r[me.o.primary] );
                                    if( elemRow.length > 0 ){
                                        elemRow.addClass('saved');

                                        var t = setTimeout(function(){
                                            elemRow.removeClass('saved');
                                        }, 1000, elemRow);
                                    }
                                }


                                delete t;
                            }, "json")


                        break;
                    case 'form':
                        //TODO:
                        break;
                }

                break;

            case 'add':

                switch( me.o.add.mode ){
                    case 'inline':
                        //TODO:
                        break;
                    case 'modal':
                        console.log( "submit-add-modal" );
                        console.log( data );
                        $.post( me.o.path + 'edit/format/json/', data ,  function( r ) {

                            console.log( "submit-add-modal-response" );
                            console.log( r );

                            if( r.errors && r.errors.length > 0 ){

                                console.log( "submit-add-modal-response-errors" );
                                console.log( r.errors );

                                for( nIndex in r.errors ){
                                    for(key in r.errors[nIndex]){
                                        me.error($(me.o.add.selector).find("[name=" + key + "]"), r.errors[nIndex][key] );
                                    }
                                }
                                if(typeof(me.e.onerror) == "function"){
                                    me.e.onerror( r );
                                }
                                return;
                            }

                            me.refresh("", "current");
                            $(me.o.add.selector).modal('hide');


                            if(typeof(me.e.add) == "object" &&  typeof(me.e.add.onsubmit) == "function"){
                                console.log( "submit-add-modal-onsubmit" );
                                me.e.add.onsubmit( r );
                            }

                        }, 'json');
                        break;
                    case 'form':
                        //TODO:
                        break;
                }

                break;
        }

    }
    // handler to cancel add or edit mode??
    // TODO: different modes
    this.cancel = function() {

        // validation cleanup....
        $(".error").removeClass( "error");

        console.info('clw.cancel');
        me.editMode = "";

        var elemTable = $( '.table' );
        var elemRow = $( this ).closest( 'tr' );

        if ( elemRow.length ) {
            var elemId = elemRow.attr( "id" );
            if ( elemId ) {
                var rowId = elemId.replace( me.o.name, "" ).replace( "-", "" );
                if ( rowId ) {
                    $.getJSON ( me.o.path + "edit/format/json/" + me.o.primary + "/" + rowId, function( r ){

                        for( nIndex in me.o.editable ){
                            var el = elemRow.find("[name=" + me.o.editable[nIndex] + "]");
                            if( r[me.o.editable[nIndex]] != undefined && el.length > 0){
                                var elemCell = el.closest("td");
                                elemCell.find("span.edit-hidden").text( r[me.o.editable[nIndex]] );
                            }
                        }

                        if(typeof(me.e.oncancel) == "function"){
                            console.info('clw.e.oncancel');
                            me.e.oncancel( r );
                        }

                        elemTable.removeClass('edit-mode');
                        elemRow.removeClass('edit-mode');


                    } );
                }
            }
        }
    }

    this.refresh = function(params, type){



        switch(type){
            case "sort":

                if( $("#page-params").text().length > 0 ){
                    params += $("#page-params").text() + "/" ;
                }

                if( $("#page-results").text().length > 0 ){
                    params += $("#page-results").text() + "/";
                }

                break;
            case "paging":

                if($("#page-params").text().length > 0){
                    params +=  $("#page-params").text() + "/";
                }

                if( $("#page-results").text().length > 0 ){
                    params += $("#page-results").text() + "/";
                }

                break;

            case "filter":
                //                if( $("#page-paging").text().length > 0 ){
                //                    params += $("#page-paging").text() + "/";
                //                }

                if( $("#page-sorting").text().length > 0 ){
                    params += $("#page-sorting").text() + "/";
                }

                //                if( $("#page-params").text().length > 0 ){
                //                    params += $("#page-params").text() + "/";
                //                }

                if( $("#page-results").text().length > 0 ){
                    params += $("#page-results").text() + "/";
                }
                break;

            case "custom":
                /**
                 * nothing to to with params, just pass them with no others
                 */
                break;

            default:

                if( $("#page-paging").text().length > 0 ){
                    params += $("#page-paging").text() + "/";
                }

                if( $("#page-sorting").text().length > 0 ){
                    params += $("#page-sorting").text() + "/";
                }

                if( $("#page-params").text().length > 0 ){
                    params += $("#page-params").text() + "/";
                }

                if( $("#page-results").text().length > 0 ){
                    params += $("#page-results").text() + "/";
                }

                break;
        }

        var template = "tr";

        if(typeof(me.o.template) != "undefined"){
            template = me.o.template;
        }
        var url = me.o.path + 'getlist/template/'+template+'/';

        var d = me.paramsToObject(params);

        /**
         * For example, "current" type is used for adding new Row in table, refresh may be without any params
         */
        if($.isEmptyObject( d ) && type != "current" ){
            return;
        }

        if(typeof(me.o.ignore_hash) != "boolean" || me.o.ignore_hash == false){
            this.setHash(d);
            this.setFilter(d);
        }


	$.xhrPool.abortAll();

        $.post( url, d,  function( result ) {
            $(me.o.selector).find('table.table tbody').remove();
            $(me.o.selector).find('table.table').append(result);
            me.recalc();
            me.pagination();

            if(typeof(me.e.onrefresh) == "function"){
                me.e.onrefresh();
            }

        }, 'html');

    },

    this.paramsToObject = function( params )
    {
        var d = {};
        var arrParams = params.split("/");
        var length = arrParams.length;
        var pairs = Math.ceil(length/2);

        for(var n = 0; n<pairs; n++){
            var key = n*2;
            var k = arrParams[key];
            var next = key+1;
            var val = arrParams[next];

            if(k != "" ){
                d[k] = decodeURIComponent($.trim(val).replace(/\+/g, '%20'));
            }
        }

        return d;
    },

    this.setHash = function( o )
    {
        var hash = [];
        $.each(o, function(index, value){
            if(value != ""){
                hash.push(index + "=" + value)
            }
        })

        var strHash = hash.join( "&" );

        if(strHash != ""){
            window.location.hash = strHash;
        }
    }

    this.setFilter = function(params)
    {

        if( typeof(me.o.filter) == "object" && typeof(me.o.filter.fields_name) == "object" && $(me.o.selector).find("ul.breadcrumb") ){

            var arrTarget = [];
            $.each(params, function(index, val){
                val = clw.functions.urldecode(val);
                if( val != "" && me.o.filter.fields_name[index] != undefined ){

                    var elem = $(me.o.selector).find("form.form-filter").find("[name='"+index+"']");

                    if(elem.is("select") ){
                        arrTarget.push(me.o.filter.fields_name[index] + ": " + $(elem).find("option[value='"+val+"']").text());
                    }else{
                        arrTarget.push(me.o.filter.fields_name[index] + ": " + val);
                    }

                    elem.val(val);
                }
            })

            $(me.o.selector).find("ul.breadcrumb").find("li:not(.active)").remove();

            if( arrTarget.length > 0 ){
                $(me.o.selector).find("ul.breadcrumb").find("li.active" + ">" + "a").text(arrTarget.join(", "));
                $(me.o.selector).find("ul.breadcrumb").prepend('<li><a href="'+me.o.filter.default_path+'">'+me.o.filter.name+'</a><span class="divider">&#47;</span></li>');
            }else{
                $(me.o.selector).find("ul.breadcrumb").find("li.active" + ">" + "a").text(me.o.filter.name);
            }
        }
    },

    // handler to open current rowset as CSV
    this.csv = function() {
        if ( $( me.o.selector + ' .csv-url' ).length ) {
        //window.open( $( me.o.selector + ' .csv-url' ).html());
        }
    }
    // handler to open current rowset as PDF
    this.pdf = function() {
        if ( $( me.o.selector + ' .pdf-url' ).length ) {
        //window.open( $( me.o.selector + ' .pdf-url' ).html());
        }
    }

    if ( this.o.autostart ) {        
        $(document).ready( me.init );
    }
};

clw.helper = {

    fraction_control : function( config ) {

        var me = this;

        me.name = "fraction_control";

        me.selector = ".fraction-control";

        me.obj_helper = null;

        me.target_selector = null;

        me.target_selector = config.target_selector;

        me.parent_selector = config.parent_selector;

        me.o = config.o;

        if(typeof(me.o) == "object" && typeof(me.o.helper) == "object" && typeof(me.o.helper[me.name]) == "object"){
            me.obj_helper = me.o.helper[me.name];
        }

        this.apply = function( o ){

            var sub = $.trim($(o).find("sub").text());
            var sup = $.trim($(o).find("sup").text());
            var title = $.trim($(o).attr("title"));
            var datavalue = $.trim($(o).attr("data-value"));
            var blockToChange = $(o).closest(me.target_selector);

            var html = "<sup>" + sup + "</sup>/<sub>" + sub + "</sub>";
            if(sub == ""){
                html = "0";
            }

            $(blockToChange).attr("data-value", datavalue);
            $(blockToChange).attr("title", title);
            $(blockToChange).html( html );

        }

        this.bind = function(){

            $(me.parent_selector).find(me.target_selector).bind("click", function(e){

                if($(e.target).hasClass("row-fract") || $(e.target).parent().hasClass("row-fract")){
                    me.apply( $(e.target).closest(".fract") );
                    $(this).closest(me.target_selector).click();
                }

                if( $(this).find(me.selector).length > 0 ){

                    if( me.obj_helper != null
                        && typeof(me.obj_helper) == "object"
                        && typeof(me.obj_helper.onclose) == "function" ){
                        me.obj_helper.onclose( $(this).closest(me.target_selector) );
                    }

                    $(me.parent_selector).find(me.target_selector).find(me.selector).remove();

                }else{

                    $(me.parent_selector).find(me.target_selector).find(me.selector).remove();
                    
                    var html = $(me.parent_selector).find(me.selector).clone();

                    $(this).append(html);

                    var datavalue = $(this).attr("data-value") == "" ? 0 : $(this).attr("data-value");
                    $(this).find(".fract").each(function(){
                        if($(this).find("span").hasClass("disabled")){
                            $(this).find("span").removeClass("disabled");
                        }

                        if($(this).attr("data-value") == datavalue){
                            $(this).find("span").addClass("disabled");
                        }
                    })
                }


            })

            if( me.obj_helper != null
                && typeof(me.obj_helper) == "object"
                && typeof(me.obj_helper.onbind) == "function" ){
                me.obj_helper.onbind();
            }

        }
    }
}

var jcarouselConfig = {};


clw.jcarousel = function(){

    this.init = function(){
        $(".jcarousel").jcarousel(jcarouselConfig);
    }


};

$.xhrPool = [];

$.xhrPool.abortAll = function() {
	//debugger;
	$(this).each(function(idx, jqXHR) {
		jqXHR.abort();
	});
	$.xhrPool.length = 0
};

$.ajaxSetup({
	beforeSend: function(jqXHR) {

		$.xhrPool.push(jqXHR);
	},
	complete: function(jqXHR) {
		var index = $.xhrPool.indexOf(jqXHR);
		if (index > -1) {
			$.xhrPool.splice(index, 1);
		}
	}
});


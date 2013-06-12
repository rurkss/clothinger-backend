var cfgFilterForm  = {
        show : function() {
            $( "ul.breadcrumb" ).hide();
            $(".form-filter").show();

        }
        ,
        hide : function() {
            $( "ul.breadcrumb" ).show();
            $(".form-filter").hide();
            clw.category.refresh("", "filter");
        }
        ,
        submit : function( obj ) {
            //debugger;
            var params = "";
            for( var nIndex in clw.category.o.filter.fields ){
                var fInput = $(clw.category.o.filter.selector).find("[name=" + clw.category.o.filter.fields[nIndex] + "]");
                if( fInput.length > 0 && fInput.val()>0){
                    params += clw.category.o.filter.fields[nIndex] + "/" + encodeURI(fInput.val()) + "/";
                }
            }
            params += 'productcount/1/'
            clw.category.refresh(params, "filter");
            return false;
        }
}

clw.category = new clw.rowset( {
    name  : "category"
    // whether to initialize editor on doc ready
    ,
    autostart : false
    // Path for server-side controllers (excluding action name)
    ,
    path     : app.base + "/clw-system/category/"
    // Selector of top container
    ,
    selector : "body.category-editor"
    // primary key
    ,
    primary  : "c_id"
    // list of editable fields
    ,
    editable : ["c_name"]
    ,
    validation : {
      a_name : "required"
    },
    filter:{
        name : "All Categories",

        default_path :  "/clw-system/category/index",

        fields : [ "c_a_id", "cwp_id"],
        fields_name : {
            "c_a_id" : "Vendor",
            "cwp_id" : "Production Category"
        },
        selector : ".form-filter"
    },
    pager : 50,

    add : {
        // Mode of adding new record: form | inline | modal
        mode     : "modal"
        // Form selector, in case of modal - dialog ID
        ,
        selector : "#category-modal"
    // title of a modal box (detected by .title)
    }
    ,
    edit : {
        // Mode of editing: form | inline | modal
        mode     : "modal"
        // Form selector
        ,
        selector : "#category-modal"
        // Whether edit form opens on double click
        ,
        dblclick : true
        // Where Up and Down will switch current record (works for inline mode)
        ,
        arrows   : true
    }
    // custom handlers (could be accessed at bl.label.e.* )
    ,

    events : {        
        edit: {
            onedit:function(r){

                $.post( app.base + '/clw-system/category/getchecked/format/json/c_id/'+r.c_id, {}, function(arrcheck){

                        $.each( $("#category-modal").find("input[name='cwpr_cwp_id[]']"), function(){
                            $(this).attr('checked', false);
                        })
                        for (var i in arrcheck) {
                            $.each( $("#category-modal").find("input[name='cwpr_cwp_id[]']"), function(){
                                if(arrcheck[i].cwpr_cwp_id == $(this).val()){
                                    $(this).attr('checked', true);
                                }
                            } )
                        }
                }, 'json');
            },
            onsubmit: function(r){
                clw.category.refresh("", "current");
            }
        },

        data:{
            collect: function(){
                var d = {};
                d["relation"] = [];
                $.each( $("#category-modal").find("input[name='cwpr_cwp_id[]']"), function(){
                    if( $(this).is(":checked") ){
                        d["relation"].push( $(this).val() );
                    }
                } )

                return d;
            }
        },
        onvalidate : function(r)
        {
            var d = {};
            d["relation"] = [];
            $.each( $("#category-modal").find("input[name='cwpr_cwp_id[]']"), function(){
                if( $(this).is(":checked") ){
                    d["relation"].push( $(this).val() );
                }
            } )
            if(d['relation'].length>0)
                return true;
            else{
                clw.category.error( $("select[name=c_name]"), "is not a valid data." );
                return false;
            }
        },
        init: function(){
//            $('#a_id').on('change',function(){
//                console.info($(this).val());
//                if(parseInt($(this).val())>0){
//                    var url = app.base + '/clw-system/category/getlist/template/tr/a_id/'+parseInt($(this).val());
//                }
//                else{
//                    var url = app.base + '/clw-system/category/getlist/template/tr/';
//                }
//                console.warn(clw.category.params);
//                $.post( url, {},  function( data ) {
//                    $('table.table').html(data);
//                    clw.category.recalc();
//                    clw.category.pagination();
//                }, 'html');
//
//            })
        },
        filter:{
            form : cfgFilterForm
        }
    }
});
$(document).ready(function(){
    clw.category.init();
})
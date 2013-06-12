var cfgFilterForm  = {
    show : function() {
        $( "ul.breadcrumb" ).hide();
        $(".form-filter").show();

    }
    ,
    hide : function() {
        $( "ul.breadcrumb" ).show();
        $(".form-filter").hide();
        clw.product.refresh("", "filter");
    }
    ,
    submit : function( obj ) {
        //debugger;
        var params = "";
        for( var nIndex in clw.product.o.filter.fields ){
            var fInput = $(clw.product.o.filter.selector).find("[name=" + clw.product.o.filter.fields[nIndex] + "]");
            if( fInput.length > 0 && fInput.val()>0){
                params += clw.product.o.filter.fields[nIndex] + "/" + encodeURI(fInput.val()) + "/";
            }
        }
        clw.product.refresh(params, "filter");
        return false;
    }
}

clw.product = new clw.rowset( {
    name  : "product"
    // whether to initialize editor on doc ready
    ,
    autostart : false
    // Path for server-side controllers (excluding action name)
    ,
    path     : app.base + "/clw-system/product/"
    // Selector of top container
    ,
    selector : "body.product-editor"
    // primary key
    ,
    primary  : "p_id"
    // list of editable fields
    ,
    editable : ["p_name", "p_description", "p_sale_price", "p_price", "p_retail_price", "p_warranty", "p_standardshippingcost", "p_image_url", "p_buy_url", "p_elect", "p_added_at", "p_updated_at"]
    ,
    validation : {
        p_name : "required"
    },
    filter:{
        name : "All Products",

        default_path :  "/clw-system/product/index",

        fields : [ "p_a_id", "cwp_id" ],
        fields_name : {
            "p_a_id" : "Vendor",
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
        selector : "#product-modal"
    // title of a modal box (detected by .title)
    }
    ,
    edit : {
        // Mode of editing: form | inline | modal
        mode     : "modal"
        // Form selector
        ,
        selector : "#product-modal"
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
            onsubmit: function(r){
                clw.product.refresh("", "current");
            }
        },
        filter:{
            form : cfgFilterForm
        }
    }
});

$(document).ready(function(){
    $('.radio').live('click',function(){
        p_id = $(this).attr("name");
        clr_hex = $(this).attr("value");
        $.get(app.base + '/clw-system/product/save-color/p_id/'+p_id+'/p_clr_id/'+clr_hex);
    })
    clw.product.init();
})
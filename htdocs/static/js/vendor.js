
clw.vendor = new clw.rowset( {
    name  : "vendor"
    // whether to initialize editor on doc ready
    ,
    autostart : false
    // Path for server-side controllers (excluding action name)
    ,
    path     : app.base + "/clw-system/advertiser/"
    // Selector of top container
    ,
    selector : "body.vendor-editor"
    // primary key
    ,
    primary  : "a_id"
    // list of editable fields
    ,
    editable : [ "a_s_id", "a_name", "a_url", "a_alias", "a_load_url", "a_enabled"]
    ,
    validation : {
      a_name : "required"
    },

    pager : 50,

    add : {
        // Mode of adding new record: form | inline | modal
        mode     : "modal"
        // Form selector, in case of modal - dialog ID
        ,
        selector : "#vendor-modal"
    // title of a modal box (detected by .title)
    }
    ,
    edit : {
        // Mode of editing: form | inline | modal
        mode     : "modal"
        // Form selector
        ,
        selector : "#vendor-modal"
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
                clw.vendor.refresh("", "current");
            }
        }
}
});

$(document).ready(function(){
    clw.vendor.init();
})

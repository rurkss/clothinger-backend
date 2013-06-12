
clw.service = new clw.rowset( {
    name  : "service"
    // whether to initialize editor on doc ready
    ,
    autostart : false
    // Path for server-side controllers (excluding action name)
    ,
    path     : app.base + "/clw-system/service/"
    // Selector of top container
    ,
    selector : "body.service-editor"
    // primary key
    ,
    primary  : "cws_id"
    // list of editable fields
    ,
    editable : [ "cws_name", "cws_load_dir", "cws_load_url", "cws_load_login", "cws_load_pass", "cws_enabled"]
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
        selector : "#service-modal"
    // title of a modal box (detected by .title)
    }
    ,
    edit : {
        // Mode of editing: form | inline | modal
        mode     : "modal"
        // Form selector
        ,
        selector : "#service-modal"
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
                clw.service.refresh("", "current");
            }
        }
}
});

$(document).ready(function(){
    clw.service.init();
})

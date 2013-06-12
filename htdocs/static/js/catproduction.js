
clw.catproduction = new clw.rowset( {
    name  : "catproduction"
    // whether to initialize editor on doc ready
    ,
    autostart : false
    // Path for server-side controllers (excluding action name)
    ,
    path     : app.base + "/clw-system/catproduction/"
    // Selector of top container
    ,
    selector : "body.catproduction-editor"
    // primary key
    ,
    primary  : "cwp_id"
    // list of editable fields
    ,
    editable : ["cwp_name", "cwp_alias", "cwp_pt_id"]
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
        selector : "#catproduction-modal"
    // title of a modal box (detected by .title)
    }
    ,
    edit : {
        // Mode of editing: form | inline | modal
        mode     : "modal"
        // Form selector
        ,
        selector : "#catproduction-modal"
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
                $('#cwp_pt_id').on('change',function(){
                    if(r.cwp_id == this.value){
                        clw.catproduction.error( $("select[name=cwp_pt_id]"), "is not a valid data." );
                        $('.btn-submit').prop('disabled', true);
                    }
                    else{
                        $('.btn-submit').prop('disabled', false);
                    }

                })
            },
            onsubmit: function(r){
                    clw.catproduction.refresh("", "current");
            }
        },
        onadd: function(){
            $.post( app.base + '/clw-system/catproduction/index/template/select', {}, function(data){
                    $("#parselect").html(data);
            }, 'html');
        }

    }
});
$(document).ready(function(){
    clw.catproduction.init();
})
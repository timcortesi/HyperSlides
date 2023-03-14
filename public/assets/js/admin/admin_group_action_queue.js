ajax.get('/api/group_action_queue/',function(data) {
    var group_action_queue_form_fields = [
        {type:"hidden", name:"id"},
        {type:"hidden", name:"identity_id"},
        {name:"action","label":"Action",type:"select",options:[{label:"Add",value:"add"},{label:"Remove",value:"remove"}]},
        {type:"input", name:"identity_name", label:"Identity"},
        {name:"group_id","label":"Group",type:"select",options:"/api/groups",format:{label:"{{name}}", value:"{{id}}"}},
        {type:"input", name:"group_list", label:"Current Groups"},
        {name:"creation_date","label":"Creation Date",type:"output"},
        {name:"scheduled_date","label":"Scheduled Date",type:"output"}
    ];

    gdg = new GrapheneDataGrid({el:'#adminDataGrid',
        name: 'group_action_queue',
        search: false,columns: false,upload:false,download:false,title:'Queue',
        entries:[],
        sortBy: 'order',
        actions:actions,
        count:1000,
        schema:group_action_queue_form_fields, 
        data: data,
    }).on('execute',function(event) {
        var models = event.grid.getSelected();
        var action_queue_ids = _.map(models,function(model) {
            return model.attributes.id
        })
        if (action_queue_ids.length == 0) {
            toastr.error("You must select at least one action from the queue.  Aborting Execution");
            return;
        }
        if (prompt("To execute all selected actions, type 'execute' in the space provied.  Note: This action cannot be undone!\n\nPlease note that only unscheduled actions can be manually executed. If you wish to execute a scheduled action, you must first remove the scheduled date.") != 'execute') {
            toastr.error("Aborting Execution");
            return;
        }
        toastr.info("Submitting Actions to Queue.  Please Wait...")
        ajax.post('/api/group_action_queue/execute',{ids:action_queue_ids},function(data) {
            toastr.success("All selected actions sent to Job Queue.  See Horizon for current status");
        },function(data) {
            // Do nothing!
        });
    }).on('remove_scheduled_date',function(event) {
        var models = event.grid.getSelected();
        var action_queue_ids = _.map(models,function(model) {
            return model.attributes.id
        })
        if (action_queue_ids.length == 0) {
            toastr.error("You must select at least one action from the queue.  Aborting Execution");
            return;
        }
        if (prompt("To remove the scheduled date from all selected actions, type 'remove' in the space provied.  Note: This action cannot be undone!") != 'remove') {
            toastr.error("Aborting Remove");
            return;
        }
        ajax.post('/api/group_action_queue/remove_scheduled_date',{ids:action_queue_ids},function(data) {
            toastr.success("Scheduled Date Removed From Selected Actions");
        },function(data) {
            // Do nothing!
        });
    }).on('download',function(event){
        toastr.info("Please wait. Fetching the data...");
        window.open('/group_action_queue/download_csv', '_blank');
    }).on('click',function(event) {
        window.location = '/identities/'+event.model.attributes.identity_id
    });
});
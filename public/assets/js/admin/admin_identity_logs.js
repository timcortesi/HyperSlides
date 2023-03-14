ajax.get('/api/identities/'+window.id+"/logs",function(data) {
    gdg = new GrapheneDataGrid({el:'#adminDataGrid',
    name: 'identity_logs',
    search: false,columns: false,upload:false,download:true,title:'Log Events',
    sort:'created_at',
    actions:[
    ],
    count:20,
    schema:[
        {type:"hidden", name:"id"},
        {type:"select", name:"action", label:"Action",
            options:[
                    {label:"Add",value:"add"},
                    {label:"Delete",value:"delete"},
                    {label:"Update",value:"update"},
                    {label:"Restore",value:"restore"},
                    {label:"Disable",value:"disable"}
            ]
        },
        {type:"select", name:"type", label:"Type",
            options:[
                {label:"Group Membership",value:"group"},
                {label:"Account",value:"account"},
                {label:"Entitlement",value:"entitlement"}
        ]},
        {type:"text", name:"type_name", label:"Name"},
        {type:"text", name:"data", label:"Info"},
        {type:"text", name:"actor_identity_id", label:"Actor",template:"{{attributes.actor.first_name}} {{attributes.actor.last_name}}"},
        {type:"date",name:"created_at",label:"Created at"}
    ], data: data
    });
});
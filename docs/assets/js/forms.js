window.forms = {
    elem_form: {
        data: {},
        actions: [{
            type: 'button',
			action: "delete",
			label: "Delete Element",
			modifiers: "btn btn-danger"
		}],
        fields: [
            {label:'Element ID', name:'id', edit:false, type:'number'}, 
            {label:"Type", name:"type", type: "select", options: [
                {label:'Shape / Text',value:'shape'},
                {label:'Image',value:'image'}
            ]},
            {label:'Text', name:'text', type:'textarea'}, 
            {name:'data', type:'hidden'}, 
            {
                type: "fieldset",
                label: "Style",
                name: "style",
                fields: [
                    {name:'top', show:false, parse: true, type:'number'}, 
                    {label:'left', show:false, parse: true,  type:'number'}, 
                    {label:'width', show:false, parse: true,  type:'number'}, 
                    {label:'height', show:false, parse: true,  type:'number'}, 
                    {label:'Background Color', name:'background_color', type:'color'}, 
                    {label:'Text Color', name:'text_color', type:'color'},
                    {label:'Text Size', name:'text_size', type:'number'},
                    {label:'Border Width', name:'border_width', type:'number'},
                    {label:'Border Radius', name:'border_radius', type:'number'},
                    {label:'Border Style', name:'border_style', type:'text'},
                    {label:'Border Color', name:'border_color', type:'color'},
                    {label:"Text Alignment", name:"text_align", type: "custom_radio", options: [
                        {label:'Left',value:'left'},
                        {label:'Center',value:'center'},
                        {label:'Right',value:'right'}
                    ]},
                ]
            },
            {label:'Hide / Show', name:'show', type:'switch', options: [{label:'Hide',value:false},{label:'Show',value:true}],default:true},
            {label:'Click Event', name:'click_event', type:'switch', options: [{label:'Disbled',value:false},{label:'Enabled',value:true}],default:false},
            {label:'Script', name:'script', type:'textarea'}
        ]
    }, 

    slide_form: {
        data: {},
        actions: [{
            type: 'button',
			action: "delete",
			label: "Delete Slide",
			modifiers: "btn btn-danger"
		}],
        fields: [
            {label:'Slide ID', name:'id', edit:false , type:'number'}, 
        ]
    }  
}
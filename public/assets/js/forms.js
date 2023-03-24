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
            {
                type: "fieldset",
                label: "Style",
                name: "style",
                fields: [
                    {name:'top', type:'hidden'}, 
                    {label:'left', type:'hidden'}, 
                    {label:'width', type:'hidden'}, 
                    {label:'height', type:'hidden'}, 
                    {label:'Background Color', name:'background_color', type:'color'}, 
                    {label:'Text Color', name:'color', type:'color'},
                    {label:'Border Radius', name:'border_radius'},
                    {label:'Border Width', name:'border_width'},
                    {label:'Border Style', name:'border_style', type:'text'},
                    {label:'Border Color', name:'border_color', type:'color'},
                    {label:"Text Alignment", name:"text_align", type: "custom_radio", options: [
                        {label:'Left',value:'left'},
                        {label:'Center',value:'center'},
                        {label:'Right',value:'right'}
                    ]},
                ]
            }
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
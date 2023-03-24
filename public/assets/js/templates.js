window.templates = {

menubar: `
<div id="hs-menubar-actions" style="position:absolute;width:100%;top:10px;padding:0px 10px;margin:0px;"> 
<div class="btn-group">
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            File
        </div>
        <ul class="dropdown-menu">
            <li><a href="#">Save</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            Edit
        </div>
        <ul class="dropdown-menu">
            <li><a href="#">Copy</a></li>
            <li><a href="#">Paste</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            View
        </div>
        <ul class="dropdown-menu">
            <li><a href="#">Slideshow</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            Insert
        </div>
        <ul class="dropdown-menu">
            <li><a href="#">Insert Rectangle</a></li>
            <li><a href="#">Insert Oval</a></li>
        </ul>
    </div>
</div>
</div>

<div id="hs-menubar-btns" style="padding:6px 16px;background-color:rgb(238,242,249);border-radius:30px;margin:48px 10px;"> 
<div id="hs-add-slide-btn" class="btn btn-default"><i class="fa fa-plus"></i></div>
<div class="btn-group" role="group">
    <div id="hs-add-rect-btn" class="btn btn-default"><i class="fa fa-square-o"></i></div>
    <div id="hs-add-oval-btn" class="btn btn-default"><i class="fa fa-circle-thin"></i></div>
</div>
</div>
`,

left_sidebar: `
<div id="hs-sidebar">
    {{#slides}}
    <div class="hs-slide {{#if(id == current_slide.id)}}selected{{/if}}" id="slide_{{id}}" data-slide_id="{{id}}" style="position:relative;">
        {{#elements}}
            {{#if (type == 'image')}}
                <img src="{{data}}"
                    style="
                    {{#style}}
                        position:absolute;
                        {{#top}}top:{{top * scaling.preview_scale_y}}px;{{/}}
                        {{#left}}left:{{left * scaling.preview_scale_x}}px;{{/}}
                        {{#width}}width:{{width * scaling.preview_scale_x}}px;{{/}}
                        {{#height}}height:{{height * scaling.preview_scale_y}}px;{{/}}
                        {{#background_color}}background-color:{{background_color}};{{/}}
                        {{#border_style}}border-style:{{border_style}};{{/}}
                        {{#border_color}}border-color:{{border_color}};{{/}}
                        {{#border_radius}}border-radius:{{border_radius}};{{/}}
                    {{/style}}
                    ">
            {{/if}}
            {{#if (type == 'shape')}}
                <div style="
                    {{#style}}
                        position:absolute;
                        {{#top}}top:{{top * scaling.preview_scale_y}}px;{{/}}
                        {{#left}}left:{{left * scaling.preview_scale_x}}px;{{/}}
                        {{#width}}width:{{width * scaling.preview_scale_x}}px;{{/}}
                        {{#height}}height:{{height * scaling.preview_scale_y}}px;{{/}}
                        {{#background_color}}background-color:{{background_color}};{{/}}
                        {{#border_style}}border-style:{{border_style}};{{/}}
                        {{#border_color}}border-color:{{border_color}};{{/}}
                        {{#border_radius}}border-radius:{{border_radius}};{{/}}
                    {{/style}}
                    ">
                </div>
            {{/if}}
        {{/elements}}
    </div>
    {{/slides}}
</div>
`,

right_sidebar: `
<div id="hs-right-toolbar">
    <div id="hs-slide-form" class="hs-form" style="display:{{#if(form_focus == 'slide')}}block{{else}}none{{/if}}"></div>
    <div id="hs-elem-form" class="hs-form" style="display:{{#if(form_focus == 'element')}}block{{else}}none{{/if}}"></div>
</div>
`,

active_slide: `
<div id="hs-main">
    <div id="hs-active-slide" style="position:relative;">
    {{#current_slide.elements}}
        {{#if (type == 'image')}}
            <img class="draggable {{#if(id == current_element.id)}}selected{{/if}}" 
                id="elem_{{id}}" 
                data-elem_id="{{id}}" 
                src="{{data}}"
                style="
                {{#style}}
                    position:absolute;
                    {{#top}}top:{{top * scaling.scale_y}}px;{{/}}
                    {{#left}}left:{{left * scaling.scale_x}}px;{{/}}
                    {{#width}}width:{{width * scaling.scale_x}}px;{{/}}
                    {{#height}}height:{{height * scaling.scale_y}}px;{{/}}
                    {{#background_color}}background-color:{{background_color}};{{/}}
                    {{#border_style}}border-style:{{border_style}};{{/}}
                    {{#border_color}}border-color:{{border_color}};{{/}}
                    {{#border_radius}}border-radius:{{border_radius}};{{/}}
                    {{#border_width}}border-width:{{border_width}};{{/}}
                {{/style}}
                ">
        {{/if}}
        {{#if (type == 'shape')}}
            <div class="draggable {{#if(id == current_element.id)}}selected{{/if}}" 
                id="elem_{{id}}" 
                data-elem_id="{{id}}" 
                style="
                {{#style}}
                    position:absolute;
                    {{#top}}top:{{top * scaling.scale_y}}px;{{/}}
                    {{#left}}left:{{left * scaling.scale_x}}px;{{/}}
                    {{#width}}width:{{width * scaling.scale_x}}px;{{/}}
                    {{#height}}height:{{height * scaling.scale_y}}px;{{/}}
                    {{#background_color}}background-color:{{background_color}};{{/}}
                    {{#border_style}}border-style:{{border_style}};{{/}}
                    {{#border_color}}border-color:{{border_color}};{{/}}
                    {{#border_radius}}border-radius:{{border_radius}};{{/}}
                    {{#border_width}}border-width:{{border_width}};{{/}}
                {{/style}}
                ">
            </div>
        {{/if}}
    {{/current_slide.elements}}
    </div>
</div>
`,

main: `
    {{>menubar}}
    {{>left_sidebar}}
    {{>active_slide}}
    {{>right_sidebar}}
`
};
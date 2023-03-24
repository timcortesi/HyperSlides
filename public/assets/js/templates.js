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
<div id="hs-add-slide-btn" class="btn btn-default"><i id="hs-add-slide-btn" class="fa fa-plus"></i></div>
<div class="btn-group" role="group">
    <div id="hs-add-rect-btn" class="btn btn-default"><i id="hs-add-rect-btn" class="fa fa-square-o"></i></div>
    <div id="hs-add-oval-btn" class="btn btn-default"><i id="hs-add-oval-btn" class="fa fa-circle-thin"></i></div>
</div>
</div>
`,

left_sidebar: `
<div id="hs-sidebar">
    {{#slides}}
    <img class="hs-slide" id="slide_{{id}}" data-slide_id="{{id}}" src="{{preview}}">
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
        <div class="draggable" 
            id="elem_{{id}}" 
            data-elem_id="{{id}}" 
            style="
            {{#style}}
                position:absolute;
                {{#top}}top:{{top}};{{/}}
                {{#left}}left:{{left}};{{/}}
                {{#width}}width:{{width}};{{/}}
                {{#height}}height:{{height}};{{/}}
                {{#background_color}}background-color:{{background_color}};{{/}}
                {{#border_style}}border-style:{{border_style}};{{/}}
                {{#border_color}}border-color:{{border_color}};{{/}}
                {{#border_radius}}border-radius:{{border_radius}};{{/}}
            {{/style}}
            "></div>
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
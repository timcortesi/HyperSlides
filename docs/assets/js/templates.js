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
            <li><a class="hs-cut-btn" href="#"><i class="fa fa-scissors"></i> Cut</a></li>
            <li><a class="hs-copy-btn" href="#"><i class="fa fa-clone"></i> Copy</a></li>
            <li><a class="hs-paste-btn" href="#"><i class="fa fa-clipboard"></i> Paste</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            View
        </div>
        <ul class="dropdown-menu">
            <li><a class="hs-start-slideshow-btn" href="#">Slideshow</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            Insert
        </div>
        <ul class="dropdown-menu">
            <li><a class="hs-add-text-btn" href="#">Insert Text</a></li>
            <li><a class="hs-add-rect-btn" href="#"><i class="fa fa-square-o"></i> Insert Rectangle</a></li>
            <li><a class="hs-add-oval-btn" href="#"><i class="fa fa-circle-thin"></i> Insert Oval</a></li>
        </ul>
    </div>
    <div class="btn-group">
        <div class="btn-sm dropdown-toggle hs-menubar-action" data-toggle="dropdown">
            Arrange
        </div>
        <ul class="dropdown-menu">
            <li><a class="hs-bring-to-front" href="#">Bring to Front</a></li>
            <li><a class="hs-bring-forward" href="#">Bring Forward</a></li>
            <li><a class="hs-send-backward" href="#">Send Backward</a></li>
            <li><a class="hs-send-to-back" href="#">Send to Back</a></li>
        </ul>
    </div>
</div>
<div class="btn btn-primary pull-right hs-start-slideshow-btn">Start Slideshow</div>
</div>

<div id="hs-menubar-btns" style="padding:6px 16px;background-color:rgb(238,242,249);border-radius:30px;margin:48px 10px;"> 
<div id="hs-add-slide-btn" class="btn btn-default"><i class="fa fa-plus"></i></div>
<div class="btn-group" role="group">
    <div class="hs-add-text-btn" class="btn btn-default" style="text-align:center;">T</div>
    <div class="hs-add-rect-btn" class="btn btn-default"><i class="fa fa-square-o"></i></div>
    <div class="hs-add-oval-btn" class="btn btn-default"><i class="fa fa-circle-thin"></i></div>
</div>
<div class="btn-group" role="group">
    <div class="hs-editor-mode-btn" class="btn btn-default {{#if(mode == 'editor')}}active{{/if}}"><i class="fa fa-mouse-pointer"></i></div>
    <div class="hs-viewer-mode-btn" class="btn btn-default {{#if(mode == 'viewer')}}active{{/if}}"><i class="fa fa-hand-pointer-o"></i></div>
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
                        {{#border_style}}border-style:{{border_style}};{{/}}
                        {{#border_color}}border-color:{{border_color}};{{/}}
                        {{#border_radius}}border-radius:{{border_radius * scaling.preview_scale_x}}px;{{/}}
                        {{#border_width}}border-width:{{border_width * scaling.preview_scale_x}}px;{{/}}
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
                        {{#text_color}}color:{{text_color}};{{/}}
                        {{#text_size}}font-size:{{text_size * scaling.preview_scale_x}}px;{{/}}
                        {{#background_color}}background-color:{{background_color}};{{/}}
                        {{#border_style}}border-style:{{border_style}};{{/}}
                        {{#border_color}}border-color:{{border_color}};{{/}}
                        {{#border_radius}}border-radius:{{border_radius * scaling.preview_scale_x}}px;{{/}}
                        {{#border_width}}border-width:{{border_width * scaling.preview_scale_x}}px;{{/}}
                    {{/style}}
                    ">{{{text}}}
                </div>
            {{/if}}
        {{/elements}}
    </div>
    {{/slides}}
</div>
`,

right_sidebar: `
<div id="hs-right-toolbar" {{#if (mode == 'slideshow')}}style="display:none;"{{/if}}>
    <div id="hs-slide-form" class="hs-form" style="display:{{#if(form_focus == 'slide')}}block{{else}}none{{/if}}"></div>
    <div id="hs-elem-form" class="hs-form" style="display:{{#if(form_focus == 'element')}}block{{else}}none{{/if}}"></div>
</div>
`,

active_slide: `
{{#current_slide.elements}}
    {{#if (type == 'image')}}
        <img class="{{#if(mode == 'editor')}}draggable{{else}}{{#click_event}}clickable{{/}}{{/if}} {{#if(id == current_element.id)}}selected{{/if}}" 
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
                {{#border_style}}border-style:{{border_style}};{{/}}
                {{#border_color}}border-color:{{border_color}};{{/}}
                {{#border_radius}}border-radius:{{border_radius * scaling.scale_x}}px;{{/}}
                {{#border_width}}border-width:{{border_width * scaling.scale_x}}px;{{/}}
                {{^show}}display:none;{{/}}
            {{/style}}
            ">
    {{/if}}
    {{#if (type == 'shape')}}
        <div class="{{#if(mode == 'editor')}}draggable{{else}}{{#click_event}}clickable{{/}}{{/if}} {{#if(id == current_element.id)}}selected{{/if}}" 
            id="elem_{{id}}" 
            data-elem_id="{{id}}" 
            style="
            {{#style}}
                position:absolute;
                {{#top}}top:{{top * scaling.scale_y}}px;{{/}}
                {{#left}}left:{{left * scaling.scale_x}}px;{{/}}
                {{#width}}width:{{width * scaling.scale_x}}px;{{/}}
                {{#height}}height:{{height * scaling.scale_y}}px;{{/}}
                {{#text_color}}color:{{text_color}};{{/}}
                {{#text_size}}font-size:{{text_size * scaling.scale_x}}px;{{/}}
                {{#background_color}}background-color:{{background_color}};{{/}}
                {{#border_style}}border-style:{{border_style}};{{/}}
                {{#border_color}}border-color:{{border_color}};{{/}}
                {{#border_radius}}border-radius:{{border_radius * scaling.scale_x}}px;{{/}}
                {{#border_width}}border-width:{{border_width * scaling.scale_x}}px;{{/}}
                {{^show}}display:none;{{/}}
            {{/style}}
            ">{{{text}}}
        </div>
    {{/if}}
{{/current_slide.elements}}
`,

main: `
    {{#if (mode == 'editor' || mode =='viewer')}}
        {{>menubar}}
        {{>left_sidebar}}
        <div id="hs-main">
            <div id="hs-active-slide" style="position:relative;">
                {{>active_slide}}
            </div>
        </div>
    {{/if}}
    {{#if (mode == 'slideshow')}}
        <div style="width:100%;height:100%;background-color:black">
            <div id="hs-active-slide" style="position:relative;max-height:100%;max-width:100%;margin:auto;">
                {{>active_slide}}
            </div>
        </div>
    {{/if}}
    {{>right_sidebar}}
`
};
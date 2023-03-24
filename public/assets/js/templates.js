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
    <img class="hs-slide" id="slide_1">
</div>
`,

right_sidebar: `
<div id="hs-right-toolbar">
    <div id="hs-slide-form" class="hs-form"></div>
    <div id="hs-elem-form" class="hs-form" style="display:none;"></div>
</div>
`,

active_slide: `
<div id="hs-main">
    <div id="hs-active-slide" style="position:relative;">
        <div class="draggable" id="elem_1" style="position:absolute;top:10%;left:10%;width:10%;height:10%;background-color:purple;border-style:solid;border-color:black;"></div>
        <div class="draggable" id="elem_2" style="position:absolute;top:30%;left:10%;width:10%;height:10%;background-color:yellow;border-style:solid;border-color:black;"></div>
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
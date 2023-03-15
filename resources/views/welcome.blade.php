<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0" />
    <link rel="icon"  type="image/png" href="/assets/icons/fontawesome/gray/32/user-circle.png">
    <title>HyperSlide</title>

    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!--<link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">-->
    <!-- Custom styles for this template -->
    <link href="/assets/css/HyperSlide.css" rel="stylesheet">
    <link href="/assets/css/toastr.min.css" rel="stylesheet">
    <link href="/assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="/assets/css/colorpicker.min.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!--<script src="../../assets/js/ie-emulation-modes-warning.js"></script>-->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

    <div id="hs-menubar">
        <div class="btn btn-primary" id="hs-add-rect-btn">Add Rectangle</div>
        <div class="btn btn-primary" id="hs-add-slide-btn">Add Slide</div>
    </div>
    <div id="hs-sidebar">
        <img class="hs-slide" id="slide_1"></img>
    </div>
    <div id="hs-main">
        <div id="hs-active-slide" style="position:relative;">
            <div class="draggable" id="elem_1" style="position:absolute;top:10%;left:10%;width:10%;height:10%;background-color:purple;border-style:solid;border-color:black;"></div>
            <div class="draggable" id="elem_2" style="position:absolute;top:30%;left:10%;width:10%;height:10%;background-color:yellow;border-style:solid;border-color:black;"></div>
        </div>
    </div>
    <div id="hs-right-toolbar">
        <div id="hs-slide-form" class="hs-form"></div>
        <div id="hs-elem-form" class="hs-form" style="display:none;"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
    <script src="/assets/js/vendor/dom-to-image-more.js"></script>
    <script src='/assets/js/vendor/jquery.min.js'></script>
    <script src="/assets/js/vendor/bootstrap.min.js"></script>
    <script src='/assets/js/vendor/colorpicker.min.js'></script>
    <script src="/assets/js/vendor/lodash.min.js"></script>
    <script>_.findWhere = _.find; _.where = _.filter;_.pluck = _.map;_.contains = _.includes;</script>
    <script src='/assets/js/vendor/toastr.min.js'></script>
    <script src='/assets/js/vendor/gform_bootstrap.js'></script>
    <script src='/assets/js/vendor/GrapheneDataGrid.min.js'></script>
    <script src='/assets/js/vendor/moment.js'></script>
    <script src='/assets/js/vendor/bootstrap-datetimepicker.min.js'></script>
    <script src='/assets/js/vendor/sortable.js'></script>
    <script src='/assets/js/vendor/ractive.min.js'></script>

    <script>
    window.slides = {
        1: {
            html: `<div class="draggable" id="elem_1" style="position:absolute;top:10%;left:10%;width:10%;height:10%;background-color:purple;border-style:solid;border-color:black;"></div>
                    <div class="draggable" id="elem_2" style="position:absolute;top:30%;left:10%;width:10%;height:10%;background-color:yellow;border-style:solid;border-color:black;"></div>`
        }
    };

    let current_slide = 1;
    let slide_count = 1;
    let current_slide_element = 1;
    let slide_element_id_count = 3;
    const position = { x: 0, y: 0 }
    let previous_style = {};
    let slide_width = document.getElementById("hs-active-slide").clientWidth;
    let slide_height = document.getElementById("hs-active-slide").clientHeight;

    interact('.draggable').draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        listeners: {
            start (event) {
                position.x = Number(event.target.style.left.replace('%',''));
                position.y = Number(event.target.style.top.replace('%',''));
                previous_style['border-style'] = event.target.style['border-style'];
                previous_style['border-width'] = event.target.style['border-width'];
                event.target.style['border-style'] = 'dashed';
                event.target.style['border-width'] = '5px';
            },
            move (event) {
                let width = document.getElementById("hs-active-slide").clientWidth;
                let height = document.getElementById("hs-active-slide").clientHeight;
                position.x += (event.dx / width) * 100
                position.y += (event.dy / height) * 100
                event.target.style.left = position.x+'%';
                event.target.style.top = position.y+'%';
            },
            end (event) {
                event.target.style['border-style'] = previous_style['border-style'];
                event.target.style['border-width'] = previous_style['border-width'];
                update_preview();
                window.slides[current_slide].html = document.getElementById('hs-active-slide').innerHTML;
            }
        }
    }).resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        invert: 'reposition',
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        listeners: {
            start (event) {
                position.x = Number(event.target.style.left.replace('%',''));
                position.y = Number(event.target.style.top.replace('%',''));
                previous_style['border-style'] = event.target.style['border-style'];
                previous_style['border-width'] = event.target.style['border-width'];
                event.target.style['border-style'] = 'dashed';
                event.target.style['border-width'] = '5px';
            },
            move: function (event) {
                let width = document.getElementById("hs-active-slide").clientWidth;
                let height = document.getElementById("hs-active-slide").clientHeight;
                position.x += (event.deltaRect.left / width) * 100
                position.y += (event.deltaRect.top / height) * 100
                event.target.style.left = position.x+'%';
                event.target.style.top = position.y+'%';
                event.target.style.width = (event.rect.width / width) * 100+'%';
                event.target.style.height = (event.rect.height / height) * 100+'%';
            },
            end (event) {
                event.target.style['border-style'] = previous_style['border-style'];
                event.target.style['border-width'] = previous_style['border-width'];
                update_preview();
                window.slides[current_slide].html = document.getElementById('hs-active-slide').innerHTML;
            }
        }
    })

    document.addEventListener("click", function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.id == 'hs-add-rect-btn') {
                let newrect = document.createElement('div');
                slide_element_id_count++;
                newrect.id = "elem_"+slide_element_id_count;
                newrect.classList.add("draggable");
                newrect.style.cssText = 'position:absolute;top:0%;left:0%;width:10%;height:10%;color:purple;border-style:solid;border-color:black;';
                document.getElementById('hs-active-slide').appendChild(newrect);
            } else if (e.target.id == 'hs-add-slide-btn') {
                let newslide = document.createElement('img');
                slide_count++;
                newslide.id = "slide_"+slide_count;
                newslide.classList.add("hs-slide");
                let current_slide_element = document.getElementById('slide_'+current_slide);
                window.slides[slide_count] = {html:''};
                current_slide_element.parentNode.insertBefore(newslide, current_slide_element.nextSibling);
                current_slide = slide_count;
            } else if (e.target.classList.contains('draggable')) {
                current_slide_element = e.target.id.split('_')[1];  
                var data = _.mapValues(_.keyBy(_.map(e.target.style.cssText.split(';'),function(elem) {
                    let parts = elem.split(':');
                    return {key:[(parts[0]+'').trim()],value:(parts[1]+'').trim()};
                }),'key'),'value');
                document.getElementById('hs-slide-form').style.display = 'none'
                document.getElementById('hs-elem-form').style.display = 'block'
                elem_form.set(null);
                elem_form.set({style:data,info:{elem_id:current_slide_element}});
            } else if (e.target.classList.contains('hs-slide')) {
                current_slide = e.target.id.split('_')[1];
                document.getElementById('hs-active-slide').innerHTML = window.slides[current_slide].html;
                document.getElementById('hs-slide-form').style.display = 'block'
                document.getElementById('hs-elem-form').style.display = 'none'
                slide_form.set(null);
                slide_form.set({style:data,info:{elem_id:current_slide}});
            }
        }
    })


    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    var newimg = new Image();
                    newimg.onload = function(){
                        let imgwidth = 0;
                        let imgheight = 0;
                        if (newimg.width > newimg.height) {
                            if (newimg.width > slide_width) {
                                imgwidth = 50;
                                imgheight = ((newimg.height * 50) / newimg.width) * (16/10);
                            } else {
                                imgwidth = (newimg.width / slide_width) * 100;
                                imgheight = (newimg.height / slide_height) * 100;
                            }
                        } else {
                            if (newimg.height > slide_height) {
                                imgheight = 50;
                                imgwidth = ((newimg.width * 50) / newimg.height) * (1/(16/10));
                            } else {
                                imgwidth = (newimg.width / slide_width) * 100;
                                imgheight = (newimg.height / slide_height) * 100;
                            }
                        }
                        slide_element_id_count++;
                        newimg.id = "elem_"+slide_element_id_count;
                        newimg.classList.add("draggable");
                        newimg.style.cssText = 'position:absolute;top:0%;left:0%;width:'+imgwidth+'%;height:'+imgheight+'%;color:purple;border-style:solid;border-color:black;';
                        document.getElementById('hs-active-slide').appendChild(newimg);
                        update_preview();
                        window.slides[current_slide].html = document.getElementById('hs-active-slide').innerHTML;
                    };
                    newimg.src = event.target.result;

                }; 
                reader.readAsDataURL(blob);
            }
        }
    };

    let update_preview = function() {
        var node = document.getElementById('hs-active-slide');
        domtoimage
            .toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                document.getElementById('slide_'+current_slide).src = dataUrl;
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    document.getElementById('hs-active-slide').innerHTML = window.slides[1].html;
    update_preview();

    window.elem_form = new gform({
        data: {},
        actions: [{
            type: 'button',
			action: "delete",
			label: "Delete Element",
			modifiers: "btn btn-danger"
		}],
        fields: [{
			type: "fieldset",
			label: "Info",
			name: "info",
			fields: [
                {label:'Element ID', name:'elem_id', edit:false}, 
            ]
        },{
			type: "fieldset",
			label: "Style",
			name: "style",
			fields: [
                {label:'Background Color', name:'background-color', type:'color'}, 
                {label:'Text Color', name:'color', type:'color'},
                {label:'Border Radius', name:'border-radius'},
                {label:'Border Width', name:'border-width'},
                {label:'Border Color', name:'border-color', type:'color'},
            ]
        }]
    }, '#hs-elem-form').on('change',function(event) {
        for (const [key, value] of Object.entries(event.form.get().style)) {
            let element = document.getElementById('elem_'+current_slide_element);
            element.style[key] = value;
        }
    }).on('delete',function(event) {
        document.getElementById(current_slide_element).outerHTML = "";
    });

    window.slide_form = new gform({
        data: {},
        actions: [{
            type: 'button',
			action: "delete",
			label: "Delete Slide",
			modifiers: "btn btn-danger"
		}],
        fields: [{
			type: "fieldset",
			label: "Info",
			name: "info",
			fields: [
                {label:'Slide ID', name:'elem_id', edit:false}, 
            ]
        }]
    }, '#hs-slide-form').on('change',function(event) {
        // Do Nothing!
    }).on('delete',function(event) {
        document.getElementById('slide_'+current_slide).outerHTML = "";
        delete window.slides[current_slide];
    });

    </script>

  </body>
</html>

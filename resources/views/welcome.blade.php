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

    <!-- Custom Light / Dark Mode CSS -->
    <script>
      if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
        document.documentElement.style.display = 'none';
        document.head.insertAdjacentHTML(
          'beforeend',
          '<link rel="stylesheet" href="/light.css" onload="document.documentElement.style.display = \'\'">',
        );
      }
    </script>
    <link rel="stylesheet" href="/assets/css/bootstrap.darkly.min.css" media="(prefers-color-scheme: dark)" />
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" media="(prefers-color-scheme: light)" />
    <!-- AFTER -->

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!--<link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">-->
    <!-- Custom styles for this template -->
    <link href="/assets/css/HyperSlide.css" rel="stylesheet">
    <link href="/assets/css/toastr.min.css" rel="stylesheet">
    <link href="/assets/css/font-awesome.min.css" rel="stylesheet">

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
    </div>
    <div id="hs-sidebar">
        <img class="hs-slide" id="slide-1" data-slide="1"></img>
        <img class="hs-slide" id="slide-2" data-slide="2"></img>
        <img class="hs-slide" id="slide-3" data-slide="3"></img>
        <img class="hs-slide" id="slide-4" data-slide="4"></img>
        <img class="hs-slide" id="slide-5" data-slide="5"></img>
    </div>
    <div id="hs-main">
        <div id="hs-active-slide" style="position:relative;">
            <div class="draggable" id="box" style="position:absolute;top:10%;left:10%;width:10%;height:10%;background-color:purple;border-style:solid;border-color:black;"></div>
            <div class="draggable" id="box2" style="position:absolute;top:30%;left:10%;width:10%;height:10%;background-color:yellow;border-style:solid;border-color:black;"></div>
        </div>
    </div>
    <div id="hs-right-toolbar">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
    <script src="/assets/js/vendor/dom-to-image-more.js"></script>
    <script>
    window.slides = [
        {
            id: 1,
            html: `<div class="draggable" id="box" style="position:absolute;top:10%;left:10%;width:10%;height:10%;background-color:purple;border-style:solid;border-color:black;"></div>
                    <div class="draggable" id="box2" style="position:absolute;top:30%;left:10%;width:10%;height:10%;background-color:yellow;border-style:solid;border-color:black;"></div>`
        },
        {id: 2,html: ``},
        {id: 3,html: ``},
        {id: 4,html: ``},
        {id: 5,html: ``},
    ];

    let current_slide = 1;
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
                console.log(position);
                event.target.style.left = position.x+'%';
                event.target.style.top = position.y+'%';
            },
            end (event) {
                event.target.style['border-style'] = previous_style['border-style'];
                event.target.style['border-width'] = previous_style['border-width'];
                update_preview();
                window.slides[current_slide-1].html = document.getElementById('hs-active-slide').innerHTML;
            }
        }
    }).resizable({
        edges: { top: true, left: true, bottom: true, right: true },
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
                window.slides[current_slide-1].html = document.getElementById('hs-active-slide').innerHTML;
            }
        }
    })

    let add_square_btn_elem = document.getElementById('hs-add-rect-btn')
    add_square_btn_elem.addEventListener('click', function(elem) {
        let newrect = document.createElement('div');
        newrect.id = "newrect";
        newrect.classList.add("draggable");
        newrect.style.cssText = 'position:absolute;top:0%;left:0%;width:10%;height:10%;color:purple;border-style:solid;border-color:black;';
        document.getElementById('hs-active-slide').appendChild(newrect);
    })
    var slide_elements = document.getElementsByClassName("hs-slide");
    for (var i = 0; i < slide_elements.length; i++) {
        slide_elements[i].addEventListener('click', function(elem) {
            current_slide = elem.target.dataset.slide;
            document.getElementById('hs-active-slide').innerHTML = window.slides[current_slide-1].html;
        });
    }

    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // might give you mime types
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    console.log(event.target.result); // data url!

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

                        newimg.id = "newimg";
                        newimg.classList.add("draggable");
                        newimg.style.cssText = 'position:absolute;top:0%;left:0%;width:'+imgwidth+'%;height:'+imgheight+'%;color:purple;border-style:solid;border-color:black;';
                        document.getElementById('hs-active-slide').appendChild(newimg);
                        update_preview();
                        window.slides[current_slide-1].html = document.getElementById('hs-active-slide').innerHTML;
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
                document.getElementById('slide-'+current_slide).src = dataUrl;
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    document.getElementById('hs-active-slide').innerHTML = window.slides[0].html;
    update_preview();
    </script>

    <script src='/assets/js/vendor/jquery.min.js'></script>
    <script src="/assets/js/vendor/bootstrap.min.js"></script>
    <script src="/assets/js/vendor/lodash.min.js"></script>
    <script>_.findWhere = _.find; _.where = _.filter;_.pluck = _.map;_.contains = _.includes;</script>
    <script src='/assets/js/vendor/toastr.min.js'></script>
    <script src='/assets/js/vendor/gform_bootstrap.js'></script>
    <script src='/assets/js/vendor/GrapheneDataGrid.min.js'></script>
    <script src='/assets/js/vendor/moment.js'></script>
    <script src='/assets/js/vendor/bootstrap-datetimepicker.min.js'></script>
    <script src='/assets/js/vendor/sortable.js'></script>
    <script src='/assets/js/vendor/ractive.min.js'></script>
  </body>
</html>

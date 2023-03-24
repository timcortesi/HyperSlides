app.callback = function() {
    app.data.slides = [
        {
            id: 1,
            elements: [
                {
                    id: 1,
                    preview: null,
                    style: {
                        top: '10%',
                        left: '10%',
                        width: '10%',
                        height: '10%',
                        background_color: 'purple',
                        border_style: 'solid',
                        border_color: 'black'
                    }
                },
                {
                    id: 2,
                    preview: null,
                    style: {
                        top: '30%',
                        left: '10%',
                        width: '10%',
                        height: '10%',
                        background_color: 'yellow',
                        border_style: 'solid',
                        border_color: 'black'
                    }
                }
            ]
        }
    ];
    app.data.current_slide = {};
    if (app.data.slides.length > 0) {
        app.data.current_slide = app.data.slides[0];
    }
    app.data.form_focus = 'side';
    app.update();

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
                app.data.current_element = _.find(app.data.current_slide.elements,{'id':Number(event.target.dataset.elem_id)});
                position.x = Number(app.data.current_element.style.left.replace('%',''));
                position.y = Number(app.data.current_element.style.top.replace('%',''));
            },
            move (event) {
                let width = document.getElementById("hs-active-slide").clientWidth;
                let height = document.getElementById("hs-active-slide").clientHeight;
                position.x += (event.dx / width) * 100
                position.y += (event.dy / height) * 100
                app.data.current_element.style.left = position.x+'%';
                app.data.current_element.style.top = position.y+'%';
                app.update();
            },
            end (event) {
                update_preview();
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
                app.data.current_element = _.find(app.data.current_slide.elements,{'id':Number(event.target.dataset.elem_id)});
                position.x = Number(event.target.style.left.replace('%',''));
                position.y = Number(event.target.style.top.replace('%',''));
            },
            move: function (event) {
                let width = document.getElementById("hs-active-slide").clientWidth;
                let height = document.getElementById("hs-active-slide").clientHeight;
                position.x += (event.deltaRect.left / width) * 100
                position.y += (event.deltaRect.top / height) * 100
                app.data.current_element.style.left = position.x+'%';
                app.data.current_element.style.top = position.y+'%';
                app.data.current_element.style.width = (event.rect.width / width) * 100+'%';
                app.data.current_element.style.height = (event.rect.height / height) * 100+'%';
                app.update();
            },
            end (event) {
                update_preview();
            }
        }
    })

    document.addEventListener("click", function (e) {
        if (e.target instanceof HTMLElement) {
            if (e.target.id == 'hs-add-rect-btn') {
                slide_element_id_count++;
                app.data.current_slide.elements.push({
                    id: slide_element_id_count,
                    style: {
                        top: '3%',
                        left: '3%',
                        width: '12.5%',
                        height: '20%',
                        border_style: 'solid',
                        border_color: 'black'
                    }
                });
                app.update();
            } else if (e.target.id == 'hs-add-oval-btn') {
                slide_element_id_count++;
                app.data.current_slide.elements.push({
                    id: slide_element_id_count,
                    style: {
                        top: '3%',
                        left: '3%',
                        width: '12.5%',
                        height: '20%',
                        border_style: 'solid',
                        border_color: 'black',
                        border_radius:'100%'
                    }
                });
                app.update();
            } else if (e.target.id == 'hs-add-slide-btn') {
                slide_count++;
                let current_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})
                app.data.slides.push({
                    id: slide_count,
                    elements: []
                });
                app.update();
            } else if (e.target.classList.contains('draggable')) {
                e.target.tabIndex = -1; e.target.focus();
                app.data.current_element = _.find(app.data.current_slide.elements,{'id':Number(event.target.dataset.elem_id)});
                app.data.form_focus = 'element';
                app.update();
                app.form('elem_form').set(null);
                app.form('elem_form').set(app.data.current_element);
            } else if (e.target.classList.contains('hs-slide')) {
                e.target.tabIndex = -1; e.target.focus();
                app.data.current_slide = _.find(app.data.slides,{'id':Number(e.target.dataset.slide_id)});
                app.data.form_focus = 'slide';
                app.update();
                app.form('slide_form').set(null);
                app.form('slide_form').set(app.data.current_slide);
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
                        app.data.slides[current_slide].html = document.getElementById('hs-active-slide').innerHTML;
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
                app.data.current_slide.preview = dataUrl;
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    update_preview();

    app.form('elem_form','#hs-elem-form').on('change',function(event) {
        let index = _.findIndex(app.data.current_slide.elements,{id:Number(event.form.get().id)})
        if (index >= 0) {
            app.data.current_slide.elements[index] = event.form.get();
            console.log(app.data.current_slide.elements[index])
            app.update();
        }
    }).on('delete',function(event) {
        let index = _.findIndex(app.data.current_slide.elements,{id:Number(event.form.get().id)})
        if (index >= 0) {
            delete app.data.current_slide.elements[index];
            app.update();
        }
    });

    app.form('slide_form', '#hs-slide-form').on('change',function(event) {
        // Do Nothing!
    }).on('delete',function(event) {
        let index = _.findIndex(app.data.slides,{id:Number(event.form.get().id)})
        if (index >= 0) {
            delete app.data.slides[index];
        }
    });
}

app.callback();
app.callback = function() {
    /* Setup App Data Object */
    app.data.slides = [
        {
            id: 1,
            elements: [
                {
                    id: 1,
                    type: 'shape',
                    style: {
                        top: 100,
                        left: 100,
                        width: 100,
                        height: 100,
                        background_color: 'purple',
                        border_style: 'solid',
                        border_color: 'black'
                    }
                },
                {
                    id: 2,
                    type: 'shape',
                    style: {
                        top: 300,
                        left: 100,
                        width: 100,
                        height: 100,
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
    app.data.scaling = {};
    app.data.slide_id_counter = 1;
    app.data.element_id_counter = 2;
    app.update();

    /* Handle Window Resize and Scaling */

    resize_window = function() {
        app.data.scaling.slide_width = document.getElementById("hs-active-slide").clientWidth;
        app.data.scaling.slide_height = document.getElementById("hs-active-slide").clientHeight;
        app.data.scaling.preview_width = 180;
        app.data.scaling.preview_height = 117;
        app.data.scaling.scale_x = app.data.scaling.slide_width / 1600
        app.data.scaling.scale_y = app.data.scaling.slide_height / 1000
        app.data.scaling.preview_scale_x = app.data.scaling.preview_width / 1600
        app.data.scaling.preview_scale_y = app.data.scaling.preview_height / 1000
        app.update();
    }
    resize_window();
    window.onresize = function() {resize_window() };

    /* Drag and Drop Elements */
    const position = { x: 0, y: 0 }
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
                position.x = Number(app.data.current_element.style.left);
                position.y = Number(app.data.current_element.style.top);
            },
            move (event) {
                position.x += Math.round(event.dx / app.data.scaling.scale_x)
                position.y += Math.round(event.dy / app.data.scaling.scale_y)
                app.data.current_element.style.left = position.x;
                app.data.current_element.style.top = position.y;
                app.update();
            },
            end (event) {
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
                position.x = Number(app.data.current_element.style.left);
                position.y = Number(app.data.current_element.style.top);
            },
            move: function (event) {
                position.x += Math.round(event.deltaRect.left / app.data.scaling.scale_x)
                position.y += Math.round(event.deltaRect.top / app.data.scaling.scale_y)
                app.data.current_element.style.left = position.x;
                app.data.current_element.style.top = position.y;
                if (app.data.current_element.type == 'image') {
                    let aspect_ratio =  app.data.current_element.style.height / app.data.current_element.style.width;
                    app.data.current_element.style.width = Math.round(event.rect.width / app.data.scaling.scale_x);
                    app.data.current_element.style.height = app.data.current_element.style.width * aspect_ratio;
                } else {
                    app.data.current_element.style.width = Math.round(event.rect.width / app.data.scaling.scale_x);
                    app.data.current_element.style.height = Math.round(event.rect.height / app.data.scaling.scale_y);
                }
                app.update();
            },
            end (event) {
            }
        }
    })

    /* Handle Click Events */
    app.click('#hs-add-rect-btn',function(e) {
        app.data.element_id_counter++;
        app.data.current_slide.elements.push({
            id: app.data.element_id_counter,
            type:'shape',
            style: {
                top: 30,
                left: 30,
                width: 125,
                height: 200,
                border_style: 'solid',
                border_color: 'black'
            }
        });
        app.update();
    })

    app.click('#hs-add-oval-btn',function(e) {
        app.data.element_id_counter++;
        app.data.current_slide.elements.push({
            id: app.data.element_id_counter,
            type:'shape',
            style: {
                top: 30,
                left: 30,
                width: 125,
                height: 200,
                border_style: 'solid',
                border_color: 'black',
                border_radius:'100%'
            }
        });
        app.update();
    })

    app.click('#hs-main',function(e) {
        app.data.current_element = null;
        app.data.form_focus = 'slide';
        app.update();
    })

    app.click('#hs-add-slide-btn',function(e) {
        app.data.slide_id_counter++;
        let new_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})+1
        app.data.slides.splice(new_slide_index,0,{
            id: app.data.slide_id_counter,
            elements: []
        });
        app.data.current_slide = app.data.slides[new_slide_index];
        app.update();
    })

    app.click('.draggable',function(e) {
        e.stopPropagation();
        app.data.current_element = _.find(app.data.current_slide.elements,{'id':Number(e.currentTarget.dataset.elem_id)});
        app.data.form_focus = 'element';
        app.update();
        app.form('elem_form').set(null);
        app.form('elem_form').set(app.data.current_element);
    })

    app.click('.hs-slide',function(e) {
        app.data.current_slide = _.find(app.data.slides,{'id':Number(e.currentTarget.dataset.slide_id)});
        app.data.form_focus = 'slide';
        app.update();
        app.form('slide_form').set(null);
        app.form('slide_form').set(app.data.current_slide);
    })

    /* Handle Clipboard Paste Events */
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
                        let imgwidth = 0; let imgheight = 0;
                        if (newimg.width > newimg.height) {
                            if (newimg.width > app.data.scaling.slide_width) {
                                imgwidth = 800;
                                imgheight = ((newimg.height * 800) / newimg.width);
                            } else {
                                imgwidth = newimg.width; imgheight = newimg.height;
                            }
                        } else {
                            if (newimg.height > app.data.scaling.slide_height) {
                                imgheight = 500;
                                imgwidth = ((newimg.width * 500) / newimg.height);
                            } else {
                                imgwidth = newimg.width; imgheight = newimg.height;
                            }
                        }
                        app.data.element_id_counter++;
                        app.data.current_slide.elements.push({
                            id: app.data.element_id_counter,
                            type:'image',
                            data:newimg.src,
                            style: {
                                top: 0,
                                left: 0,
                                width: imgwidth,
                                height: imgheight,
                                border_style: 'solid',
                                border_color: 'black'
                            }
                        });
                        app.update();
                    };
                    newimg.src = event.target.result;

                }; 
                reader.readAsDataURL(blob);
            }
        }
    };

    app.form('elem_form','#hs-elem-form').on('change',function(event) {
        let index = _.findIndex(app.data.current_slide.elements,{id:Number(event.form.get().id)})
        if (index >= 0) {
            app.data.current_slide.elements[index] = event.form.get();
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
            app.update();
        }
    }).set(app.data.current_slide);
    
}

app.callback();
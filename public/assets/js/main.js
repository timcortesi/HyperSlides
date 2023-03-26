app.callback = function() {
    /* Setup App Data Object */
    app.data.slides = [
        {
            id: 1,
            elements: [
                {
                    id: 1,
                    type: 'shape',
                    show:true,
                    click_event:false,
                    text:'Click Me!',
                    click_event:true,
                    script:"let box = hs.element(2);\nawait box.animate(1400,100); \nawait box.animate(1400,800);\nawait box.animate(100,800);\nawait box.animate(100,100);\nhs.slide(2).visit();\n",
                    style: {
                        top: 450,
                        left: 750,
                        width: 200,
                        height: 100,
                        background_color: 'orange',
                        border_style: 'solid',
                        border_color: 'black',
                        text_size:30,
                    }
                },
                {
                    id: 2,
                    type: 'shape',
                    show:true,
                    click_event:false,
                    style: {
                        top: 100,
                        left: 100,
                        width: 100,
                        height: 100,
                        background_color: 'yellow',
                        border_style: 'solid',
                        border_color: 'black',
                        text_size:30,
                    }
                }
            ]
        },
        {
            id: 2,
            elements: [
                {
                    id: 3,
                    type: 'shape',
                    show:true,
                    click_event:false,
                    text:'Welcome to the second slide!',
                    click_event:false,
                    style: {
                        top: 500,
                        left: 400,
                        width: 700,
                        height: 200,
                        border_style: 'none',
                        text_size:50,
                    }
                },
                {
                    id: 4,
                    type: 'shape',
                    show:true,
                    click_event:false,
                    text:'Go back!',
                    click_event:true,
                    script:"hs.slide(1).visit();\n",
                    style: {
                        top: 600,
                        left: 750,
                        width: 200,
                        height: 100,
                        background_color: 'red',
                        text_color:'white',
                        border_style: 'solid',
                        border_color: 'black',
                        text_size:30,
                    }
                },

            ]
        }
    ];

    app.data.current_slide = {};
    if (app.data.slides.length > 0) {
        app.data.current_slide = app.data.slides[0];
    }
    app.data.form_focus = 'side';
    app.data.scaling = {};
    app.data.slide_id_counter = 2;
    app.data.element_id_counter = 4;
    app.data.clipboard = null;
    app.data.last_target = null;
    app.data.mode = 'editor';
    app.update();

    /* Handle Window Resize and Scaling */

    resize_window = function() {
        app.data.scaling.slide_width = document.getElementById("hs-active-slide").clientWidth;
        app.data.scaling.slide_height = document.getElementById("hs-active-slide").clientHeight;
        app.data.scaling.scale_x = app.data.scaling.slide_width / 1600
        app.data.scaling.scale_y = app.data.scaling.slide_height / 1000
        app.data.scaling.preview_scale_x = 180 / 1600
        app.data.scaling.preview_scale_y = 117 / 1000
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
    app.click('.hs-cut-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        if (app.data.last_target.type == 'slide') {
            app.data.clipboard = {
                type: 'slide',
                value: _.cloneDeep(_.find(app.data.slides,{id:app.data.last_target.value}))
            }
            let index = _.findIndex(app.data.slides,{id:app.data.last_target.value})
            delete app.data.slides[index];
            app.data.slides = _.filter(app.data.slides,function(e){return e!=undefined});
        } else if (app.data.last_target.type == 'element') {
            app.data.clipboard = {
                type: 'element',
                value: _.cloneDeep(_.find(app.data.current_slide.elements,{id:app.data.last_target.value}))
            }
            let index = _.findIndex(app.data.current_slide.elements,{id:app.data.last_target.value})
            delete app.data.current_slide.elements[index];
            app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
        } 
        app.update();
    })

    app.click('.hs-copy-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        if (app.data.last_target.type == 'slide') {
            app.data.clipboard = {
                type: 'slide',
                value: _.cloneDeep(_.find(app.data.slides,{id:app.data.last_target.value}))
            }
        } else if (app.data.last_target.type == 'element') {
            app.data.clipboard = {
                type: 'element',
                value: _.cloneDeep(_.find(app.data.current_slide.elements,{id:app.data.last_target.value}))
            }
        } 
    })

    app.click('.hs-paste-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        if (app.data.clipboard.type == 'slide') {
            app.data.slide_id_counter++;
            let new_slide = _.cloneDeep(app.data.clipboard.value);
            new_slide.id = app.data.slide_id_counter;
            let new_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})+1
            app.data.slides.splice(new_slide_index,0,new_slide);
            app.data.current_slide = app.data.slides[new_slide_index];
            app.data.form_focus = 'slide';
            app.form('slide_form').set(null);
            app.form('slide_form').set(app.data.current_slide);    
            app.update();
        } else if (app.data.clipboard.type == 'element') {
            app.data.element_id_counter++;
            let new_element = _.cloneDeep(app.data.clipboard.value);
            new_element.id = app.data.element_id_counter;
            new_element.style.top+=10;
            new_element.style.left+=10;
            app.data.current_slide.elements.push(_.cloneDeep(new_element));
            app.data.current_element = _.find(app.data.current_slide.elements,{id:new_element.id})
            app.update();
        } 
    })

    app.click('.hs-add-rect-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        app.data.element_id_counter++;
        app.data.current_slide.elements.push({
            id: app.data.element_id_counter,
            text: '',
            type:'shape',
            show:true,
            click_event:false,
            style: {
                top: 30,
                left: 30,
                width: 200,
                height: 200,
                border_style: 'solid',
                border_color: 'black',
                text_size:30,
            }
        });
        app.data.current_element = _.find(app.data.current_slide.elements,{id:app.data.element_id_counter})
        app.update();
    })

    app.click('.hs-add-oval-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        app.data.element_id_counter++;
        app.data.current_slide.elements.push({
            id: app.data.element_id_counter,
            type:'shape',
            show:true,
            click_event:false,
            style: {
                top: 30,
                left: 30,
                width: 200,
                height: 200,
                border_style: 'solid',
                border_color: 'black',
                border_radius:'800',
                text_size:30,
            }
        });
        app.data.current_element = _.find(app.data.current_slide.elements,{id:app.data.element_id_counter})
        app.update();
    })

    app.click('.hs-add-text-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        app.data.element_id_counter++;
        app.data.current_slide.elements.push({
            id: app.data.element_id_counter,
            type:'shape',
            show:true,
            click_event:false,
            style: {
                top: 30,
                left: 30,
                width: 500,
                height: 75,
                border_style: 'none',
                text_size:60,
                text_color:'black',
            }
        });
        app.data.current_element = _.find(app.data.current_slide.elements,{id:app.data.element_id_counter})
        app.update();
    })

    app.click('.hs-editor-mode-btn',function(event) {
        app.data.mode = 'editor';
        app.update();
    })

    app.click('.hs-viewer-mode-btn',function(event) {
        app.data.mode = 'viewer';
        app.update();
    })


    // Buttons: Move Forward / Backwards
    app.click('.hs-bring-to-front',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        let index = _.findIndex(app.data.current_slide.elements,{id:app.data.current_element.id})
        delete app.data.current_slide.elements[index];
        app.data.current_slide.elements.push(_.cloneDeep(app.data.current_element));
        app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
        app.update();
    })
    app.click('.hs-send-to-back',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        let index = _.findIndex(app.data.current_slide.elements,{id:app.data.current_element.id})
        delete app.data.current_slide.elements[index];
        app.data.current_slide.elements.unshift(_.cloneDeep(app.data.current_element));
        app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
        app.update();
    })
    app.click('.hs-send-backward',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        let index = _.findIndex(app.data.current_slide.elements,{id:app.data.current_element.id})
        delete app.data.current_slide.elements[index];
        app.data.current_slide.elements.splice(index-1,0,_.cloneDeep(app.data.current_element));
        app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
        app.update();
    })
    app.click('.hs-bring-forward',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        let index = _.findIndex(app.data.current_slide.elements,{id:app.data.current_element.id})
        delete app.data.current_slide.elements[index];
        app.data.current_slide.elements.splice(app.data.current_slide.elements.length,0,_.cloneDeep(app.data.current_element));
        app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
        app.update();
    })

    app.click('#hs-main',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        app.data.current_element = null;
        app.data.form_focus = 'slide';
        app.data.last_target = null;
        app.update();
    })

    app.click('#hs-add-slide-btn',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        app.data.slide_id_counter++;
        let new_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})+1
        app.data.slides.splice(new_slide_index,0,{
            id: app.data.slide_id_counter,
            elements: []
        });
        app.data.current_slide = app.data.slides[new_slide_index];
        app.data.form_focus = 'slide';
        app.form('slide_form').set(null);
        app.form('slide_form').set(app.data.current_slide);
        app.data.last_target = {
            type:'slide',
            value: app.data.current_slide.id
        }
        app.update();
    })

    app.click('.hs-start-slideshow-btn',function(e) {
        app.data.mode = 'slideshow';
        app.update();
        app.enterfs();
        resize_window();
    })

    app.click('.draggable',function(e) {
        if (app.data.mode != 'editor') {
            return;
        }
        e.stopPropagation();
        app.data.current_element = _.find(app.data.current_slide.elements,{'id':Number(e.currentTarget.dataset.elem_id)});
        app.data.form_focus = 'element';
        app.update();
        app.form('elem_form').set(null);
        app.form('elem_form').set(app.data.current_element);
        app.data.last_target = {
            type:'element',
            value: app.data.current_element.id
        }
    })

    app.click('.hs-slide',function(e) {
        app.data.current_slide = _.find(app.data.slides,{'id':Number(e.currentTarget.dataset.slide_id)});
        app.data.form_focus = 'slide';
        app.update();
        app.form('slide_form').set(null);
        app.form('slide_form').set(app.data.current_slide);
        app.data.last_target = {
            type:'slide',
            value: app.data.current_slide.id
        }
    })

    app.keydown('ArrowRight',function(event) {
        if (app.data.mode === 'slideshow') {
            let current_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})
            if (current_slide_index >= app.data.slides.length-1) {
                app.data.mode = 'editor';
                app.update();
                app.exitfs();
                resize_window();
            } else {
                app.data.current_slide = app.data.slides[current_slide_index+1];
                app.update();
            }            
        }
    })
    app.keydown('Space',function(event) {
        if (app.data.mode === 'slideshow') {
            let current_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})
            if (current_slide_index >= app.data.slides.length-1) {
                app.data.mode = 'editor';
                app.update();
                app.exitfs();
                resize_window();
            } else {
                app.data.current_slide = app.data.slides[current_slide_index+1];
                app.update();
            }            
        }
    })
    app.keydown('ArrowLeft',function(event) {
        if (app.data.mode === 'slideshow') {
            let current_slide_index = _.findIndex(app.data.slides,{id: app.data.current_slide.id})
            if (current_slide_index == 0) {
                app.data.mode = 'editor';
                app.update();
                app.exitfs();
                resize_window();
            } else {
                app.data.current_slide = app.data.slides[current_slide_index-1];
                app.update();
            }
        }
    })
    app.keydown('Escape',function(event) {
        if (app.data.mode === 'slideshow') {
            app.data.mode = 'editor';
            app.update();
            app.exitfs();
            resize_window();
        }
    })
    app.onexitfs(function() {
        app.data.mode = 'editor';
        app.update();
        resize_window();
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
                            show:true,
                            click_event:false,
                            style: {
                                top: 0,
                                left: 0,
                                width: imgwidth,
                                height: imgheight,
                                border_style: 'solid',
                                border_color: 'black',
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
            app.data.current_slide.elements = _.filter(app.data.current_slide.elements,function(e){return e!=undefined});
            app.update();
        }
    });

    app.form('slide_form', '#hs-slide-form').on('change',function(event) {
        // Do Nothing!
    }).on('delete',function(event) {
        let index = _.findIndex(app.data.slides,{id:Number(event.form.get().id)})
        if (index >= 0) {
            delete app.data.slides[index];
            app.data.slides = _.filter(app.data.slides,function(e){return e!=undefined});
            app.update();
        }
    }).set(app.data.current_slide);
}

app.callback();
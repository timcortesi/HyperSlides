class Element{
    constructor(element_id) {
        this.current_element_id = element_id;
        this.current_element = _.find(app.data.current_slide.elements,{'id':element_id});
        if (this.current_element === undefined) {
            for (let i=0;i<app.data.slides.length;i++) {
                this.current_element = _.find(app.data.slides[i].elements,{'id':element_id});
                if (this.current_element !== undefined) {
                    break;
                }
            }
        }
        if (this.current_element === undefined) {
            throw new Error('Element ID '+element_id+' does not exist!');
        }
        return this;
    }
    async animate(endX,endY,seconds=1000) {
        let startX = this.current_element.style.left;
        let startY = this.current_element.style.top;
        let current_element = this.current_element;
        const startTime = new Date().getTime();
        return new Promise((resolve) => {
            function step() {
                const elapsed = new Date().getTime() - startTime;
                const progress = Math.min(1, elapsed / seconds);
                current_element.style.left = startX + (endX - startX) * progress;
                current_element.style.top = startY + (endY - startY) * progress;
                app.update();
                console.log('x: '+current_element.style.left+',y: '+current_element.style.top);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    resolve();
                }
            }
            window.requestAnimationFrame(step);
        });
    }
    move(x,y) {
        this.current_element.style.top = y;
        this.current_element.style.left = x; 
        app.update();
        return this;
    }
    hide() {
        this.current_element.show = false;
        app.update();
        return this;
    }
    show() {
        this.current_element.show = true;
        app.update();
        return this;
    }
}

class Slide {
    constructor(slide_id) {
        this.current_slide_id = slide_id;
        this.current_slide = _.find(app.data.slides,{'id':slide_id});
        return this;
    }
    visit() {
        app.data.current_slide = this.current_slide;
        app.update();
        return this;
    }
}

window.hs = {
    element:function(element_id) {
        let current_element = new Element(element_id);
        return current_element;
    },
    slide:function(element_id) {
        let current_slide = new Slide(element_id);
        return current_slide;
    },
    state:{},
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

app.click('.clickable',function(e) {
    e.stopPropagation();
    hs.state.current_element = _.find(app.data.current_slide.elements,{'id':Number(e.currentTarget.dataset.elem_id)});
    eval('myfunc = async function(){\n'+hs.state.current_element.script+'\n}');
    myfunc();
})

function animateDiv(current_element, endX, endY, duration) {
    startX = current_element.style.left;
    startY = current_element.style.top;
    const startTime = new Date().getTime();
    return new Promise((resolve) => {
        function step() {
        const elapsed = new Date().getTime() - startTime;
        const progress = Math.min(1, elapsed / duration);
        current_element.style.left = startX + (endX - startX) * progress;
        current_element.style.top = startY + (endY - startY) * progress;
        app.update();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            resolve();
        }
        }
        window.requestAnimationFrame(step);
    }).then(() => {
        return true;
    });
}

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
    async animate(x,y,seconds=1000) {
        await animateDiv(this.current_element,x,y,seconds);
        return this;
    }
    move(top,left) {
        this.current_element.style.top = top;
        this.current_element.style.left = left; 
        app.update();
        return this;
    }
    hide() {
        this.current_element.show = false;
        app.update();
        return this;
    }
    show() {
        this.current_element.show = false;
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
    element:Element,
    slide:Slide,
    state:{}
}

app.click('.clickable',function(e) {
    e.stopPropagation();
    hs.state.current_element = _.find(app.data.current_slide.elements,{'id':Number(e.currentTarget.dataset.elem_id)});
    eval('myfunc = async function(){\n'+hs.state.current_element.script+'\n}');
    myfunc();
})

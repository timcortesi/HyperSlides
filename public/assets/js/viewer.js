app.viewer = function() {

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

    window.hs = {
        current_element: null,
        element: function(id) {
            this.current_element = _.find(app.data.current_slide.elements,{'id':id});
            return this;
        },
        move: function(top,left) {
            this.current_element.style.top = top;
            this.current_element.style.left = left; 
            app.update();
            return this;
        },
        animate: async function(x,y,seconds=1000) {
            await animateDiv(this.current_element,x,y,seconds);
            return this;
        },
        sleep: async function(seconds=1000) {
            await animateDiv(this.current_element,this.current_element.style.left,this.current_element.style.top,seconds);
            return this;
        },
        hide: function() {
            this.current_element.show = false;
            app.update();
            return this;
        },
        show: function() {
            this.current_element.show = true;
            app.update();
            return this;
        }
    };
}

app.viewer();      



test = async function() {
    let my_element = hs.element(1);
    await my_element.animate(100,300)    
    await my_element.animate(800,600) 
    await my_element.animate(200,300)
    await my_element.animate(400,300)
    await my_element.hide();
    await my_element.sleep();
    await my_element.show();
}
class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.classList.add('sketch-pad__canvas');

        container.appendChild(this.canvas);

        this.undoBtn = document.createElement('button');
        this.undoBtn.classList.add('btn', 'btn-primary', 'mt-3');
        this.undoBtn.innerHTML = 'Undo';
        
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext("2d");

        this.reset();

        this.#addEventListners();
    }

    #addEventListners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouseMove(evt);
            this.paths.push([mouse]);
            this.isDrawing = true;

            // console.log(mouse);
        }
        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouseMove(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                /* console.log(this.paths.length); */
                this.#redraw();
            }
        }
        document.onmouseup = () => {
            this.isDrawing = false;
        }
        /* Mobile touch events */
        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmouseup(loc);
        }
        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#redraw();
        }
    }

    #getMouseMove = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }

    #redraw = () => {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        if(this.paths.length > 0) {
            this.undoBtn.disabled = false;
        } else {
            this.undoBtn.disabled = true;
        }
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }
}
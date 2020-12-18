type ICropOpts = {
	backColor: string,
	backAlpha: number,
	borderWidth: number,
	borderColor: string,
	circleRadius: number,
	circleBg: string,
	minRadius: number
};

type ISelected = {
	x: number,
	y: number,
	w?: number,
	h?: number,
	r: number
};

type ITouch = {
	x: number,
	y: number,
	dot: boolean
}

type IMovable = {
	offsetX: number,
	offsetY: number
}

let defaultOpts: ICropOpts = {
    backColor: '#000',
    backAlpha: .8,
    borderWidth: 1,
    borderColor: '#fff',
    circleRadius: 10,
    circleBg: '#fff',
    minRadius: 50
};

class CropAnimation{
	ctx: CanvasRenderingContext2D;
	opts: ICropOpts;
	touch: ITouch;
	selected: ISelected;

    constructor(private elem: HTMLCanvasElement, private img: HTMLImageElement, opts: Partial<ICropOpts>){
        this.ctx = elem.getContext('2d');
        this.touch = null;
        this.opts = {...defaultOpts, ...opts};
        this.selected = {
            x: this.elem.offsetWidth/2,
            y: this.elem.offsetHeight/2 || 50,
            r: 100
        };

		//bind methods
        this.close = this.close.bind(this);
        this.draw = this.draw.bind(this);

        //add handlers
        this.elem.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.elem.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.elem.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.elem.addEventListener('touchmove', this.onTouchMove.bind(this));

        //start draw
        this.draw();
    }

    draw(){
    	//set image sizes
        this.img.width = this.elem.offsetWidth;
        this.img.height = this.elem.offsetHeight;

        //get sizes
        let w = this.elem.width = this.elem.offsetWidth,
            h = this.elem.height = this.elem.offsetHeight;

        //draw image
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.drawImage(this.img, 0, 0, w, h);

        //draw back
        this.ctx.beginPath();
        this.ctx.rect(0, 0, w, h);
        this.ctx.arc(this.selected.x, this.selected.y, Math.abs(this.selected.r), 0, Math.PI*2);

        this.ctx.globalAlpha = this.opts.backAlpha;
        this.ctx.fillStyle = this.opts.backColor;
        this.ctx.fill('evenodd');

		this.ctx.globalAlpha = 1;

        //draw circle
        this.ctx.beginPath();
        this.ctx.moveTo(this.selected.x + this.selected.w, this.selected.y + this.selected.h);
        this.ctx.arc(
            this.selected.x + Math.cos(Math.PI/4) * this.selected.r,
            this.selected.y + Math.sin(Math.PI/4) * this.selected.r,
            this.opts.circleRadius, 0, Math.PI*2);

        this.ctx.fillStyle = this.opts.circleBg;
        this.ctx.fill();

        //draw border
        this.ctx.strokeStyle = this.opts.borderColor;
        this.ctx.lineWidth = this.opts.borderWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.selected.x, this.selected.y, Math.abs(this.selected.r), 0, Math.PI*2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    close(){
    	//add handlers
        this.elem.removeEventListener('mousedown', this.onMouseDown.bind(this));
        this.elem.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.elem.removeEventListener('touchstart', this.onTouchStart.bind(this));
        this.elem.removeEventListener('touchmove', this.onTouchMove.bind(this));
    }
    
    onTouchStart(e: TouchEvent){
        e.preventDefault();

        //get data
        let target = e.target as HTMLCanvasElement,
        	touches = e.targetTouches,
            offsetY = touches[0].clientY - target.getBoundingClientRect().top,
            offsetX = touches[0].clientX - target.getBoundingClientRect().left;

        let dot = (this.selected.x + Math.cos(Math.PI/4) * this.selected.r - offsetX)**2 +
			(this.selected.y + Math.sin(Math.PI/4) * this.selected.r - offsetY)**2;

        //set touch
        this.touch = {
            x: offsetX,
            y: offsetY,
            dot: Math.sqrt(dot) < this.opts.circleRadius
        };
    }

    onMouseDown(e: MouseEvent){
    	let dot = (this.selected.x + Math.cos(Math.PI/4) * this.selected.r - e.offsetX)**2 +
			(this.selected.y + Math.sin(Math.PI/4) * this.selected.r - e.offsetY)**2;

    	//set touch
        this.touch = {
            x: e.offsetX,
            y: e.offsetY,
            dot: Math.sqrt(dot) < this.opts.circleRadius
        };
    }

    onMove(point: IMovable){
        let w = this.elem.offsetWidth,
            h = this.elem.offsetHeight;

        if(this.touch.dot){
            //resize image
            if(Math.abs(point.offsetX - this.touch.x) > Math.abs(point.offsetY - this.touch.y))
                this.selected.r += point.offsetX - this.touch.x;
            else
                this.selected.r += point.offsetY - this.touch.y;

            if(this.selected.r + this.selected.x > w)
                this.selected.r = w - this.selected.x;

            if(this.selected.r + this.selected.y > h)
                this.selected.r = h - this.selected.y;

            if(this.selected.x - this.selected.r < 0)
                this.selected.r = this.selected.x;

            if(this.selected.y - this.selected.r < 0)
                this.selected.r = this.selected.y;

            this.selected.r = this.selected.r < this.opts.minRadius ? this.opts.minRadius : this.selected.r;
        }
        else{
            //move image
            this.selected.x += point.offsetX - this.touch.x;
            this.selected.y += point.offsetY - this.touch.y;

            if(this.selected.x < 0)
                this.selected.x = 0;
            if(this.selected.y < 0)
                this.selected.y = 0;

            if(this.selected.x + this.selected.r > w)
                this.selected.x = w - this.selected.r;

            if(this.selected.x - this.selected.r < 0)
                this.selected.x = this.selected.r;

            if(this.selected.y - this.selected.r < 0)
                this.selected.y = this.selected.r;

            if(this.selected.y + this.selected.r > h)
                this.selected.y = h - this.selected.r;
        }
    }

    onTouchMove(e: TouchEvent){
        let origTouch = e.targetTouches[0],
			touch: ITouch = {
        		x: origTouch.clientX,
				y: origTouch.clientY,

				dot: false
			};

        //move
        this.onMove({
			offsetX: origTouch.clientX - this.elem.getBoundingClientRect().left,
			offsetY: origTouch.clientY - this.elem.getBoundingClientRect().top
        });

        //set new touch
        this.touch = {
            x: origTouch.clientX - this.elem.getBoundingClientRect().left,
            y: origTouch.clientY - this.elem.getBoundingClientRect().top,
            dot: this.touch.dot
        };

        this.draw();
    }

    onMouseMove(e: MouseEvent){
        if(!e.which)
            return;

        this.onMove(e);

        this.touch = {
            x: e.offsetX,
            y: e.offsetY,
            dot: this.touch.dot
        };

        this.draw();
    }

    getData(): Promise<Blob>{
        //draw image
        this.ctx.drawImage(this.img, 0, 0, this.elem.offsetWidth, this.elem.offsetHeight);

        //get img
        let canv = document.createElement('canvas'),
            imgData = this.ctx.getImageData(this.selected.x - this.selected.r,
                this.selected.y - this.selected.r,
                this.selected.r*2, this.selected.r*2);

        canv.width = canv.height = this.selected.r*2;

        canv.getContext('2d').putImageData(imgData, 0, 0);


        return new Promise( (resolve, reject) => {
            canv.toBlob( (blob) => {
                canv.remove();
                this.draw();

               resolve(blob);
            });
        });
    }
}

export default CropAnimation;

const canvasSketch = require('canvas-sketch');
const math  = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [ 1080, 1080],
    // animate: true
};


class Arc {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0,0, width, length);
        // changed from .5 to be at the bottom right corner
        const cx = .5 ;
        const cy = .5;

        let x, y;


        



        const w = width * .01;
        const h = height * .1;

        const num = 47;
        const radius = width * .5;

        for (let i = 0; i < num; i++) {
            const slice = math.degToRad(360 / num);
            const angle = slice * i;

            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(-angle);

            // set reset state
            context.save();

            context.translate(x, y);

            // give context to rotate figures at a negative angle
            context.rotate(-angle);

            context.scale(random.range(.8,2), random.range(.5, .5));


            context.beginPath();
            context.rect(-w * .8, random.range(0, -h *.5), w, h);
            context.fill();

            context.restore();

            // new sate
            context.save();

            context.translate(cx, cy);
            context.rotate(-angle);

            context.lineWidth= random.range(2, 17);
            context.beginPath();
            

            // i have no idea but it's cool
            // i have an idea now, its about the range the arcs are created from the starting point in cx and cy
            context.arc(.5, .5, random.range(radius * random.range(.3, .7), radius  * 1.2), slice * random.range(0, -8) ,slice * random.range(.5, 5));

            context.stroke();

            context.restore();
        }


    };
};

canvasSketch(sketch, settings);

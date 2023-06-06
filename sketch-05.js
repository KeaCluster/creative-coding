const canvasSketch = require('canvas-sketch');

const params = { 
    text: 'Z',
    fontSize: 1200,
    fontFamily: 'Verdana'
}

let manager;

const settings = {
    dimensions: [ 1080, 1080 ],
};


const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'black';
        context.font = `${params.fontSize}px ${params.fontFamily}`;
        context.textBaseline = 'top';
        // context.textAlign = 'center';


        const metrics = context.measureText(params.text);
        // find margin x && y
        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        // find hegiht and width
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        // center of item within container context
        // Basically actual x and y from the center of the canvas
        const x = (width - mw) * .5 - mx;
        const y = (height - mh) * .5 - my;

        context.save();


        context.translate(x, y);
        //context.translate(width * .5, height * .5);



        context.fillText(params.text,0 ,0);
        context.restore();

    }
};

const keyUpHandler = e => {
    params.text = e.key.toUpperCase();
    manager.render();
}

document.addEventListener('keyup', keyUpHandler)

const start = async () => {
    manager = await canvasSketch(sketch, settings);
}

start();


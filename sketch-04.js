const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tewakpane = require('tweakpane');


const params = {
    cols: 10,
    rows: 10,
    scaleMin: 1,
    scaleMax: 30,
    freq: 0.001,
    amp: 0.2,
    animate: true,
    frame: 0,
    lineCap: 'butt',
    wave: this.cols
}

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

const sketch = () => {
    return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        // define layout
        const columns = params.cols;
        const rows = params.rows;
        const numCells = columns * rows;

        // define dimensions
        const gridw = width * .8;
        const gridh = height * .8;
        const cellw = gridw / columns;
        const cellh = gridh / rows;

        // define margins on x and y axis
        const margx = (width - gridw) * .5;
        const margy = (height - gridh) * .5;

        for(let i = 0; i < numCells; i++) {
            // Math magic shit
            const col = i % columns;
            const row = Math.floor(i / columns);


            // define x and y coordinates and add margin on x and y to center
            const x = col * cellw + margx;
            const y = row * cellh + margy;
            const w = cellw * 0.8;
            const h = cellh * 0.8;

            const f = params.animate ? frame : params.frame;

            // create noise
            // params.freq was previously 0.001 and params.amp was 0.2
            //const n = random.noise2D(x + frame * 10, y, params.freq);
            const n = random.noise3D(x, y, f * 10, params.freq);
            const angle = n * Math.PI * params.amp;
            
            // more weird math stuff to range values from -1 and 1 into 1 and 30
            // const scale = (n + 1) / 2 * 30;
            // this does exactly as the line before
            // scaleMin && scaleMax come from our object, previously 1 and 36
            const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);


            context.save();
            context.translate(x, y);

            // Move to center of each cell
            context.translate(cellw * .5, cellh * .5);
            context.rotate(angle);

            context.lineWidth = scale;
            context.lineCap = params.lineCap;

            context.beginPath();
            context.moveTo(w * -.5, 0);
            context.lineTo(w * .5, 0);
            context.stroke();

            context.restore();
        }

    };
};

const createPane = () => {
    const pane = new Tewakpane.Pane();
    let folder;

    folder = pane.addFolder({title: 'Grid'});
    folder.addInput(params, 'lineCap', {options: {
        Butt: 'butt',
        Square: 'square',
        Round: 'round'
    }});
    folder.addInput(params, 'cols', {min: 1, max: 50, step: 1});
    folder.addInput(params, 'rows', {min: 1, max: 50, step: 1});
    folder.addInput(params, 'scaleMin', {min:1, max:100});
    folder.addInput(params, 'scaleMax', {min:1, max:100});

    folder = pane.addFolder({title: 'Noise'});
    folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
    folder.addInput(params, 'amp', {min: 0, max: 1});
    folder.addInput(params, 'animate');
    folder.addInput(params, 'frame', {min: 0, max: 999});

    folder = pane.addFolder({title: 'Monitor'});
    folder.addMonitor(params, 'frame', {
        view: 'graph',
        min: -1,
        max: 999
    })
}

createPane();

canvasSketch(sketch, settings);

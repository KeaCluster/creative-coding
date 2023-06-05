const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

class Arc {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Arc(x, y);
        this.vel = new Arc(random.range(-1,1), random.range(-1,1));
        this.radius = random.range(4, 12);
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(context, width, height, angle) {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.rotate(-angle);

        context.scale(random.range(.5, 1), random.range(.5,.5));

        context.beginPath();
        context.rect(-width * .01 * .8, random.range(0, -height * .1 * .5), width * .01, height * .1);
        context.restore();


        // new state
        context.lineWidth=random.range(2, 17);
        context.restore();

        context.arc(.5, .5, random.range(this.radius * random.range(.3, .7), this.radius * 1.2), slice * random.range(0, -8), slice * random.range(.5, 5));

        context.stroke()
        context.restore();
    }
}

const sketch = () => {

    const agents = [];
    const radius = width * .5;

    const slice = math.degToRad(360 / 45);
    const angle = slice * i;

    const x = .5 + radius * Math.sin(angle);
    const y = .5 + radius * Math.sin(-angle);


    for(let i = 0; i <= 45; i++) {
        agents.push(new Agent(x, y))
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        agents.forEach(agent => {
            agent.update();

            agent.draw(context, width, height, angle);
        })
    };
};

canvasSketch(sketch, settings);

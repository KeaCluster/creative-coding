const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


const params = {
    totalAgents: 40,
    lineWidth: 4,
    maxDistance: 200,
    animate: true,
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Calculate distance between initial point and destination > pythagoras
    getDistance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

}

class Agent {
    constructor(x, y) {
        // builds a point
        this.pos = new Vector(x, y);
        this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
        this.radius = random.range(4, 12);
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    // method drawing, plotting and rendering
    draw(context) {
        // movement
        context.save()
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 4;

        // rendering
        context.beginPath();
        context.arc( 0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.restore();
    }

    // check collision with boundaries and invert velocity 
    bounce(width, height) {
        if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
        if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    }

    wrap(width, height) {
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y < 0) this.pos.y = height;
    }
}


const settings = {
    dimensions: [ 1080, 1080 ],
    animate: params.animate,
};

const sketch = ({context, width, height}) => {

    const agents = [];

    for (let i = 0; i < params.totalAgents; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);

        agents.push(new Agent(x, y));
    }


    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        for (let i = 0; i < agents.length; i++) {
            const agent = agents[i];

            for (let j = i +1; j < agents.length; j++) {
                const other = agents[j];

                const distance = agent.pos.getDistance(other.pos);

                // draw only if
                if(distance > params.maxDistance) continue;

                context.lineWidth = math.mapRange(distance, 0, params.maxDistance, params.lineWidth, 1);
                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);
                context.stroke();
            }
        }

        agents.forEach(agent => {
            agent.update();
            //agent.bounce(width, height);
            agent.wrap(width, height);
            agent.draw(context);
        });

    };
};

const createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;

    folder = pane.addFolder({title: 'Config'});
    folder.addInput(params, 'totalAgents', {min: 1, max: 100, step: 5});
    folder.addInput(params, 'maxDistance', {min: 0, max: 400});
    folder.addInput(params, 'lineWidth', {min: 0, max: 12});

    folder = pane.addFolder({title: 'Animate'});
    folder.addInput(params, 'animate');
}

createPane();

canvasSketch(sketch, settings);

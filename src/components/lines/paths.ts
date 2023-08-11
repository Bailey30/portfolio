let canvas: HTMLElement | null | any;
// let ctx: AnimationEffect | null | undefined | any;
let currentAnimation: any;

// window.addEventListener("resize", function () {
//     cancelAnimationFrame(currentAnimation);
//     canvas!.height = window.innerHeight;
//     canvas!.width = window.innerWidth;
//     const anim = new Paths(ctx, canvas.width, canvas.height);

//     // animation.animate(0);
// });

// document.addEventListener("mousemove", (e) => {});

let mouse = { x: 0, y: 0 };

export class Paths {
    ctx: any;
    width: any;
    height: any;
    lastTime: number;
    interval: number;
    timer: number;
    velocity: number;
    posY: any;
    grid: any[];
    gridSize: number;
    mouse: { x: number | undefined; y: number | undefined };
    containerRect: any;
    radius: number;
    minRadius: number;
    gradient: any;
    maxArea: number;
    isDrawing: boolean;

    constructor(ctx: any, width: any, height: any, containerRect: any) {
        canvas = document.getElementById("canvas");
        canvas.width = width;
        canvas.height = height;
        document.addEventListener(
            "mousemove",
            (e: { clientX: number; clientY: number }) => {
                mouse.x = e.clientX - this.containerRect.left;
                mouse.y = e.clientY - this.containerRect.top;
            }
        );
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.containerRect = containerRect;

        this.isDrawing = true;
        this.gradient = "";
        this.createGradient();
        this.ctx!.fillStyle = this.gradient;
        this.lastTime = performance.now();
        this.interval = 1000 / 60;
        this.timer = 0;
        this.velocity = 1;
        this.posY = this.height;
        this.grid = [];
        this.mouse = { x: undefined, y: undefined };
        this.gridSize = 20;
        this.radius = 20;
        this.minRadius = 0;
        this.maxArea = 100;
        this.createGrid();
    }

    stopAnimation() {
        console.log("stop");
        cancelAnimationFrame(currentAnimation);
    }
    draw(timeStamp: number) {
        // if (!this.isDrawing) return;

        let deltaTime = timeStamp - this.lastTime;

        this.lastTime = timeStamp;
        this.ctx!.clearRect(0, 0, this.width, this.height);
        this.radius += this.velocity;
        for (let y = 0; y < this.height; y += this.gridSize) {
            for (let x = 0; x < this.width; x += this.gridSize) {
                var posx = x;
                var posy = y;
                let dx = mouse.x - posx; // distance between on the x axis
                let dy = mouse.y - posy; // distance between on the y axis
                let distance = dx * dx + dy * dy;
                let r = 1;

                // let size = 10 - distance / 500;
                // if (distance / 100 < 100) {
                //     // r += Math.max(5 - distance / 1000, 2);
                //     if (size > 0) {
                //         r += size;
                //     } else {
                //         r = 1;
                //     }
                // }

                if (posx === mouse.x) {
                    // r += this.radius;
                }

                this.ctx!.fillStyle = "black";
                this.ctx!.beginPath();
                this.ctx!.arc(x, y, r, 0, 2 * Math.PI);
                // this.ctx!.moveTo(x, y);
                // this.ctx!.lineTo(mouse.x, mouse.y);
                this.ctx!.stroke();
                // this.ctx!.fill();
            }
        }
        currentAnimation = requestAnimationFrame(this.draw.bind(this));
    }

    drawGrid(timestamp: number) {
        this.ctx!.clearRect(0, 0, this.width, this.height);
        // this.ctx!.fillStyle = this.gradient;
        this.ctx!.font = "10px serif";
        this.ctx!.fillStyle = "white";
        const maxArea = 100;
        const increaseVelocity = 3;
        const decreaseVelocity = 0.15;

        // this.ctx!.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.grid.length; i += 1) {
            let x = this.grid[i].x;
            let y = this.grid[i].y;

            let dx = mouse.x - x; // distance between on the x axis
            let dy = mouse.y - y; // distance between on the y axis
            let pt = Math.sqrt(dx * dx + dy * dy); // distance from dot to mouse
            // let dotSize = this.radius - (pt * 2) / this.gridSize; // the size of each dot based on its distance from the mouse (pt * 2 normalizes the value somehow)

            // Calculate the normalized distance ratio
            let distanceRatio = Math.min(pt / maxArea, 1);

            // Calculate the desired dot size based on distanceRatio
            let dotSize = (this.radius - this.minRadius) * (1 - distanceRatio);

            // Limit the dot size to the defined range
            dotSize = Math.max(this.minRadius, Math.min(this.radius, dotSize));

            // this.grid[i].r = dotSize;

            let br = 0; // the maximum size the dot should be based on how far it is from the mouse
            let ar = 0; // the size the dot becomes after being increased (it goes over the max amount)
            let dr = ar - br; //

            if (pt < maxArea) {
                if (this.grid[i].r < dotSize) {
                    br = this.radius - (pt * 2) / this.gridSize;

                    this.grid[i].r += dotSize;
                    ar = this.grid[i].r;
                }
                // if (this.grid[i].r > dotSize ) {
                //     console.log(br, ar, dr);
                //     this.grid[i].r -= 0.1;
                // }

                // this.ctx!.fillStyle = "black";
                // this.ctx!.fillText(this.grid[i].r.toFixed(2), x, y);
            } else {
                // trail fades over time
                if (this.grid[i].r > decreaseVelocity + 3) {
                    this.grid[i].r -= decreaseVelocity;
                }
            }
            // this.ctx!.fillStyle = "white";

            this.grid[i].x -= 2;
            this.grid[i].y -= 1;

            if (this.grid[i].x < 0 - maxArea) {
                this.grid[i].x = this.width;
                this.grid[i].r = 0;
            }
            if (this.grid[i].y < 0 - maxArea) {
                this.grid[i].y = this.height;
                this.grid[i].r = 0;
            }

            this.ctx!.beginPath();
            this.ctx!.arc(x, y, this.grid[i].r.toFixed(2), 0, 2 * Math.PI);

            this.ctx!.fill();
        }
        // this.ctx!.arc(mouse.x, mouse.y, maxArea, 0, 2 * Math.PI);
        // this.ctx!.stroke();
        currentAnimation = requestAnimationFrame(this.drawGrid.bind(this));
    }

    createGrid() {
        for (let y = 0; y < this.height + this.maxArea; y += this.gridSize) {
            for (let x = 0; x < this.width + this.maxArea; x += this.gridSize) {
                this.grid.push({ x: x, y: y, r: this.minRadius });
            }
        }

        this.drawGrid(0);
    }

    createGradient() {
        this.gradient = this.ctx!.createLinearGradient(
            0,
            0,
            this.width,
            this.height
        );

        this.gradient.addColorStop(0.05, "rgba(244, 244, 244, 1)");
        this.gradient.addColorStop(0.15, "rgba(240, 197, 209, 1)");
        this.gradient.addColorStop(0.2, "rgba(209, 183, 190, 1)");
        this.gradient.addColorStop(0.23, "rgba(255, 255, 255, 1)");
        this.gradient.addColorStop(0.54, "rgba(240, 197, 209, 1)");
        this.gradient.addColorStop(0.66, "rgba(248, 247, 255, 1)");
        this.gradient.addColorStop(0.68, "rgba(166, 191, 228, 1)");
        this.gradient.addColorStop(0.75, "rgba(209, 183, 190, 1)");
        this.gradient.addColorStop(0.84, "rgba(169, 194, 230, 1)");
        this.gradient.addColorStop(0.88, "rgba(237, 240, 245, 1)");
    }
}

// canvas = document.getElementById("canvas");
// ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// animation.animate(0);

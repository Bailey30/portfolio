let canvas: HTMLElement | null | any;
// let ctx: AnimationEffect | null | undefined | any;
// let currentAnimation: number;

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
    gradient: any;
    constructor(ctx: any, width: any, height: any, containerRect: any) {
        canvas = document.getElementById("canvas");
        document.addEventListener(
            "mousemove",
            (e: { clientX: number; clientY: number }) => {
                mouse.x = e.clientX - containerRect.left;
                mouse.y = e.clientY - containerRect.top;
            }
        );
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.gradient = "";
        this.createGradient();
        this.ctx!.fillStyle = this.gradient;
        this.lastTime = performance.now();
        this.interval = 1000 / 60;
        this.timer = 0;
        this.velocity = 1;
        this.posY = this.height;
        this.grid = [];
        this.gridSize = 20;
        this.mouse = { x: undefined, y: undefined };
        this.radius = 5;
        this.createGrid();
    }
    draw(timeStamp: number) {
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
        requestAnimationFrame(this.draw.bind(this));
    }

    drawGrid(timestamp: number) {
        this.ctx!.clearRect(0, 0, this.width, this.height);
        this.ctx!.fillStyle = this.gradient;
        // this.ctx!.fillStyle = "white";

        // this.ctx!.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.grid.length; i += 1) {
            let x = this.grid[i].x;
            let y = this.grid[i].y;
            let r = this.grid[i].r;

            let dx = mouse.x - x; // distance between on the x axis
            let dy = mouse.y - y; // distance between on the y axis
            // let distance = dx * dx + dy * dy;
            // let maxDistance = distance / 100;
            // let size = Math.max(distance / 500, 0);
            let distance = (dx * dx + dy * dy) / 300;
            let size = Math.max((distance * distance) / 100, 0); // the amount to remove from max radius - the further away, the more you remove

            if (distance < 10) {
                // dots increase in size
                if (this.grid[i].r < this.radius - size) {
                    // console.log(size);
                    // this.grid[i].r += Math.max(2 - size, 0);
                    this.grid[i].r += 3;
                }
            } else if (distance > 10) {
                // trail fades over time
                if (this.grid[i].r >= 1) {
                    this.grid[i].r -= 0.05;
                }
            }

            this.ctx!.beginPath();
            this.ctx!.arc(x, y, r, 0, 2 * Math.PI);

            this.ctx!.fill();
        }
        // this.ctx!.arc(mouse.x, mouse.y, 100, 0, 2 * Math.PI);
        // this.ctx!.stroke();
        requestAnimationFrame(this.drawGrid.bind(this));
    }

    createGrid() {
        for (let y = 0; y < this.height; y += this.gridSize) {
            for (let x = 0; x < this.width; x += this.gridSize) {
                this.grid.push({ x: x, y: y, r: 1 });
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

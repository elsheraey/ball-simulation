class Ball {
  constructor(mass, x, y) {
    this.mass = mass;
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.element = null;
    this.destroyed = false;
  }

  applyForce(force) {
    this.velocity.x += force.x / this.mass;
    this.velocity.y += force.y / this.mass;
  }

  update(deltaTime, containerWidth, containerHeight) {
    this.applyForce({ x: 0, y: this.mass * 9.81 });

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    if (this.position.x < 0 || this.position.x + 50 > containerWidth) {
      this.velocity.x = -this.velocity.x;
      this.position.x = Math.max(
        0,
        Math.min(this.position.x, containerWidth - 50)
      );
    }

    if (this.position.y < 0 || this.position.y + 50 > containerHeight) {
      this.velocity.y = -this.velocity.y;
      this.position.y = Math.max(
        0,
        Math.min(this.position.y, containerHeight - 50)
      );
    }

    this.updateElement();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.className = "ball";
    this.element.innerText = "Ball";
    document.getElementById("simulationArea").appendChild(this.element);
    this.updateElement();
  }

  updateElement() {
    if (this.element && !this.destroyed) {
      // this.element.style.translateX = `${this.position.x}px`;
      // this.element.style.translateY = `${this.position.y}px`;
      this.element.style.transform = `translateX(${this.position.x}px) translateY(${this.position.y}px) translateZ(0)`;
    }
  }

  destroy() {
    if (this.element) {
      this.element.parentNode.removeChild(this.element);
      this.destroyed = true;
    }
  }
}

const containerWidth = window.innerWidth;
const containerHeight = window.innerHeight;

function randomForce() {
  const angle = Math.random() * Math.PI * 2;
  const magnitude = Math.random() * 10 + 5;
  return {
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude,
  };
}

const balls = [];
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * (containerWidth - 50);
  const y = Math.random() * (containerHeight - 50);
  const ball = new Ball(2, x, y);
  ball.createElement();
  ball.applyForce(randomForce());
  balls.push(ball);
}

function checkCollisions() {
  // TODO: Impelement collision detection
}

function updateWorld(deltaTime) {
  balls.forEach((ball) => {
    if (!ball.destroyed) {
      ball.update(deltaTime, containerWidth, containerHeight);
    }
  });
  checkCollisions();
}

setInterval(() => updateWorld(0.16), 16); // 60 FPS

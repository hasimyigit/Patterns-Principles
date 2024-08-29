class Circle {
  private draws: Map<string, number>;

  constructor(public radius: number) {}

  draw(x: number, y: number) {
    const key = `${x}:${y}`;

    if (this.draws.has(key)) {
      return this.draws.get(key);
    }

    //Do complex Algorithm.
  }
  clear() {
    this.draws.clear();
  }
}

const circle = new Circle(1);

circle.draw(1, 3); //The result is calculated
circle.draw(1, 3); //The result is from memory

circle.clear();

circle.draw(1, 3); //The result is calculated.
circle.draw(1, 3); //The result is from memory.

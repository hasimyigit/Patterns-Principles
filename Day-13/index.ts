//Example for custom class
class Car {
  private speed: number;
  constructor() {
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    return this; // Return the current instance
  }

  brake(amount) {
    this.speed -= amount;
    return this; // Return the current instance
  }

  getSpeed() {
    console.log(`Current speed : ${this.speed} km/h`);
    return this; // Return the current instance
  }
}

const myCar = new Car();
myCar.accelerate(50).getSpeed().brake(20).getSpeed();

//example for HOC function

const numbers = [1, 2, 3, 4, 5];

const result = numbers
  .map((num) => num * 2) //Multiply each element by 2
  .filter((num) => num > 5) //Keep only elements greater than 5
  .reduce((acc, num) => acc + num, 0); // Sum all the remaining elements

console.log(result); // Output : 18

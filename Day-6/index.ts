class Car {
  constructor(
    public make: string,
    public model: string,
    public year: number,
    public isElectric: boolean
  ) {}
}

class CarBuilder {
  private make: string;
  private model: string;
  private year: number;
  private isElectric: boolean;

  setMake(make: string): this {
    if (make === "Polenez") {
      throw Error("Tofaş");
    }
    this.make = make;
    return this;
  }

  setModel(model: string): this {
    this.model = model;
    return this;
  }

  setYear(year: number): this {
    if (year < 1886) throw Error("The year must be greater than 1886");
    this.year = year;
    return this;
  }

  setIsElectric(isElectric: boolean): this {
    this.isElectric = isElectric;
    return this;
  }

  build(): Car {
    if (!this.make || !this.model || !this.year) {
      throw Error("Build cannot be done!");
    }
    return new Car(this.make, this.model, this.year, this.isElectric);
  }
}

const carBuilder = new CarBuilder();

const car = carBuilder
  .setMake("Tesla")
  .setModel("Model S")
  .setYear(2024)
  .setIsElectric(true)
  .build();

console.log(car);

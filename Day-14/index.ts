

interface Strategy {
    execute(a: number, b:number):number;
}

class AddStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a+b;
    }
}

class SubtractStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a-b;
    }
}

class MultiplyStrategy implements Strategy {
    execute(a: number, b: number): number {
        return a*b;
    }
}



class Operations {
    private operation = {
        add: this.add,
        subtract: this.subtract,
        multiply: this.multiply
    };

    execute(operation: keyof typeof this.operation, a: number, b: number): number {
        const func = this.operation[operation];
        return func(a, b);
    }

    private add(a: number, b: number): number {
        return a + b;
    }

    private subtract(a: number, b: number): number {
        return a - b;
    }

    private multiply(a: number, b: number): number {
        return a * b;
    }
}


const ops = new Operations();
console.log(ops.execute("add", 5, 3));       // Output: 8
console.log(ops.execute("subtract", 5, 3));  // Output: 2
console.log(ops.execute("multiply", 5, 3));  // Output: 15
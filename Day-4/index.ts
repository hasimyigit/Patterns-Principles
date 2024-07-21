//Today, let's discuss something lightweight - the  Command Query Separation principle. It's simple to understand: divide your code logic into two parts - read and write. Nothing more.
//How you achieve this division doesn't matter; the important part is to ensure the separation exists.

//Before
(function () {
  class Stack<T> {
    private items: T[] = [];

    private sort(a: T, b: T): number {
      //Complex sorting logic.
      return 1;
    }

    push(item: T): T[] {
      this.items.push(item);
      return this.items.sort(this.sort);
    }

    pop(): T[] {
      if (this.items.length === 0) {
        return [];
      }
      this.items.pop();
      return this.items.sort(this.sort);
    }
  }

  interface TodoItem {
    id: number;
    content: string;
  }

  const toDoApp = () => {
    const stack = new Stack<TodoItem>();

    stack.push({ id: 0, content: "Play Football" });
    const items = stack.push({ id: 1, content: "Buy Wegetables" });

    if (items.length === 2) {
      alert("You've added your first tasks");
    }
  };
})();

//After

(function () {
  class Stack<T> {
    private items: T[] = [];

    private sort(a: T, b: T): number {
      //Complex sorting logic.
      return 1;
    }

    push(item: T) {
      this.items.push(item);
    }

    pop() {
      if (this.items.length === 0) {
        return;
      }
      this.items.pop();
    }

    sorted() {
      return this.items.sort(this.sort);
    }

    hasLength(value: number): boolean {
      return this.items.length === value;
    }
  }

  interface TodoItem {
    id: number;
    content: string;
  }

  const toDoApp = () => {
    const stack = new Stack<TodoItem>();

    stack.push({ id: 0, content: "Play Football" });
    stack.push({ id: 1, content: "Buy Wegetables" });

    if (stack.hasLength(2)) {
      alert("You've added your first tasks");
    }
  };
})();

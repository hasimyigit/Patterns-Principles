// Interface that describes a human.
interface Human {
    firstName: string;
    lastName: string;
    say(message: string): void;
  }
  
  // The data author of the propagation command.
  type Who = Pick<Human, 'firstName' | 'lastName'>
  
  // Interface for any Mediator.
  interface Mediator {
    propagate(who: Who, message: string): void;
  }
  
  class Husband implements Human {
    firstName = "Tom";
    lastName = "Potato";
  
    // Mediator is injected via constructor.
    constructor(private mediator: Mediator) {}
  
    // Method calls the propagate method from the Mediator.
    say(message: string) {
      this.mediator.propagate(
        {
          firstName: this.firstName,
          lastName: this.lastName
        },
        message
      );
    }
  }
  
  class Wife implements Human {
    firstName = "Jenny";
    lastName = "Potato";
  
    constructor(private mediator: Mediator) {}
  
    say(message: string) {
      this.mediator.propagate(
        {
          firstName: this.firstName,
          lastName: this.lastName
        },
        message
      );
    }
  }
  
  // Utility class with complex logic that prepares documentation.
  class DivorcePapers {
    prepare() {
      // Complex process...
    }
  }
  
  // Concrete Mediator - in our case, a divorce Mediator.
  class DivorceMediator implements Mediator {
    // Utility function to send a response.
    private answer(message: string) {
      console.log(message);
    }
  
    propagate(who: Who, message: string) {
      // Based on the author, we propagate different logic.
      if (who.firstName === "Tom" && message.includes("hate")) {
        new DivorcePapers().prepare();
        this.answer(
          `Don't worry, ${who.firstName}, the papers will be prepared!`
        );
        return;
      }
  
      if (who.firstName === "Jenny") {
        this.answer("Tom already asked me for the necessary documents.");
      }
    }
  }
  
  // This instance handles everything.
  const dMediator = new DivorceMediator();
  
  // The husband does not know about the wife. There is no direct relationship.
  const husband = new Husband(dMediator);
  const wife = new Wife(dMediator);
  
  husband.say("I hate her!!!");
  // Logs: "Don't worry, Tom, the papers will be prepared!"
  wife.say("He is ugly!!!");
  // Logs: "Tom already asked me for the necessary documents."
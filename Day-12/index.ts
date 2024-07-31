//Class-Based Implementation
// Handler interface
interface Logger {
  setNext(logger: Logger): Logger;
  log(message: string, level: string): void;
}

// Abstract base handler
abstract class AbstractLogger implements Logger {
  private nextLogger: Logger | null = null;

  setNext(logger: Logger): Logger {
    this.nextLogger = logger;
    return logger;
  }

  log(message: string, level: string): void {
    if (this.shouldHandle(level)) {
      this.write(message);
    }

    if (this.nextLogger) {
      this.nextLogger.log(message, level);
    }
  }

  protected abstract shouldHandle(level: string): boolean;
  protected abstract write(message: string): void;
}

// Concrete Handlers
class InfoLogger extends AbstractLogger {
  protected shouldHandle(level: string): boolean {
    return level === "INFO";
  }

  protected write(message: string): void {
    console.log(`Info: ${message}`);
  }
}

class WarningLogger extends AbstractLogger {
  protected shouldHandle(level: string): boolean {
    return level === "WARNING";
  }

  protected write(message: string): void {
    console.warn(`Warning: ${message}`);
  }
}

class ErrorLogger extends AbstractLogger {
  protected shouldHandle(level: string): boolean {
    return level === "ERROR";
  }

  protected write(message: string): void {
    console.error(`Error: ${message}`);
  }
}

// Usage
const infoLogger = new InfoLogger();
const warningLogger = new WarningLogger();
const errorLogger = new ErrorLogger();

infoLogger.setNext(warningLogger).setNext(errorLogger);

infoLogger.log("Application started", "INFO");
infoLogger.log("Some warning message", "WARNING");
infoLogger.log("Critical error occurred", "ERROR");

//Pure Function Implementation
(function () {
  type Logger = (message: string, level: string) => void;

  const createLogger =
    (
      shouldHandle: (level: string) => boolean,
      write: (message: string) => void
    ): Logger =>
    (message, level) => {
      if (shouldHandle(level)) {
        write(message);
      }
    };

  // Usage
  const infoLogger: Logger = createLogger(
    (level) => level === "INFO",
    (message) => console.log(`Info: ${message}`)
  );

  const warningLogger: Logger = createLogger(
    (level) => level === "WARNING",
    (message) => console.warn(`Warning: ${message}`)
  );

  const errorLogger: Logger = createLogger(
    (level) => level === "ERROR",
    (message) => console.error(`Error: ${message}`)
  );

  const logChain: Logger = (message, level) => {
    infoLogger(message, level);
    warningLogger(message, level);
    errorLogger(message, level);
  };

  // Usage
  logChain("Application started", "INFO");
  logChain("Some warning message", "WARNING");
  logChain("Critical error occurred", "ERROR");
});

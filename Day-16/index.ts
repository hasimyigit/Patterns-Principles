// Holds a list of initialized stuff.
const instances = new Map<string, unknown>();
// "Key" and "Value" generics hold types for key and value.
const Singleton = <Key extends string, Value>(
  key: Key,
  initializer: () => Value,
) => {
  // Assertion is required here.
  if (instances.has(key)) return instances.get(key) as Value;
  // Inits when the key does not exist.
  const instance = initializer();
  // Sets an instance and returns it.
  instances.set(key, instance);

  return instance;
};
// Creates an instance of an error object.
const error = Singleton(`error`, () => ({
  message: `something`,
  type: `error`,
}));

// This will return the first "error" instance 👆
Singleton(`error`, () => ({
  message: `something`,
  type: `error`,
}));

// Creates an instance of a modal object.
const modal = Singleton(`modal`, () => ({
  message: `something1`,
  type: `error1`,
}));

// This will return the first "modal" instance 👆
Singleton(`modal`, () => ({
  message: `something1`,
  type: `erro1r`,
}));

// index.ts
const errorManager = Singleton(`error`, () => {
    let message: string | null;
  
    return {
      get: () => message,
      set: (newMessage: string) => {
        message = newMessage;
        return message;
      },
    };
  });
  
  // In any other file in your app code.
  const msg = errorManager.get();
  
  if (msg) {
    throw Error(msg);
  }
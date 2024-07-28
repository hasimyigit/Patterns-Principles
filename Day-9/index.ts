// Helper types for Observer pattern implementation.
type Subscription = () => void;
type Unsubscribe = () => void;
// The "data" parameter is our "subject" from definition.
type Next<Data> = (data: Data) => void;

// Interface defining the API of the "Observer" pattern implementation.
interface Observable<Data> {
  // Subscribe to changes with a callback function.
  subscribe(next: Next<Data>): Unsubscribe;
  // Unsubscribe all listeners.
  unsubscribeAll(): void;

  next: Next<Data>;
  // Get the current data snapshot.
  snapshot(): Data;
}

// Factory function to create an Observer instance.
const Observer = <Data>(initialData: Data): Observable<Data> => {
  // Data to pass through
  let currentData = initialData;
  // Stores a mapping of unique IDs to callback functions.
  const subscriptions = new Map<string, Next<Data>>();

  return {
    // Subscribe to changes and return an unsubscribe function.
    subscribe: (next) => {
      const id = new Date().toISOString();

      subscriptions.set(id, next);
      // Unsubscribe function.
      const unsubscribe: Unsubscribe = () => {
        subscriptions.delete(id);
      };
      return unsubscribe;
    },
    // Unsubscribe all listeners.
    unsubscribeAll: () => subscriptions.clear(),
    // Update data and notify all subscribed functions.
    next: (data: Data) => {
      // Set new data.
      currentData = data;
      // Notify all subscribed functions with the new data.
      subscriptions.forEach((sub: Next<Data>) => {
        sub(currentData);
      });
    },
    // Get the current data snapshot.
    snapshot: () => currentData,
  };
};

// Create an Observer instance with initial data.
const user = Observer({ id: 1, username: "hasimyigit" });

// Subscribe to changes and log data.
const unsubscribe = user.subscribe((data) => {
  // Log the data whenever the "next" function is called.
  console.log(data);
});

// Trigger a data update.
user.next({ id: 2, username: "hasimyigit" });

// Log the latest data snapshot.
console.log(user.snapshot());

// Unsubscribe, and the callback inside "subscribe" will no longer be triggered.
unsubscribe();

// Remove all listeners that have been created.
user.unsubscribeAll();

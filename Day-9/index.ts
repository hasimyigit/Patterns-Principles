type Subscription = () => void;
type Unsubscribe = () => void;

type Next<Data> = (data: Data) => void;

interface Observable<Data> {
  subscribe(next: Next<Data>): Unsubscribe;

  unsubscribeAll(): void;

  next: (data: Data) => void;

  snapshot(): Data;
}

const Observer = <Data>(initialData: Data): Observable<Data> => {
  let currentData = initialData;

  const subscriptions = new Map<string, Next<Data>>();

  return {
    subscribe: (next) => {
      const id = new Date().toISOString();

      subscriptions.set(id, next);

      const unsubscribe: Unsubscribe = () => {
        subscriptions.delete(id);
      };
      return unsubscribe;
    },

    unsubscribeAll: () => subscriptions.clear(),

    next: (data) => {
      currentData = data;

      subscriptions.forEach((sub) => {
        sub(currentData);
      });
    },
    snapshot: () => currentData,
  };
};

const user = Observer({id:1, username:'hasimyigit'});

const unsubscribe = user.subscribe((data)=>{
    console.log(data)
})

user.next({id:2,username:'hasimyigit'});

console.log(user.snapshot())

unsubscribe();

user.unsubscribeAll();

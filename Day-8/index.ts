//Proxy example 1
(function () {
  const ProtectedObject = {
    name: "John",
    last: "Smith",
    age: 30,
  };

  const Handler = {
    get: (target, prop) => {
      if (prop.includes("_")) {
        return prop
          .split("_")
          .map((prop) => `${prop}:${target[prop]}`)
          .join("\n");
      }
      return target[prop];
    },
  };

  const ProxyProtectedObject = new Proxy(ProtectedObject, Handler);

  console.log(ProxyProtectedObject.name_last_age); // name: "John", last: "Smith", age: 30.
});
//Proxy example 2
(function () {
  const httpGet = (url: string) => fetch(url).then((res) => res.json());

  const createWebService = (baseUrl) =>
    new Proxy(
      {},
      {
        get(target: object, propKey: string, receiver) {
          return () => httpGet(`${baseUrl}/${propKey}`);
        },
      }
    ) as Record<string, () => Promise<any>>;

  const service = createWebService("https://jsonplaceholder.typicode.com");

  service.todos().then((data) => console.log(data));
  // output : [{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }, {...
  service.users().then((data) => console.log(data));
  // output : [{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@apri...
});

// Without Proxy
(function () {
  class RealTarget {
    static operation() {
      console.log("RealTarget : Performing operation");
    }
  }

  class ProxyAdapter {
    operation() {
      console.log("ProxyAdapter: Logging before operation.");
      new RealTarget.operation();
      console.log("ProxyAdapter: Logging after operation.");
    }
  }
  // Calling it
  const realTarget = new ProxyAdapter();
  //The result will be 3x console.logs
  realTarget.operation();
});
// Without Proxy
(function () {
  class RealTarget {
    operation() {
      console.log("RealTarget : Performing operation");
    }
  }

  const proxyHandler = {
    apply: function (target, thisArg, args) {
      console.log("JS Proxy : Logging before operation.");
      const result = target.operation.apply(thisArg, args);
      console.log("JS Proxy : Logging after operation.");
      return result;
    },
  };

  const proxy = new Proxy(new RealTarget(), proxyHandler);
  // Calling it
  proxy.operation();
  //The result will be 3x console.logs
});

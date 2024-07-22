import { describe } from "node:test";

//models/user.ts
export interface User {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  age: number;
}

// Before
  const USER_MOCK: User = {
    id: "123-asd",
    name: "Tom",
    lastName: "Riddle",
    phone: "+90 555 55 55",
    email: "tom_riddle@gmail.com",
    age: 19,
  };

  const USERS_MOCK: User[] = [
    USER_MOCK,
    { ...USER_MOCK, id: "1" },
    { ...USER_MOCK, id: "2" },
  ];

  //Test file
  //users.service.test.ts
  describe("users service", () => {
    it("allow fetching users", async () => {
      const response = { data: USER_MOCK, status: 200 };
    });
  });


// After
// users.factory.ts
  const usersFactory = (data: Partial<User> = {}): User => {
    //Object.Freeze blocks direct modifications.
    return Object.freeze({
      id: "123-asd",
      name: "Tom",
      lastName: "Riddle",
      phone: "+90 555 55 55",
      email: "tom_riddle@gmail.com",
      age: 19,
      ...data, // Adding data allows overriding default properties
    }) satisfies User;
  };



  //Test file
  //users.service.test.ts
  describe("users service", () => {
    it("allow fetching users", async () => {
      const response = { data: usersFactory(), status: 200 };

      //You may override properties like this:
      const customUser = usersFactory({ id: "my-other-id" });
    });
  });


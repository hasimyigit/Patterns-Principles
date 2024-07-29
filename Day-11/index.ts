// @@@ React
(function () {
  // In UserDetails.tsx
  const UsersDetails = () => {
    useEffect(() => {
      axios.get("https://your-api/users").then((response) => {
        // Do any state updates.
      });
    }, []);
  };

  // @@@ Redux-Toolkit acts
  // users.acts

  export const actDeviceSelect = createAsyncThunk(
    "users/createUser",
    async (payload, { rejectWithValue }) => {
      try {
        axios.post("https://your-api/users").then((response) => {
          // Do any state updates.
        });
      } catch {
        return rejectWithValue("Ups, something went wrong");
      }
    }
  );
});

// @@@ TypeScript
(function () {
  // UsersService
  export const UsersService = {
    getUsers: () => {
      return axios.get("https://your-api/users");
    },
    createUser: (payload) => {
      return axios.post("https://your-api/users", payload);
    },
  };

  // @@@ React
  // In UserDetails.tsx
  const UsersDetails = () => {
    useEffect(() => {
      UsersService.getUsers().then((response) => {
        // Do any state updates.
      });
    }, []);
  };

  // @@@ Redux-Toolkit acts
  // users.acts

  export const actDeviceSelect = createAsyncThunk(
    "users/createUser",
    async (payload, { rejectWithValue }) => {
      try {
        UsersService.createUser(payload).then((response) => {
          // Do any state updates.
        });
      } catch {
        return rejectWithValue("Ups, something went wrong");
      }
    }
  );
});


(function () {
  type ControllerPath = `users` | `posts`;

  const combinePath = (controllerPath: ControllerPath) => {
    return process.env.BE_PATH + "/" + controllerPath;
  };

  export const get = async <Response>(
    controllerPath: ControllerPath
  ): Promise<Response> => {
    // We can add any logic we need and change the signature
    // for our needs.
    try {
      // The dependency on "Axios" is only in this place!
      return await axios.get<Response>(combinePath(controllerPath));
    } catch (err: unknown) {
      throw err;
    }
  };

  // Call it like that
  await get<UserModel>("posts");
});

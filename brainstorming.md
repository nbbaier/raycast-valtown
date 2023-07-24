# Commands

- Get user information
  - Arguments: Ø, Username, ID
    - Ø => /v1/me
    - Username => /v1/alias/Username
    - ID => /v1/users/ID


const userMapping: Mapping = {
  default: {
    endpoint: "/v1/me",
  },
  username: {
    endpoint: "/v1/alias/<INPUT>",
    schema: usernameSchema,
  },
  id: {
    endpoint: "/v1/users/<INPUT>",
    schema: idSchema,
  },

};


- Get val information
  - Arguments: shortValname, longValname, ID
    - shortValname => me.ID => /v1/users/me.ID/shortValname
    - longValname => /v1/alias/Username/shortValname
    - ID => /v1/vals/ID


const valMapping: Mapping = {
  short: {
    endpoint: "/v1/users/<INPUT>",
    schema: shortValnameSchema,
    transform: getAuthID,
  },
  long: {
    endpoint: "/v1/users/<INPUT>",
    schema: longValnameSchema,
    transform: splitLongValname,
  },
  id: {
    endpoint: "/v1/vals/<INPUT>",
    schema: idSchema,
  },
};


- List vals
  - Arguments: Ø, Username, ID
    - Ø => me.ID => /v1/users/[TOKEN_USER_ID]/val
    - Username => Username.ID => /v1/users/Username.ID/val
    - ID => /v1/users/ID/val


const listMapping: Mapping = {
  username: {
    endpoint: "/v1/user/<INPUT>/vals",
    schema: usernameSchema,
    transform: fetchUserID,
  },
  id: {
    endpoint: "/v1/users/<INPUT>/vals",
    schema: idSchema,
    transform: fetchUserID,
  },
  default: {
    endpoint: "/v1/users/<INPUT>/vals",
    transform: fetchAuthID,
  },
};

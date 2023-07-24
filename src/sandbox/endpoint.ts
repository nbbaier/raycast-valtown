import { Mapping, usernameSchema, idSchema, shortValnameSchema, longValnameSchema } from "../types";
import z, { ZodSchema } from "zod";

const myID = "5d1042a9-7b0b-499d-8a72-3a8ac7a4e185"; // This will need to be replaced by the variable  in prefs

export const userMapping: Mapping = {
  username: {
    endpoint: "/v1/alias/<INPUT>",
    schema: usernameSchema,
    transform: stripUsername,
  },
  id: {
    endpoint: "/v1/users/<INPUT>",
    schema: idSchema,
  },
  default: {
    endpoint: "/v1/me",
  },
};

export const valMapping: Mapping = {
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

export const listMapping: Mapping = {
  username: {
    endpoint: "/v1/user/<INPUT>/vals",
    schema: usernameSchema,
    transform: fetchUserID,
  },
  id: {
    endpoint: "/v1/users/<INPUT>/vals",
    schema: idSchema,
  },
  default: {
    endpoint: "/v1/users/<INPUT>/vals",
    transform: getAuthID,
  },
};

function getAuthID(input: string): string {
  return input === "" ? myID : myID + "/" + input;
}

function fetchUserID(input: string): string {
  // need the actual logic to somehow fetch a user id from the valtown API
  return `${input.replace("@", "")}.ID`;
}

function stripUsername(input: string): string {
  return input.replace("@", "");
}

function splitLongValname(input: string): string {
  const user = input.split(".")[0].replace("@", "");
  const val = input.split(".")[1];
  return user + "/" + val;
}

export function getEndpoint(input: string, mapping: Mapping): string {
  const trimmedInput = input.trim();
  if (trimmedInput === "") {
    if ("default" in mapping) {
      const { endpoint, transform } = mapping["default"];
      if (transform) {
        return endpoint.replace("<INPUT>", transform(trimmedInput));
      } else {
        return endpoint.replace("<INPUT>", trimmedInput);
      }
    } else {
      return "empty string not allowed";
    }
  } else {
    for (const key in mapping) {
      if (key === "") {
        continue;
      }
      const { schema, endpoint, transform } = mapping[key];
      if (schema && schema.safeParse(trimmedInput).success) {
        if (transform) {
          return endpoint.replace("<INPUT>", transform(trimmedInput));
        } else {
          return endpoint.replace("<INPUT>", trimmedInput);
        }
      }
    }
    return "invalid input";
  }
}

const testInput = "hello";

console.log(`User: ${testInput} => ` + getEndpoint(testInput, userMapping));
console.log(`Val: ${testInput} => ` + getEndpoint(testInput, valMapping));
console.log(`List: ${testInput} => ` + getEndpoint(testInput, listMapping));

import z, { ZodSchema } from "zod";

export const idSchema = z.string().uuid();

const identifierSchema = z
  .string()
  .refine((val) => /^[a-zA-Z_$][a-zA-Z0-9_$]+$/.test(val), { message: "Invalid JS identifier" });

export const usernameSchema = z.string().refine((val) => {
  const baseUsername = identifierSchema.refine((val) => val.length > 3 && val.length < 64);
  const str = val.startsWith("@") ? val.slice(1) : val;
  return baseUsername.safeParse(str).success;
});

export const shortValnameSchema = identifierSchema;

export const longValnameSchema = z.string().refine((val) => {
  const [part1, part2] = val.split(".");
  return usernameSchema.safeParse(part1).success && shortValnameSchema.safeParse(part2).success;
});

export type ShortValname = z.infer<typeof shortValnameSchema>;
export type LongValname = z.infer<typeof longValnameSchema>;
export type Username = z.infer<typeof usernameSchema>;

export interface ValInfo {
  valname: ShortValname;
  username: Username;
}

export interface Mapping {
  [key: string]: {
    endpoint: string;
    schema?: ZodSchema<unknown>;
    transform?: (input: string) => string;
  };
}

// export type ValData = {
//   id: ID;
//   author: {
//     id: ID;
//     username: Username;
//   };
//   name: Valname;
//   code: string;
//   public: boolean;
//   version: number;
//   runStartAt: string;
//   runEndAt: string;
//   logs: any[];
//   output: {
//     type: string;
//     value: string;
//   };
//   error: null | string;
//   readme: null | string;
//   likeCount: number;
//   referenceCount: number;
// };

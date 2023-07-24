import { Detail, LaunchProps } from "@raycast/api";
import { usernameSchema, idSchema } from "./types";
import z from "zod";

const parser = z.string();

export default function Command(props: LaunchProps) {
  const input = props.arguments.input;
  console.log(typeof input);

  const result = parser.safeParse(input);
  if (!result.success) {
    return <Detail markdown="invalid input" />;
  } else {
    return <Detail markdown={input} />;
  }
}

import { open, LaunchProps } from "@raycast/api";
import qs from "qs";

const url = "https://val.town/new";

export default async function Command(props: LaunchProps<{ arguments: Arguments.CreateVal }>) {
  const queryString = qs.stringify({ code: props.arguments.queryString });
  await open(`${url}?${queryString}`);
}

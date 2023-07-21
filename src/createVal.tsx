import { open } from "@raycast/api";

const url = "https://val.new";

export default async function Command() {
  await open(url);
}

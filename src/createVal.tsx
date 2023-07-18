import { $ } from "zx";

export default async function Command() {
  const result = await $`open https://val.new`;
}

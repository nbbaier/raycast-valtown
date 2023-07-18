import { test } from "node:test";
import { ValInfo } from "./types";

const testInfo: ValInfo = {
  username: "@nbbaier",
  valname: "hello",
};

function formatUsername(username: string): string {
  if (username.startsWith("@")) {
    return username.substring(1);
  }
  return username;
}

export function buildValtownURL(valInfo: ValInfo): string {
  return `https://www.val.town/v/${formatUsername(valInfo.username)}.${valInfo.valname}`;
}

export function buildExpressEndpoint(valInfo: ValInfo) {
  return `https://${formatUsername(valInfo.username)}-${valInfo.valname}.express.val.run`;
}

export function buildRunEndpoint(valInfo: ValInfo) {
  return `https://api.val.town/v1/run/${formatUsername(valInfo.username)}.${valInfo.valname}`;
}

export function codeblock(code: string, language: string, heading?: string) {
  if (heading) {
    return "## " + heading + "\n" + "```" + language + "\n" + code + "\n```";
  }
  return "```" + language + "\n" + code + "\n```";
}

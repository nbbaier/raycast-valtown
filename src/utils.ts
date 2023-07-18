import { ValInfo } from "./types";

export function buildExpressEndpoint(valInfo: ValInfo) {
  if (valInfo.username.startsWith("@")) {
    valInfo.username = valInfo.username.substring(1);
  }
  return `https://${valInfo.username}-${valInfo.valname}.express.val.run`;
}

export function buildRunEndpoint(valInfo: ValInfo) {
  if (valInfo.username.startsWith("@")) {
    valInfo.username = valInfo.username.substring(1);
    console.log(valInfo.username);
  }
  return `https://api.val.town/v1/run/${valInfo.username}.${valInfo.valname}`;
}

export function codeblock(code: string, language: string) {
  return "```" + language + "\n" + code + "\n```";
}

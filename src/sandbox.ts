import qs from "qs";

const options = {
  code: "function hello(name){return `Hello ${name}`}",
};
const url = `https://val.town/new?${qs.stringify(options)}`;
console.log(url);

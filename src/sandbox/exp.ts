import fs from "fs";
import axios from "axios";
import { Console } from "console";

const token = JSON.parse(fs.readFileSync("./keys.json", "utf8")).VALTOWN_TOKEN;

const valtownApi = axios.create({
  baseURL: "https://api.val.town/v1",
  headers: {
    Authorization: "Bearer " + token,
  },
});

const listVals = async (username: string) => {
  return valtownApi
    .get(`/alias/${username}`)
    .then((response) => {
      const { id } = response.data;
      return valtownApi.get(`/users/${id}/vals`); // using response.data
    })
    .then((response) => {
      return response.data;
    });
};

// @ts-ignore
const data = await listVals("nbbaier");
console.log(data.links);

async function repeatAPICall(url: string) {
  try {
    let response = await valtownApi.get(url);
    let originalObject = response.data;

    // Process the original object
    console.log(originalObject.data.length);

    if (originalObject.links && originalObject.links.next) {
      // Repeat the API call with the next URL
      let nextUrl = originalObject.links.next;
      await repeatAPICall(nextUrl);
    }
  } catch (error) {}
}

// Call the function with the initial URL
const initialUrl = "users/5d1042a9-7b0b-499d-8a72-3a8ac7a4e185/vals";
repeatAPICall(initialUrl);

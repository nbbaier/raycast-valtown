import axios from "axios";

const token = "1afb35c0-52b3-408d-9af1-d5e199eb0552";
const apiRoot = "https://api.val.town/v1";

// @ts-ignore
const userID = await axios.get(apiRoot + "/me", {
  headers: {
    Authorization: "Bearer" + token,
  },
}); //axios.get(apiRoot + "/me", { headers: { Authorization: "Bearer" + token } });
console.log(userID.data);

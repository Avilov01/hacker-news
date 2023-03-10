import axios from "axios";

export const client = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0",
});

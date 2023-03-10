import { client } from "./instance";
import { News } from "../types";

export const fetchItem = async <T>(id: string | number): Promise<T> => {
  const { data } = await client.get<T>(`/item/${id}.json`);

  return data;
};

export const fetchNews = async (): Promise<News[]> => {
  const { data } = await client.get<string[]>("/newstories.json");

  return await Promise.all(data.slice(0, 100).map(fetchItem<News>));
};

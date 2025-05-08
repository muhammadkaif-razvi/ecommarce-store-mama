import { Ingredient } from "@/types";
import queryString from "query-string";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/ingredients`;


interface Query {
  varientId: string
}
 export const getIngredientes = async (query: Query): Promise<Ingredient[]> => {
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      varientId: query.varientId,
    },
  });

  const res = await fetch(url);
  return res.json();
};
export const getIngredients= async (): Promise<Ingredient[]> => {
  const res = await fetch(URL);
    
  return res.json();
}

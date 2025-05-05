import { Ingredient } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/ingredients`;

const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getIngredients;
import { Fragrance } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/fragrances`;

const getFragrances = async (): Promise<Fragrance[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getFragrances;
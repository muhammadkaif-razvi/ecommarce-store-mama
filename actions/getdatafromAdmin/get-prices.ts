import { Price } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/prices`;

const getPrices = async (): Promise<Price[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getPrices;
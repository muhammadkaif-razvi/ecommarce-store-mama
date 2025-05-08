import { Hair } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/hairs`;

const getHairs = async (): Promise<Hair[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getHairs;
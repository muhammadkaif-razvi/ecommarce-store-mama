import { Combos } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/combos`;

const getCombos = async (): Promise<Combos[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getCombos;
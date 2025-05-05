import { Makeup } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/makeups`;

const getMakeups = async (): Promise<Makeup[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getMakeups;
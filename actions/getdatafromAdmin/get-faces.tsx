import { Face } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/faces`;

const getFaces = async (): Promise<Face[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getFaces;
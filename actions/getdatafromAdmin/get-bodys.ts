import { Body} from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/bodys`;

const getBodys = async (): Promise<Body[]> => {
  const res = await fetch(URL);
    
  return res.json();
}
export default getBodys;
import { Order } from "@/types";

const URL  = `${process.env.NEXT_PUBLIC_API_URL}/customers`;

const getCustomer = async (id : string): Promise<Order> => {
  const res = await fetch(`${URL}/${id}`);
    
  return res.json();
}
export default getCustomer;
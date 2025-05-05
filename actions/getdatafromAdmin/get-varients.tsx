import { Variant } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/variants`;

interface Query {
  productId: string;
}

const getVarients = async (query: Query): Promise<Variant[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
    },
  });

  const res = await fetch(url);
  return res.json();
};

const getVarient = async (id: string): Promise<Variant> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export { getVarients, getVarient };

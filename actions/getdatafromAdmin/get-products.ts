import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  faceId?: string;
  hairId?: string;
  makeupId?: string;
  bodyId?: string;
  combosId?: string;
  ingredientId?: string;
  fragranceId?: string;
  priceId?: string;
  categoryId?: string;
  isNewlaunch?: boolean;
  isBestseller?: boolean;
  isArchived?: boolean;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      faceId: query.faceId,
      hairId: query.hairId,
      makeupId: query.makeupId,
      bodyId: query.bodyId,
      combosId: query.combosId,
      ingredientId: query.ingredientId,
      fragranceId: query.fragranceId,
      priceId: query.priceId,
      isNewlaunch: query.isNewlaunch,
      isBestseller: query.isBestseller,
      isArchived: query.isArchived,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);
  return res.json();
};

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export { getProducts, getProduct };
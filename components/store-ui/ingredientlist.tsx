import { Variant } from '@/types';
import Image from 'next/image';
import React from 'react';
import { getIngredientes } from '@/actions/getdatafromAdmin/get-Ingredient';

interface Props {
  data: Variant;
  heading?: string;
}

const IngredientList: React.FC<Props> = async ({ data, heading = "Ingredients" }) => {
  const ingredients = await getIngredientes({ varientId: data.id });

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl md:text-3xl font-bold font-sans mt-6 mb-4 text-center">
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <Image
              src={ingredient.images[0].url}
              alt={ingredient.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold mt-3">{ingredient.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;

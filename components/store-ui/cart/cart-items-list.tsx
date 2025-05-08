import Image from 'next/image';

export const CartItemList = (
  { items,
    removeItem,
    isSaving,
    updateQuantity
   }: {
    items: any[];
    removeItem: (id: string) => void;
    isSaving: boolean;
    updateQuantity: (id: string, quantity: number) => void;
  }
) => {
 
//  const fetchVariant = async(id: string) => {
//     const variant = await getVarient(id);
//     return variant;
//   };
  
  // console.log(fetchVariant(items[0].varientId))
   
  return (
    <div className="md:col-span-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center border-b py-4">

          {item.image && (
            <div className="w-16 h-16 relative mr-4 flex-shrink-0">
              <Image
                src={item.image }
                alt={item.name || 'Product image'}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded"
                sizes="64px" 
              />
            </div>
          )}
          {!item.image && (
            <div className="w-16 h-16 bg-gray-200 rounded mr-4 flex items-center justify-center text-gray-500 text-sm flex-shrink-0">
              No Image
            </div>
          )}

          <div className="flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            {item.variantName && <p className="text-gray-600 text-sm">{item.variantName}</p>}
            {item.variantQuantity && <p className="text-gray-500 text-xs">{item.variantQuantity}</p>}
            <p className="text-gray-700 mt-1">${item.price}</p>
          </div>

          <div className="flex items-center ml-auto">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={isSaving || item.quantity <= 1}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              -
            </button>
            <span className="mx-2 w-8 text-center border rounded">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={isSaving}
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              disabled={isSaving}
              className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>)
}

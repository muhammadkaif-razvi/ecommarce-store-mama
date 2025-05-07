"use client";
import { Button } from "@/components/ui/button" // Assuming you are using shadcn/ui
import { useState } from "react";


interface Props {
  description: string;
  heading?: string; // Make heading optional
}

const ProductDescription: React.FC<Props> = ({ description, heading = "Product Description" }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const shouldExpand = description.length > 300; // Example: Expand if longer than 300 characters

  const displayedDescription = showFullDescription ? description : description.substring(0, 300);


  return (
    <div>
      <h1 className="text-2xl font-semibold font-sans lg:mt-6 md:mt-3 pb-2">{heading}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {displayedDescription}
        {shouldExpand && !showFullDescription && "..."}
      </p>
      {shouldExpand && (
        <Button
          variant="link"
          className="p-0 mt-2 text-blue-500 hover:text-blue-700"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
};

export default ProductDescription;

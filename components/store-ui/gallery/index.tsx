"use client";

import { Image as ImageType } from "@/types";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: ImageType[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (

    <TabGroup as="div" className="flex flex-col w-full
     items-center
       ">
      {/* Main Image Area */}
      <div className="w-full  lg:px-2 xl:px-24 md:px-20 px-1 items-center">
        <TabPanels className=" relative flex  ">
          {images.map((image) => (
            <TabPanel key={image.id} className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md bg-gray-100  justify-center lg:h-[450px] xl:h-[560px] md:h-[430px] h-[300px]">
                <Image
                  src={image.url}
                  alt="Product image"
                  fill
                  className="object-cover object-center justify-center"
                  priority
                />
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </div>

      {/* Thumbnail Tab List */}
      <div className="  mt-4 w-full  max-w-[450px]  sm:mt-6 p-2">
        <TabList className="grid grid-cols-4 gap-2 sm:gap-4 ">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
};
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";


interface GalleryTabProps {
  image: ImageType;
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer items-center rounded-md bg-white group"
      }
    >
      {({ selected }) => (
        <div className="w-full h-full">
          <span className="absolute inset-0 overflow-hidden rounded-md shadow-md">
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};


export default GalleryTab
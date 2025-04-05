"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string }) => void;
  onRemove: (url: string) => void;
  value: { url: string }[];
  maxFiles?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
  maxFiles = 6,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    if (result?.info?.secure_url) {
      onChange({ url: result.info.secure_url });
      console.log(value)

    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((image) => (
          <div
            key={image.url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(image.url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded image"
              src={image.url}
            />
          </div>
        ))}
      </div>
      {value.length < maxFiles && (
        <CldUploadWidget onUpload={onUpload} uploadPreset="sjiyx6o3">
          {({ open }) => {
            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={() => open()}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
};
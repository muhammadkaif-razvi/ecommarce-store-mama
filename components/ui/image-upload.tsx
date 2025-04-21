"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
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
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Apply overflow: hidden when the widget is open
    if (isWidgetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // Revert to default
    }
    // Cleanup function to ensure overflow is reset on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWidgetOpen]);

  const onUploadDebug = useCallback((result: any) => {
    console.log("Uploaded URL:", result.info.secure_url);
    onChange(result.info.secure_url);
    setIsWidgetOpen(false); // Widget closed after successful upload
  }, [onChange, setIsWidgetOpen]);

  const handleRemove = useCallback((url: string) => {
    onRemove(url);
  }, [onRemove]);

  const handleOpenWidget = useCallback(() => {
    setIsWidgetOpen(true);
  }, [setIsWidgetOpen]);

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[100px] h-[100px] rounded-md "
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="icon"
                disabled={disabled}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {url ? (
              <Image
                height={200}
                width={200}
                className="object-cover"
                alt="Uploaded image"
                src={url} // Changed back to dynamic src
              />
            ) : null}
          </div>
        ))}
      </div>
      {value.length < maxFiles && (
        <CldUploadWidget
          onSuccess={onUploadDebug}
          uploadPreset="sjiyx6o3"
          onOpen={handleOpenWidget} // Track when widget opens
          onClose={() => setIsWidgetOpen(false)} // Track when widget closes (if available)
        >
          {({ open }) => (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={() => open()}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Choose Image
            </Button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};
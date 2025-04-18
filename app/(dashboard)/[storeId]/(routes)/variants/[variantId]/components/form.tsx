"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image, Product, Variant } from "@prisma/client";
import { variantformSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AlertModal } from "@/components/modals/alert-modal";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload-product";

interface variantFormProps {
  initialData:
    | (Variant & {
        images: Image[];
      })
    | null;
  products: Product[];
}

type variantFormValues = z.infer<typeof variantformSchema>;

export const VariantForm: React.FC<variantFormProps> = ({
  initialData,
  products,
}) => {
  const params = useParams();
  const router = useRouter();
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit variant" : "Create variant";
  const description = initialData ? "Edit a variant" : "Add a new variant";
  const toastMessage = initialData ? "variant updated" : "variant created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<variantFormValues>({
    resolver: zodResolver(variantformSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
          inventory: parseFloat(String(initialData.inventory)),
        }
      : {
          name: "",
          images: [],
          variantsepQuant: "",
          price: 0,
          inventory: 0,
          productId:'0a8d6fdf-6d23-45dd-a512-a6ac8ef331b9',
        },
  });
  const onSubmit = async (values: variantFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/variants/${params.variantId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/variants`, values);
      }
      router.refresh();
      update();
      router.push(`/${params.storeId}/variants`);
      toast.success(toastMessage);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/variants/${params.variantId}`);
      router.refresh();
      await update();
      router.push(`/${params.storeId}/variants`);
      toast.success("variant deleted.");
    } catch {
      toast.error(
        "Make sure you removed all categories using this variant first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />
      <div className="flex items-center justify-between mt-3 sm:mt-5 lg:mt-6">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>variant Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || []}
                    disabled={loading} // Use the form's loading state
                    onChange={(image) => {
                      field.onChange([...(field.value || []), image]);
                    }}
                    onRemove={(url) => {
                      field.onChange(
                        (field.value || []).filter((img) => img.url !== url)
                      );
                    }}
                    maxFiles={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="variant Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="345"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="variantsepQuant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity of variant</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="100ml"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="inventory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock variant or product</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="variant Description"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a product"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-center p-2 text-sm text-gray-500">
                          No products.{" "}
                          <button
                            onClick={() => {
                              router.push(`/${params.storeId}/products/new`);
                            }}
                            className="text-blue-500 hover:underline"
                          >
                            Create one!
                          </button>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
 
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

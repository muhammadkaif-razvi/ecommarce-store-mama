"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


interface StoreSwitcherProps {
  className?: string;
  items: Store[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const filteredStores = formattedItems.filter((store) =>
    store.label.toLowerCase().includes(search.toLowerCase())
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    setSearch("");
    router.push(`/${store.value}`);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label || "Select a store"}
          <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]">
        {/* Search Input */}
        <div className="px-2 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search store..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Store List */}
        {filteredStores.length === 0 ? (
          <DropdownMenuItem disabled className="text-gray-500">
            No store found.
          </DropdownMenuItem>
        ) : (
          filteredStores.map((store) => (
            <DropdownMenuItem
              key={store.value}
              onClick={() => onStoreSelect(store)}
            >
              <StoreIcon className="mr-2 h-4 w-4" />
              {store.label}
              {currentStore?.value === store.value && (
                <Check className="ml-auto h-4 w-4 text-green-500" />
              )}
            </DropdownMenuItem>
          ))
        )}

        <DropdownMenuSeparator />

        {/* Create Store Option */}
        <DropdownMenuItem onClick={() => storeModal.onOpen()}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Store
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

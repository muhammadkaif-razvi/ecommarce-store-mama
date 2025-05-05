// "use client";

// import { Color, Size } from "@/types";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Button from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import Filter from "./filter";

// interface MobileFiltersProps {
//   sizes: Size[];
//   colors: Color[];
// }
// const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
//   return (
//     <Sheet>
//       <SheetTrigger asChild className="lg:hidden flex">
//         <Button className="flex items-center gap-x-2 ">Filters<Plus size={20} /></Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Refine Your Search</SheetTitle>
//           <SheetDescription>
//           Narrow down your results by applying filters. Your selections will update the products instantly.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="px-5">
//         <Filter valueKey="sizeId" name="Sizes" data={sizes} />{" "}
//         <Filter valueKey="colorId" name="Colors" data={colors} />
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default MobileFilters;

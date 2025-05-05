import { CgMenuLeftAlt } from "react-icons/cg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ResuableSideMenu } from "./resuablesidemenu";
import getCategories from "@/actions/getdatafromAdmin/getCategories";
import getFaces from "@/actions/getdatafromAdmin/get-faces";
import getHairs from "@/actions/getdatafromAdmin/get-hairs";
import getBodys from "@/actions/getdatafromAdmin/get-bodys";
import getMakeups from "@/actions/getdatafromAdmin/get-makeups";
import getCombos from "@/actions/getdatafromAdmin/get-combos";
import getIngredients from "@/actions/getdatafromAdmin/get-Ingredient";
import getFragrances from "@/actions/getdatafromAdmin/get-fragrance";

export const SidebarSheet = async () => {
  const categories = await getCategories();
  const faces = await getFaces();
  const hairs = await getHairs();
  const bodys = await getBodys();
  const makeups = await getMakeups();
  const combos = await getCombos();
  const ingredients = await getIngredients();
  const fragrance = await getFragrances();
  const firstTenIngredients = ingredients.slice(0, 12);
  return (
    <Sheet>
      <SheetTrigger>
        <CgMenuLeftAlt size={20} className="lg:hidden h-7 w-6 text-blue-400" />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 overflow-y-scroll scrollbar-hide">
        <SheetHeader>
          <SheetTitle className="text-left text-lg text-blue-500">
            Explore Beauty Categories
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Discover makeup, skincare, fragrance, and more. Tap a category to
          browse products made just for you.
        </SheetDescription>
        <div className="space-y-4 py-3 ">
        {categories[0] && (
          <ResuableSideMenu
            data={[categories[0]]}
            subcategories={faces}
            valueKey="faceId"
            url="/1.svg"
          />
        )}{" "}   {categories[1] && (
          <ResuableSideMenu
            data={[categories[1]]}
            subcategories={hairs}
            valueKey="hiarId"
            url="/2.svg"
          />
        )}{" "}
        {categories[2] && (
          <ResuableSideMenu
            data={[categories[2]]}
            subcategories={makeups}
            valueKey="makeupId"
            url="/3.svg"
          />
        )}{" "}
        {categories[3] && (
          <ResuableSideMenu
            data={[categories[3]]}
            subcategories={bodys}
            valueKey="bodyId"
            url="/4.svg"
          />
        )}{" "}
        {categories[4] && (
          <ResuableSideMenu
            data={[categories[4]]}
            subcategories={combos}
            valueKey="comboId"
            url="/5.svg"
          />
        )}{" "}
        {categories[5] && (
          <ResuableSideMenu
            data={[categories[5]]}
            subcategories={firstTenIngredients}
            valueKey="ingredientId"
            url="/6.svg"
          />
        )}{" "}
        {categories[6] && (
          <ResuableSideMenu
            data={[categories[6]]}
            subcategories={fragrance}
            valueKey="fragranceId"
            url="/OI.png"
          />
        )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

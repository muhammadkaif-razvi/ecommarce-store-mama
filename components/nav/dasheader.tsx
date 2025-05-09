import Link from "next/link";
import Image from "next/image";
import { NavAction } from "./navactions";
import getCategories from "@/actions/getdatafromAdmin/getCategories";
// import CategoryNavbar from "./categorynavbar";
import getFaces from "@/actions/getdatafromAdmin/get-faces";
import getHairs from "@/actions/getdatafromAdmin/get-hairs";
import getBodys from "@/actions/getdatafromAdmin/get-bodys";
import getFragrances from "@/actions/getdatafromAdmin/get-fragrance";
import {getIngredients} from "@/actions/getdatafromAdmin/get-Ingredient";
import getCombos from "@/actions/getdatafromAdmin/get-combos";
import getMakeups from "@/actions/getdatafromAdmin/get-makeups";
import { ReusableMenubar } from "./resuable-menubar";
import { Menubar } from "../ui/menubar";
import { SidebarSheet } from "./sidebarsheet";

export default async function DashHeader() {
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
    <header className="flex flex-col border-b bg-white fixed w-full z-10 shadow-md">
      <div className="flex flex-row justify-between items-center  lg:border-b  py-2 lg:py-4">
        <div className="flex items-center gap-2  md:px-6 lg:px-14 px-2 ">
        <SidebarSheet />
          <Link
            href={"/"}
            className="flex flex-row items-center gap-2 justify-center "
          >
            <Image
              className="w-auto h-auto"
              src="/mamaearth-logo.avif"
              alt="logo"
              height={24}
              width={100}
            />
          </Link>
        </div>
        <NavAction />
      </div>
      <div className="hidden lg:flex justify-center py-3">
      <Menubar className="border-none shadow-none hover:bg-white h-3 ">
        {categories[0] && (
          <ReusableMenubar
            data={[categories[0]]}
            subcategories={faces}
            valueKey="faceId"
          />
        )}{" "}
        {categories[1] && (
          <ReusableMenubar
            data={[categories[1]]}
            subcategories={hairs}
            valueKey="hairId"
          />
        )}{" "}
        {categories[2] && (
          <ReusableMenubar
            data={[categories[2]]}
            subcategories={makeups}
            valueKey="makeupId"
          />
        )}{" "}
        {categories[3] && (
          <ReusableMenubar
            data={[categories[3]]}
            subcategories={bodys}
            valueKey="bodyId"
          />
        )}{" "}
        {categories[4] && (
          <ReusableMenubar
            data={[categories[4]]}
            subcategories={combos}
            valueKey="comboId"
          />
        )}{" "}
          
          {categories[5] && (
          <ReusableMenubar
            data={[categories[5]]}
            subcategories={firstTenIngredients}
            valueKey="ingredientId"
          />
        )} {categories[6] && (
          <ReusableMenubar
            data={[categories[6]]}
            subcategories={fragrance}
            valueKey="fragranceId"
          />
        )}
        
        </Menubar>
      </div>
    </header>
  );
}

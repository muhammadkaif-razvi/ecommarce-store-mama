
export const ExploreHoverNav = () => {
  return (
    <div className="w-1/3 flex flex-col pt-2 ">
    <h1 className="font-mono">Explore</h1>
    <div className="flex flex-col space-y-2 py-2">
      <span className="text-xs px-2 cursor-pointer text-gray-400 hover:text-blue-400">
        New launches
      </span>{" "}
      <span className="text-xs px-2 cursor-pointer text-gray-400 hover:text-blue-400">
        Best sellers
      </span>{" "}
      <span className="text-xs px-2 cursor-pointer text-gray-400 hover:text-blue-400">
        Combos
      </span>{" "}
      <span className="text-xs px-2 cursor-pointer text-gray-400 hover:text-blue-400">
        Offers
      </span>
    </div>
  </div>  )
}

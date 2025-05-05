import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="  rounded-xl overflow-hidden ">
      <div
        className="relative rounded-xl   aspect-[3.5/1] lg:aspect-[3.5/1] bg-cover overflow-hidden bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />
    </div>
  );
};

export default Billboard;

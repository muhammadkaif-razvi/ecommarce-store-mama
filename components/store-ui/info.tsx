import { Variant } from "@/types";
import Currency from "./Currency";


interface InfoProps {
  data: Variant;
}


const Info: React.FC<InfoProps> = ({ data }) => {

  return (
    <div className="mt-2 space-y-5 w-full">

      <div className="flex flex-row space-x-2">
        <span className="font-sans text-gray-500">Net content:</span>
        <span className="font-bold font-sans">{data.variantsepQuant}</span>
      </div>

      <div>
        <span className="font-sans text-gray-500">M.R.P. (Inclusive of all taxes)</span>

        <div className=" lg:text-2xl text-lg md:text-xl pt-2">
          <Currency value={data.price} />
        </div>

      </div>
    </div>
  );
};

export default Info;
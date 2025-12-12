import { Nfc } from "lucide-react";
import chipImg from "../assets/chip.png";

type CardProps = {
  cardNumber: string[];
  expDate: string;
  cardHolder: string;
  cvv: string;
};

const Card = ({ cardHolder, expDate, cardNumber }: CardProps) => {
  return (
    <div className="bg-linear-to-br from-gray-900 to-black text-primaryTxt rounded-lg w-full max-w-[480px] px-8 py-6 -mb-10 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <h1 className="text-white text-2xl font-bold">monobank</h1>
          <span className="border-l pl-5 text-lg">Universal Bank</span>
        </div>
        <Nfc size={40} />
      </div>

      <img src={chipImg} alt="chipImg" className="w-16 pt-6" />

      <div className="flex flex-col">
        <span className="self-end mr-9">World</span>
        <div className="text-2xl text-gray-200/80 flex gap-x-10 font-semibold justify-center font-mono">
          {cardNumber.length > 0 ? (
            cardNumber.map((nums, i) => <span key={i}>{nums}</span>)
          ) : (
            <span>•••• •••• •••• ••••</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-x-2 pt-4 pb-3 items-center justify-end">
            <span className="text-[12px] leading-none">
              VALID <br /> THRU
            </span>
            <span className="font-semibold text-gray-200/80 leading-none">
              {expDate || "MM/YY"}
            </span>
          </div>

          <span className="text-[22px] uppercase font-semibold text-gray-200/80">
            {cardHolder || "NOMBRE TITULAR"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="size-16 rounded-full bg-red-500/85"></div>
          <div className="size-16 rounded-full bg-yellow-500/85 -ml-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;

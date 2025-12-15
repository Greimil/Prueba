import { Nfc, Pencil, Trash } from "lucide-react";
import chipImg from "../assets/chip.png";

type CardProps = {
  cardNumber: string[];
  expDate: string;
  cardHolder: string;
  showOptions?: boolean 
  onDelete?: () => void;
};

const Card = ({ cardHolder, expDate, cardNumber, showOptions = true , onDelete}: CardProps) => {
  return (
    
    <div
      className={`
        bg-linear-to-br from-gray-900 to-black text-primaryTxt
        aspect-[1.586/1]
        w-full max-w-[430px]
        flex flex-col justify-between
        rounded-xl
        px-4 py-4
        md:px-6 md:py-5
        lg:px- lg:py-6
        shadow-lg md:shadow-xl
        -mb-10 z-10 
        relative
        group 
      `}
    >
    
    {showOptions &&  <div
        className="
          absolute top-0 right-0 bottom-0 left-0
          flex justify-end items-start p-4 md:p-6
          bg-black/40 backdrop-blur-sm
          rounded-xl
          opacity-0 
          pointer-events-none // Para que el hover funcione sobre la card, inicialmente no es clickeable
          group-hover:opacity-100 // <--- AÑADIDO: Muestra al hacer hover en el grupo
          group-hover:pointer-events-auto // Permite hacer click en las opciones al hacer hover
          transition-opacity duration-300 // Suaviza la aparición
        "
      >
        <div className="flex  gap-x-3">
      
          <button 
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Editar tarjeta"
            onClick={() => console.log("Editar")}
          >
            <Pencil className="size-5" />
          </button>
          
      
          <button 
            className="p-2 rounded-full bg-red-600/70 text-white hover:bg-red-600 transition-colors"
            title="Eliminar tarjeta"
            onClick={() => onDelete!() }
          >
            <Trash className="size-5" />
          </button>
        </div>
      </div>}
        
      
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3 md:gap-x-5">
          <h1 className="text-white font-bold text-lg sm:text-2xl ">
            monobank
          </h1>
          <span className="border-l pl-2 md:pl-4 text-xs xs:text-sm lg:text-[18px] text-gray-300 text-nowrap">
            Universal Bank
          </span>
        </div>
        <Nfc className="size-5 xs:size-7 text-gray-300" />
      </div>

      <img src={chipImg} alt="chip" className="w-9 xs:w-12 lg:w-14 pt-3" />

      <div className="flex flex-col gap-y-1 relative">
        <span className="self-end text-xs xs:text-[16px] text-gray-400 absolute bottom-8 right-12">
          World
        </span>

        <div
          className="
            flex justify-center gap-x-4
            font-mono font-semibold tracking-widest
            text-lg xs:text-xl md:text-2xl
            text-gray-200/90
          "
        >
          {cardNumber.length > 0 ? (
            cardNumber.map((nums, i) => <span key={i}>{nums}</span>)
          ) : (
            <span>•••• •••• •••• ••••</span>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="w-[65%] space-y-1">
          <div className="flex items-center gap-x-2 justify-end">
            <span className="text-[10px] leading-none text-gray-400">
              VALID <br /> THRU
            </span>
            <span className="font-semibold text-sm md:text-base text-gray-200/80 leading-none">
              {expDate || "MM/YY"}
            </span>
          </div>

          <span
            className="
              block uppercase font-semibold
              text-base md:text-xl 
              text-gray-200/90 truncate
              text-center
              "
          >
            {cardHolder || "NOMBRE TITULAR"}
          </span>
        </div>

        <div className="flex items-center justify-center w-[35%]">
          <div className="size-10 xs:size-12 rounded-full bg-red-500/85" />
          <div className="size-10 xs:size-12 rounded-full bg-yellow-500/85 -ml-5" />
        </div>
      </div>
    </div>
  );
};

export default Card;
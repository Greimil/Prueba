import { useEffect, useState } from "react";
import { GetCards } from "./helper";
import { type CardDetail } from "../types";
import Card from "./card";
import { DeleteCard } from "./helper";

const CardSelection = () => {
  const [cards, setCards] = useState<CardDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetCards();

        setCards(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

 const handleDeleteCard = async (id: string) => {
  try {
    const res = await DeleteCard(id);

    if (!res.ok) {
      throw new Error("Error al eliminar la tarjeta");
    }

    setCards((prev) => prev.filter((card) => card.Id !== id));
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="flex flex-col justify-center items-center  w-full ">
      <h3 className="font-bold text-2xl pb-8">Mis tarjetas</h3>
      <div className="grid   md:grid-cols-2  gap-y-12 gap-x-6 ">
        {cards.length > 0 &&
          cards.map((cardInfo) => (
            <Card
              key={cardInfo.Id}
              cardHolder={cardInfo.cardHolder}
              cardNumber={cardInfo.cardHolder.split(/(?<=.{4})/)}
              expDate={cardInfo.expDate}
              onDelete={() => handleDeleteCard(cardInfo.Id)}
            />
          ))}
      </div>
    </div>
  );
};

export default CardSelection;

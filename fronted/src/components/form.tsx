import { useEffect, useRef, useState } from "react";
import Card from "./card";
import Input from "./inputs";
import {
  validateCardHolder,
  validateCardNumber,
  validateCVV,
  validateExpDate,
  encryptCardNumber,
  PostCard,
  fetchDataInit,
} from "./aux";

import { type CardBody, type form } from "../types/index";

const Form = () => {
  const [form, setForm] = useState<form>({
    cardNumber: { value: [], error: "" },
    expDate: { value: "", error: "" },
    cardHolder: { value: "", error: "" },
    cvv: { value: "", error: "" },
  });

  const [cardsArr, setCardsArr] = useState<CardBody[]>([]);

  const cvvRef = useRef<HTMLInputElement>(null);
  const cardHolderRef = useRef<HTMLInputElement>(null);
  const expDateRef = useRef<HTMLInputElement>(null);
  const cardNumberRef = useRef<HTMLInputElement>(null);

  const handleCardNums = () => {
    const raw = cardNumberRef.current?.value || "";

    const result = validateCardNumber(raw);

    setForm((prev) => ({
      ...prev,
      cardNumber: result,
    }));
  };

  const handleCardHolder = () => {
    const raw = cardHolderRef.current?.value || "";

    const result = validateCardHolder(raw);

    setForm((prev) => ({
      ...prev,
      cardHolder: result,
    }));
  };

  const handleExpDate = () => {
    const raw = expDateRef.current?.value || "";

    const result = validateExpDate(raw);

    setForm((prev) => ({
      ...prev,
      expDate: result,
    }));
  };

  const handleCVV = () => {
    const raw = cvvRef.current?.value || "";

    const result = validateCVV(raw);

    setForm((prev) => ({
      ...prev,
      cvv: result,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const raw = {
      cardNumber: (cardNumberRef.current?.value || "").replace(/\D/g, ""),
      cardHolder: (cardHolderRef.current?.value || "").trim(),
      expDate: (expDateRef.current?.value || "").trim(),
      cvv: (cvvRef.current?.value || "").trim(),
    };

    const empty = {
      cardNumber: raw.cardNumber ? "" : "El número de tarjeta es obligatorio",
      cardHolder: raw.cardHolder ? "" : "El nombre del titular es obligatorio",
      expDate: raw.expDate ? "" : "La fecha de vencimiento es obligatoria",
      cvv: raw.cvv ? "" : "El CVV es obligatorio",
    };

    const results = {
      cardNumber: empty.cardNumber
        ? { value: [], error: empty.cardNumber }
        : validateCardNumber(raw.cardNumber),
      cardHolder: empty.cardHolder
        ? { value: "", error: empty.cardHolder }
        : validateCardHolder(raw.cardHolder),
      expDate: empty.expDate
        ? { value: "", error: empty.expDate }
        : validateExpDate(raw.expDate),
      cvv: empty.cvv ? { value: "", error: empty.cvv } : validateCVV(raw.cvv),
    };

    setForm(results);

    if (Object.values(results).some((r) => r.error)) return;

    const { cardNumber, cardHolder, cvv, expDate } = form;

    const cardData = {
      cardNumber: encryptCardNumber(cardNumber.value.join("")),
      cardHolder: cardHolder.value,
      cvv: cvv.value,
      expDate: expDate.value,
    };

    try {
      const res = await PostCard(cardData);
      if (res.ok) alert("Tarjeta agrega exitosamente");
      console.log("Tarjeta enviada:", res);
    } catch (error) {
      console.error("Fallo al enviar la tarjeta:", error);
    }
  };

  const handleErase = () => {
    setForm({
      cardNumber: { value: [], error: "" },
      expDate: { value: "", error: "" },
      cardHolder: { value: "", error: "" },
      cvv: { value: "", error: "" },
    });

    [cardNumberRef, cardHolderRef, expDateRef, cvvRef].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  useEffect(() => {
    fetchDataInit(setCardsArr);
  }, []);

  return (
    <div className="w-full flex  justify-center flex-col">
      <div className="flex flex-col  items-center m-20">
        <Card
          cardHolder={form.cardHolder.value}
          cardNumber={form.cardNumber.value}
          cvv={form.cvv.value}
          expDate={form.expDate.value}
        />
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="max-w-[760px] border-collapse rounded-lg mx-auto border relative p-12 aspect-video"
        >
          <div className="mt-6 space-y-6 grid grid-cols-2 gap-6 px-6">
            <Input
              id="cardNum"
              name="cardNum"
              label="Número de tarjeta"
              type="text"
              placeholder="1234 5678 9012 3456"
              ref={cardNumberRef}
              errorMs={form.cardNumber.error}
              onChange={handleCardNums}
              max={16}
            />

            <Input
              id="expDate"
              name="expDate"
              label="Fecha Vencimiento"
              type="text"
              placeholder="06/29"
              ref={expDateRef}
              errorMs={form.expDate.error}
              onChange={handleExpDate}
              max={5}
            />

            <Input
              id="cardHolder"
              name="cardHolder"
              label="Nombre Titular"
              type="text"
              placeholder="John Doe"
              ref={cardHolderRef}
              errorMs={form.cardHolder.error}
              onChange={handleCardHolder}
              max={20}
            />

            <Input
              ref={cvvRef}
              id="cvv"
              name="cvv"
              label="cvv"
              type="text"
              placeholder="432"
              className="max-w-[150px]"
              errorMs={form.cvv.error}
              onChange={handleCVV}
              max={3}
            />

            <div className="flex gap-x-3.5 col-span-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl cursor-pointer transition-all ease-in"
              >
                Agregar tarjeta
              </button>

              <button
                type="button"
                onClick={handleErase}
                className="px-4 py-2 rounded-2xl bg-[#efefef] font-bold text-[#5853536e] hover:text-black transition-all ease-in"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <div className="w-full flex  justify-center flex-col">

        <h2>Mis tarejetas</h2>

        <ul className="mt-10 space-y-4 max-w-[760px] mx-auto w-full">
          {cardsArr.map((card) => (
            <li key={card.cardNumber} className="w-full">
              <Card
                cardHolder={card.cardHolder}
                cardNumber={card.cardNumber.split(/(?<=.{4})/)}
                cvv={card.cvv}
                expDate={card.expDate}
              />
            </li>
          ))}
        </ul>


      </div> */}
    </div>
  );
};

export default Form;

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
} from "./helper";
import { type CardBody, type form } from "../types/index";

const Form = () => {
  const [form, setForm] = useState<form>({
    cardNumber: { value: [], error: "" },
    expDate: { value: "", error: "" },
    cardHolder: { value: "", error: "" },
    cvv: { value: "", error: "" },
  });

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

  return (
    <div className=" min-h-screen flex justify-center  px-4 sm:px-6 lg:px-10 w-full ">
      <div
        className="
        w-full max-w-6xl
        flex flex-col
        items-center
        lg:gap-x-16
        py-12 lg:py-20
      "
      >
        <Card
          cardHolder={form.cardHolder.value}
          cardNumber={form.cardNumber.value}
          expDate={form.expDate.value}
          showOptions={false}
        />

        <form
          onSubmit={handleSubmit}
          method="post"
          className="
          w-full max-w-[660px]
          border rounded-xl
          p-6 lg:p-12
          pt-15"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="md:col-span-2"
            />

            <Input
              ref={cvvRef}
              id="cvv"
              name="cvv"
              label="CVV"
              type="text"
              placeholder="432"
              className="max-w-40"
              errorMs={form.cvv.error}
              onChange={handleCVV}
              max={3}
            />

            <div className="flex flex-col sm:flex-row gap-4 md:col-span-2 pt-4">
              <button
                type="submit"
                className="
                btn
                bg-blue-600 hover:bg-blue-800
                text-white
                px-6 py-2.5
                rounded-2xl
                transition-all
              "
              >
                Agregar tarjeta
              </button>

              <button
                type="button"
                onClick={handleErase}
                className="
                px-6 py-2.5
                rounded-2xl
                bg-[#efefef]
                font-semibold
                text-gray-500
                hover:text-black
                transition-all
              "
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

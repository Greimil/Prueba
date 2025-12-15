import type { CardBody, CardDetail, CardQuery, UpdateCardData } from "../types";

export const validateCardNumber = (raw: string) => {
  const clean = raw.replace(/\D+/g, "");
  const groups = clean.match(/.{1,4}/g) || [];

  if (clean.length !== 16)
    return { value: groups, error: "Debe contener exactamente 16 números" };

  return { value: groups, error: "" };
};

export const validateExpDate = (raw: string) => {
  const clean = raw.trim();

  if (!/^\d{2}\/\d{2}$/.test(clean))
    return { value: clean, error: "Formato inválido. Use mm/yy" };

  const [mm, yy] = clean.split("/").map(Number);

  if (mm < 1 || mm > 12) return { value: clean, error: "Mes inválido (01-12)" };

  const currentYear = Number(new Date().getFullYear().toString().slice(-2));
  const maxYear = currentYear + 5;

  if (yy < 22 || yy > maxYear)
    return { value: clean, error: `Año inválido (22 - ${maxYear})` };

  return { value: clean, error: "" };
};

export const validateCardHolder = (raw: string) => {
  const clean = raw.trim();

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,20}$/.test(clean))
    return {
      value: clean,
      error: "Solo letras y máximo 20 caracteres",
    };

  return { value: clean, error: "" };
};

export const validateCVV = (raw: string) => {
  const clean = raw.trim();

  if (!/^\d{3}$/.test(clean))
    return { value: clean, error: "Debe contener 3 números" };

  return { value: clean, error: "" };
};

export const encryptCardNumber = (cardNumber: string): string => {
  const clean = cardNumber.replace(/\D/g, "");
  if (clean.length < 10) return clean;

  const first4 = clean.slice(0, 4);
  const last4 = clean.slice(-4);
  const masked = "*".repeat(8);

  return `${first4}${masked}${last4}`;
};

const BaseURL = "http://localhost:3080/api/cards";

export const GetCards = async (query: CardQuery = {}): Promise<CardDetail[]> => {
  try {
    const { id, cardHolder } = query;
    let url = BaseURL;

    const params = new URLSearchParams();

    if (id) {
      params.append("id", id);
    }

    if (cardHolder) {
      params.append("cardHolder", cardHolder);
    }

    const queryString = params.toString();
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error al obtener tarjetas: ${res.status}`);
    }

    const data: CardDetail[] = await res.json();
    return data;
  } catch (err) {
    console.error(`Error al intentar hacer GET a la API:`, err);
    throw err;
  }
};

export const PostCard = async (data: CardBody) => {
  try {
    const res = await fetch(`${BaseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error al enviar datos: ${res.status}`);
    }

    return res;
  } catch (err) {
    console.error("Error al intentar hacer post a la api");
    throw err;
  }
};

export const DeleteCard = async (id: string) => {
  try {
    const url = `${BaseURL}/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Error al eliminar datos: ${res.status}`);
    }

    return res;
  } catch (err) {
    console.error(`Error al intentar eliminar la tarjeta con ID ${id}`);
    throw err;
  }
};

const PutCard = async (id: string, data: UpdateCardData) => {
  try {
    const url = `${BaseURL}/${id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar datos: ${res.status}`);
    }

    const updatedData = await res.json();
    return updatedData;
  } catch (err) {
    console.error(`Error al intentar actualizar la tarjeta con ID ${id}`);
    throw err;
  }
};

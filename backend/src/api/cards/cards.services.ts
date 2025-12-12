import { prisma } from "../../../lib/prisma";
import { NewCardData, UpdateCardData } from "../../types";

type query = {
  id?: string | undefined;
  cardHolder?: string | undefined;
};

export const getCardsServices = async (query: query) => {
  try {
    const { cardHolder, id } = query;

    const whereConditions: any = {};

    if (cardHolder) {
      whereConditions.cardHolder = {
        contains: cardHolder,
      };
    }
    if (id) {
      whereConditions.id = id;
    }

    const cards = await prisma.cards.findMany({
      where: whereConditions,
    });

    return cards;
  } catch (err) {
    console.error(err);
    console.error("Error en getCardsServices:", err);
    throw err;
  }
};

export const createCardService = async (data: NewCardData) => {
  try {
    const newCard = await prisma.cards.create({
      data: {
        cardHolder: data.cardHolder,
        cardNumber: data.cardNumber,
        expDate: data.expDate,
        cvv: data.cvv,
      },

      select: {
        Id: true,
        cardHolder: true,
        cardNumber: true,
        expDate: true,
      },
    });

    return newCard;
  } catch (error) {
    console.error("Error en createCardService:", error);

    throw error;
  }
};

export const deleteCardService = async (id: string) => {
  try {
    const deletedCard = await prisma.cards.delete({
      where: {
        Id: Number(id),
      },

      select: {
        Id: true,
        cardHolder: true,
        cardNumber: true,
      },
    });

    return deletedCard;
  } catch (error) {
    console.error("Error en deleteCardService:", error);

    throw new Error("Error al eliminar la tarjeta en la base de datos.");
  }
};

export const updateCardService = async (id: string, data: UpdateCardData) => {
  try {
    const updatedCard = await prisma.cards.update({
      where: {
        Id: Number(id),
      },
      data: data,
      select: {
        Id: true,
        cardHolder: true,
        cardNumber: true,
        expDate: true,
      },
    });

    return updatedCard;
  } catch (error) {
    console.error("Error en updateCardService:", error);
    throw new Error("Error al actualizar la tarjeta en la base de datos.");
  }
};

import { Request, Response } from "express";
import {
  createCardService,
  deleteCardService,
  getCardsServices,
  updateCardService,
} from "./cards.services";
import { CardBody, UpdateCardBody } from "../../types";

export const GETcardsController = async (req: Request, res: Response) => {
  try {
    let cardHolder = req.query.cardHolder as string | undefined;
    let id = req.query.id as string | undefined;

    const isSingleResourceSearch = id && !cardHolder;

    const cardsInDb = await getCardsServices({ cardHolder, id });

    if (isSingleResourceSearch && cardsInDb.length === 0) {
      return res.status(404).json({
        message: `Tarjeta con ID '${id}' no encontrada.`,
      });
    }

    return res.status(200).json(cardsInDb);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Ocurrió un error interno del servidor.",
      error: err instanceof Error ? err.message : "Error desconocido",
    });
  }
};

export const POSTcardController = async (req: Request, res: Response) => {
  try {
    const cardData = req.body as CardBody;

    const newCard = await createCardService(cardData);

    return res.status(201).json({
      message: "Tarjeta creada y registrada con éxito.",
      data: {
        Id: newCard.Id,
        cardHolder: newCard.cardHolder,
        lastFour: newCard.cardNumber.slice(-4),
        expDate: newCard.expDate,
      },
    });
  } catch (error) {
    console.error("Error en POSTcardController:", error);
    return res.status(500).json({
      message: "Error interno del servidor al intentar crear la tarjeta.",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const DELETEcardController = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (!idToDelete) {
      return res
        .status(400)
        .json({ message: "Se requiere un ID para eliminar la tarjeta." });
    }

    const deletedCard = await deleteCardService(idToDelete);

    return res.status(204).json(deletedCard);
    
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al intentar eliminar.";

    console.error("Error en DELETEcardController:", error);
    return res.status(500).json({
      message: "Error interno del servidor.",
      error: errorMessage,
    });
  }
};

export const PUTcardController = async (req: Request, res: Response) => {
  try {
    const idToUpdate = req.params.id;

    const dataToUpdate = req.body as UpdateCardBody;

    if (!idToUpdate) {
      return res
        .status(400)
        .json({ message: "Se requiere un ID para actualizar la tarjeta." });
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return res
        .status(400)
        .json({ message: "El cuerpo de la solicitud no puede estar vacío." });
    }

    const updatedCard = await updateCardService(idToUpdate, dataToUpdate);

    return res.status(200).json({
      message: "Tarjeta actualizada con éxito.",
      data: updatedCard,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";

    console.error("Error en PUTcardController:", error);
    return res.status(500).json({
      message: "Error interno del servidor.",
      error: errorMessage,
    });
  }
};

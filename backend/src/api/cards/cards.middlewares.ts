import { Request, Response, NextFunction } from "express";
import { CardBody } from "../../types";

export const POSTvalidateCards = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardHolder, cvv, expDate, cardNumber } = req.body as CardBody;

  if (!cardHolder || !cvv || !expDate || !cardNumber) {
    return res.status(400).json({
      message: "Faltan campos obligatorios para la creación de la tarjeta.",
    });
  }

  if (cvv.length < 3 || cvv.length > 4) {
    return res.status(400).json({
      message: "El CVV debe tener 3 dígitos.",
    });
  }

  next();
};

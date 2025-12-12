export type Field<T> = {
  value: T;
  error: string;
};

export type form = {
  cardNumber: Field<string[]>;
  expDate: Field<string>;
  cardHolder: Field<string>;
  cvv: Field<string>;
};

export interface CardBody {
  cardHolder: string;
  cvv: string;
  expDate: string;
  cardNumber: string;
}

export interface UpdateCardData {
  cardHolder?: string;
  cvv?: string;
  expDate?: string;
  cardNumber?: string;
}

export interface CardDetail {
  id: string;
  cardHolder: string;
  expDate: string;
}

export interface CardQuery {
  id?: string;
  cardHolder?: string;
}


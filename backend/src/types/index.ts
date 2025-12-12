export interface CardBody {
    cardHolder: string;
    cvv: string;
    expDate: string;
    cardNumber: string;
}


export interface NewCardData {
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


export interface UpdateCardBody {
    cardHolder?: string;
    cvv?: string;
    expDate?: string;
    cardNumber?: string;
}

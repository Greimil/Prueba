-- CreateTable
CREATE TABLE "cards" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardHolder" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL
);

/*
  Warnings:

  - You are about to drop the column `invoice_amt` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_tax` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_total` on the `purchases` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_purchases" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL,
    "credit_expire" TEXT NOT NULL,
    "credit_cvv" TEXT NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "purchases_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchases" ("city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "order_date", "postal_code", "province", "purchase_id", "street") SELECT "city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "order_date", "postal_code", "province", "purchase_id", "street" FROM "purchases";
DROP TABLE "purchases";
ALTER TABLE "new_purchases" RENAME TO "purchases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

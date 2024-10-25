/*
  Warnings:

  - You are about to drop the column `descrition` on the `image` table. All the data in the column will be lost.
  - Added the required column `description` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_image" ("id", "name", "path", "title") SELECT "id", "name", "path", "title" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
CREATE UNIQUE INDEX "image_name_key" ON "image"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

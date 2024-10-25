/*
  Warnings:

  - Added the required column `descrition` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descrition" TEXT NOT NULL
);
INSERT INTO "new_image" ("id", "name", "path") SELECT "id", "name", "path" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
CREATE UNIQUE INDEX "image_name_key" ON "image"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" TEXT NOT NULL,
    "vote" INTEGER
);
INSERT INTO "new_Quote" ("id", "quote", "vote") SELECT "id", "quote", "vote" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

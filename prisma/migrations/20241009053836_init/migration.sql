-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "vote" INTEGER,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL
);
INSERT INTO "new_User" ("firstname", "id", "lastname", "password", "username", "vote") SELECT "firstname", "id", "lastname", "password", "username", "vote" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

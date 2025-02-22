/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Search` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Search" DROP CONSTRAINT "Search_userId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "Search";

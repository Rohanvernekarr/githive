/*
  Warnings:

  - Added the required column `repoOwner` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "repoOwner" TEXT NOT NULL;

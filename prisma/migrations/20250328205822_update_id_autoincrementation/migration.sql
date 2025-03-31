/*
  Warnings:

  - Made the column `ownerId` on table `Repository` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_ownerId_fkey";

-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "ownerId" SET NOT NULL;
DROP SEQUENCE "Repository_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

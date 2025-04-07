/*
  Warnings:

  - You are about to drop the column `github_id` on the `Contribution` table. All the data in the column will be lost.
  - Made the column `html_url` on table `Repository` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Contribution_github_id_key";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "github_id";

-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "html_url" SET NOT NULL,
ALTER COLUMN "stargazers_count" SET DEFAULT 0;

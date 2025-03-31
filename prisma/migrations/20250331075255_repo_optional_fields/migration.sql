-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "html_url" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "stargazers_count" DROP NOT NULL;

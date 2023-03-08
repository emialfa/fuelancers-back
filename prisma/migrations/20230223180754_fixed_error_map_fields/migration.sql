/*
  Warnings:

  - You are about to drop the column `exp_id` on the `experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "experience_exp_id_key";

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "exp_id";

-- AlterTable
ALTER TABLE "list_languages" ADD COLUMN     "flag" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "iso" TEXT NOT NULL DEFAULT '';

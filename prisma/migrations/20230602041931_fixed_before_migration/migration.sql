/*
  Warnings:

  - You are about to drop the column `exp_id` on the `expert_portfolios` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "expert_portfolios_exp_id_key";

-- AlterTable
ALTER TABLE "expert_portfolios" DROP COLUMN "exp_id";

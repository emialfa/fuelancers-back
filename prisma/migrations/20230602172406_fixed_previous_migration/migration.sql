/*
  Warnings:

  - You are about to drop the `portfolio_on_experts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[exp_id]` on the table `expert_portfolios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exp_id` to the `expert_portfolios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "portfolio_on_experts" DROP CONSTRAINT "portfolio_on_experts_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_on_experts" DROP CONSTRAINT "portfolio_on_experts_portfolio_id_fkey";

-- AlterTable
ALTER TABLE "expert_portfolios" ADD COLUMN     "exp_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "portfolio_on_experts";

-- CreateIndex
CREATE UNIQUE INDEX "expert_portfolios_exp_id_key" ON "expert_portfolios"("exp_id");

-- AddForeignKey
ALTER TABLE "expert_portfolios" ADD CONSTRAINT "expert_portfolios_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

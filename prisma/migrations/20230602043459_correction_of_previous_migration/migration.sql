/*
  Warnings:

  - The primary key for the `portfolio_on_experts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_id` on the `portfolio_on_experts` table. All the data in the column will be lost.
  - Added the required column `portfolio_id` to the `portfolio_on_experts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "portfolio_on_experts" DROP CONSTRAINT "portfolio_on_experts_skill_id_fkey";

-- AlterTable
ALTER TABLE "portfolio_on_experts" DROP CONSTRAINT "portfolio_on_experts_pkey",
DROP COLUMN "skill_id",
ADD COLUMN     "portfolio_id" INTEGER NOT NULL,
ADD CONSTRAINT "portfolio_on_experts_pkey" PRIMARY KEY ("portfolio_id", "exp_id");

-- AddForeignKey
ALTER TABLE "portfolio_on_experts" ADD CONSTRAINT "portfolio_on_experts_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "expert_portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

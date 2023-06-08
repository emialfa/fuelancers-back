-- DropForeignKey
ALTER TABLE "expert_portfolios" DROP CONSTRAINT "expert_portfolios_exp_id_fkey";

-- CreateTable
CREATE TABLE "portfolio_on_experts" (
    "skill_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_on_experts_pkey" PRIMARY KEY ("skill_id","exp_id")
);

-- AddForeignKey
ALTER TABLE "portfolio_on_experts" ADD CONSTRAINT "portfolio_on_experts_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "expert_portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_on_experts" ADD CONSTRAINT "portfolio_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

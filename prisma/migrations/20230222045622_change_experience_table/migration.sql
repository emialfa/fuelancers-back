-- DropForeignKey
ALTER TABLE "experience" DROP CONSTRAINT "experience_exp_id_fkey";

-- CreateTable
CREATE TABLE "experience_on_experts" (
    "experience_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experience_on_experts_pkey" PRIMARY KEY ("experience_id","exp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "experience_on_experts_experience_id_key" ON "experience_on_experts"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "experience_on_experts_exp_id_key" ON "experience_on_experts"("exp_id");

-- AddForeignKey
ALTER TABLE "experience_on_experts" ADD CONSTRAINT "experience_on_experts_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_on_experts" ADD CONSTRAINT "experience_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

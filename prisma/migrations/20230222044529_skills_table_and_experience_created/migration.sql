-- CreateTable
CREATE TABLE "experience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills_on_experts" (
    "skill_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_on_experts_pkey" PRIMARY KEY ("skill_id","exp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "experience_exp_id_key" ON "experience"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_on_experts_skill_id_key" ON "skills_on_experts"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_on_experts_exp_id_key" ON "skills_on_experts"("exp_id");

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_experts" ADD CONSTRAINT "skills_on_experts_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_experts" ADD CONSTRAINT "skills_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

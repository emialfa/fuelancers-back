/*
  Warnings:

  - A unique constraint covering the columns `[language_id]` on the table `language_on_experts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language_expert_id]` on the table `language_on_experts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[proficiency_id]` on the table `proficiency_on_experts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language_expert_id]` on the table `proficiency_on_experts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "language_on_experts_language_id_key" ON "language_on_experts"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "language_on_experts_language_expert_id_key" ON "language_on_experts"("language_expert_id");

-- CreateIndex
CREATE UNIQUE INDEX "proficiency_on_experts_proficiency_id_key" ON "proficiency_on_experts"("proficiency_id");

-- CreateIndex
CREATE UNIQUE INDEX "proficiency_on_experts_language_expert_id_key" ON "proficiency_on_experts"("language_expert_id");

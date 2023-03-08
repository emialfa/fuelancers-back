/*
  Warnings:

  - You are about to drop the `basic_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories_on_experts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `degrees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portfolios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "basic_profiles" DROP CONSTRAINT "basic_profiles_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_experts" DROP CONSTRAINT "categories_on_experts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_experts" DROP CONSTRAINT "categories_on_experts_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "degrees" DROP CONSTRAINT "degrees_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_exp_id_fkey";

-- DropTable
DROP TABLE "basic_profiles";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "categories_on_experts";

-- DropTable
DROP TABLE "degrees";

-- DropTable
DROP TABLE "languages";

-- DropTable
DROP TABLE "locations";

-- DropTable
DROP TABLE "portfolios";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "expert_personal_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" TEXT,
    "id_status" TEXT,
    "bgPhoto" TEXT,
    "picture" TEXT,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_personal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_degrees" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "academic_degree" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_languages" (
    "id" SERIAL NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_locations" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_portfolios" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "cite" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_fue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "experience_fue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_fue_on_experts" (
    "category_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experience_fue_on_experts_pkey" PRIMARY KEY ("category_id","exp_id")
);

-- CreateTable
CREATE TABLE "list_languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "list_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language_on_experts" (
    "language_id" INTEGER NOT NULL,
    "language_expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "language_on_experts_pkey" PRIMARY KEY ("language_id","language_expert_id")
);

-- CreateTable
CREATE TABLE "proficiency_language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "proficiency_language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proficiency_on_experts" (
    "proficiency_id" INTEGER NOT NULL,
    "language_expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proficiency_on_experts_pkey" PRIMARY KEY ("proficiency_id","language_expert_id")
);

-- CreateTable
CREATE TABLE "work_mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "work_mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_mode_on_experts" (
    "work_mode_id" INTEGER NOT NULL,
    "expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_mode_on_experts_pkey" PRIMARY KEY ("work_mode_id","expert_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expert_personal_info_exp_id_key" ON "expert_personal_info"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_locations_exp_id_key" ON "expert_locations"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_portfolios_exp_id_key" ON "expert_portfolios"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "experience_fue_on_experts_category_id_key" ON "experience_fue_on_experts"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "experience_fue_on_experts_exp_id_key" ON "experience_fue_on_experts"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "language_on_experts_language_id_key" ON "language_on_experts"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "language_on_experts_language_expert_id_key" ON "language_on_experts"("language_expert_id");

-- CreateIndex
CREATE UNIQUE INDEX "proficiency_on_experts_proficiency_id_key" ON "proficiency_on_experts"("proficiency_id");

-- CreateIndex
CREATE UNIQUE INDEX "proficiency_on_experts_language_expert_id_key" ON "proficiency_on_experts"("language_expert_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_mode_on_experts_work_mode_id_key" ON "work_mode_on_experts"("work_mode_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_mode_on_experts_expert_id_key" ON "work_mode_on_experts"("expert_id");

-- AddForeignKey
ALTER TABLE "expert_personal_info" ADD CONSTRAINT "expert_personal_info_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_degrees" ADD CONSTRAINT "expert_degrees_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_services" ADD CONSTRAINT "expert_services_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_languages" ADD CONSTRAINT "expert_languages_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_locations" ADD CONSTRAINT "expert_locations_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_portfolios" ADD CONSTRAINT "expert_portfolios_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_fue_on_experts" ADD CONSTRAINT "experience_fue_on_experts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "experience_fue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_fue_on_experts" ADD CONSTRAINT "experience_fue_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_on_experts" ADD CONSTRAINT "language_on_experts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "list_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_on_experts" ADD CONSTRAINT "language_on_experts_language_expert_id_fkey" FOREIGN KEY ("language_expert_id") REFERENCES "expert_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proficiency_on_experts" ADD CONSTRAINT "proficiency_on_experts_proficiency_id_fkey" FOREIGN KEY ("proficiency_id") REFERENCES "proficiency_language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proficiency_on_experts" ADD CONSTRAINT "proficiency_on_experts_language_expert_id_fkey" FOREIGN KEY ("language_expert_id") REFERENCES "expert_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_mode_on_experts" ADD CONSTRAINT "work_mode_on_experts_work_mode_id_fkey" FOREIGN KEY ("work_mode_id") REFERENCES "work_mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_mode_on_experts" ADD CONSTRAINT "work_mode_on_experts_expert_id_fkey" FOREIGN KEY ("expert_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

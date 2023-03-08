/*
  Warnings:

  - You are about to drop the column `name` on the `expert_personal_info` table. All the data in the column will be lost.
  - The primary key for the `status_on_experts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personal_info_id` on the `status_on_experts` table. All the data in the column will be lost.
  - You are about to drop the `experience_fue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `experience_fue_on_experts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[exp_id]` on the table `status_on_experts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exp_id` to the `status_on_experts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "experience_fue_on_experts" DROP CONSTRAINT "experience_fue_on_experts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "experience_fue_on_experts" DROP CONSTRAINT "experience_fue_on_experts_exp_id_fkey";

-- DropForeignKey
ALTER TABLE "status_on_experts" DROP CONSTRAINT "status_on_experts_personal_info_id_fkey";

-- DropIndex
DROP INDEX "status_on_experts_personal_info_id_key";

-- AlterTable
ALTER TABLE "expert_personal_info" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "status_on_experts" DROP CONSTRAINT "status_on_experts_pkey",
DROP COLUMN "personal_info_id",
ADD COLUMN     "exp_id" INTEGER NOT NULL,
ADD CONSTRAINT "status_on_experts_pkey" PRIMARY KEY ("status_id", "exp_id");

-- DropTable
DROP TABLE "experience_fue";

-- DropTable
DROP TABLE "experience_fue_on_experts";

-- CreateIndex
CREATE UNIQUE INDEX "status_on_experts_exp_id_key" ON "status_on_experts"("exp_id");

-- AddForeignKey
ALTER TABLE "status_on_experts" ADD CONSTRAINT "status_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

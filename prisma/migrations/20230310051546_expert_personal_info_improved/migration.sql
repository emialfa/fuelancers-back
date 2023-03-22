/*
  Warnings:

  - You are about to drop the column `bgPhoto` on the `expert_personal_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expert_personal_info" DROP COLUMN "bgPhoto",
ADD COLUMN     "bg_photo" TEXT;

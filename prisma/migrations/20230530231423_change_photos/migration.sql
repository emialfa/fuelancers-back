/*
  Warnings:

  - You are about to drop the column `bg_photo` on the `expert_personal_info` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `expert_personal_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expert_personal_info" DROP COLUMN "bg_photo",
DROP COLUMN "picture";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bg_photo" TEXT,
ADD COLUMN     "picture" TEXT;

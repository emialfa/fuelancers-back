/*
  Warnings:

  - You are about to drop the column `id_status` on the `expert_personal_info` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `expert_personal_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expert_personal_info" DROP COLUMN "id_status",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "list_languages" ALTER COLUMN "flag" DROP DEFAULT,
ALTER COLUMN "iso" DROP DEFAULT;

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_on_experts" (
    "status_id" INTEGER NOT NULL,
    "personal_info_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_on_experts_pkey" PRIMARY KEY ("status_id","personal_info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_on_experts_status_id_key" ON "status_on_experts"("status_id");

-- CreateIndex
CREATE UNIQUE INDEX "status_on_experts_personal_info_id_key" ON "status_on_experts"("personal_info_id");

-- AddForeignKey
ALTER TABLE "status_on_experts" ADD CONSTRAINT "status_on_experts_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_on_experts" ADD CONSTRAINT "status_on_experts_personal_info_id_fkey" FOREIGN KEY ("personal_info_id") REFERENCES "expert_personal_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

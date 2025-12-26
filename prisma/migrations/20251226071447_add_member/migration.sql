/*
  Warnings:

  - Added the required column `createdById` to the `WorkItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkItem" ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

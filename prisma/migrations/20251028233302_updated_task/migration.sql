/*
  Warnings:

  - Added the required column `color` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TaskType" AS ENUM ('TRABALHO', 'PROVA', 'REUNIAO', 'APRESENTACAO');

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hasReminder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "reminderTime" TEXT,
ADD COLUMN     "type" "public"."TaskType" NOT NULL DEFAULT 'TRABALHO';

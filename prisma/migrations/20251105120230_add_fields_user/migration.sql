-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "course" TEXT,
ADD COLUMN     "phone" TEXT;

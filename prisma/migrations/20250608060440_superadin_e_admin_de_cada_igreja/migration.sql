-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "Testemunho" ADD COLUMN     "ministryRole" "MinistryRole";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ministryRole" "MinistryRole";

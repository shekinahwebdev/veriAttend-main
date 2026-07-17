-- CreateEnum
CREATE TYPE "CommunityRole" AS ENUM ('DEVELOPER', 'DESIGNER', 'STUDENT', 'LECTURER', 'TESTER', 'OTHER');

-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "CommunityRole" NOT NULL,
    "githubUrl" TEXT,
    "linkedInUrl" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMember_email_key" ON "CommunityMember"("email");

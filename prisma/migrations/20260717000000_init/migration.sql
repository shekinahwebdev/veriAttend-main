-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "FeatureStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'TESTING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FeaturePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "BeneficiaryType" AS ENUM ('STUDENT', 'LECTURER', 'ADMIN', 'SUPER_ADMIN', 'EVERYONE');

-- CreateEnum
CREATE TYPE "FeatureCategory" AS ENUM ('AI', 'MOBILE', 'ATTENDANCE', 'ANALYTICS', 'INTEGRATIONS', 'ADMIN', 'NOTIFICATIONS', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'MERGED');

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "FeatureStatus" NOT NULL DEFAULT 'PLANNED',
    "category" "FeatureCategory" NOT NULL DEFAULT 'OTHER',
    "priority" "FeaturePriority" NOT NULL DEFAULT 'MEDIUM',
    "beneficiary" "BeneficiaryType" NOT NULL DEFAULT 'EVERYONE',
    "estimatedRelease" TEXT,
    "phase" TEXT,
    "estimatedDays" INTEGER,
    "assignedDev" TEXT,
    "version" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureVote" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureComment" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "parentId" TEXT,
    "authorName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureCommentLike" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureCommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureSubscriber" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FeatureCategory" NOT NULL DEFAULT 'OTHER',
    "beneficiary" "BeneficiaryType" NOT NULL DEFAULT 'EVERYONE',
    "priority" "FeaturePriority" NOT NULL DEFAULT 'MEDIUM',
    "submitterName" TEXT,
    "submitterEmail" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapStat" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "RoadmapStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureVote_featureId_voterId_key" ON "FeatureVote"("featureId", "voterId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureCommentLike_commentId_voterId_key" ON "FeatureCommentLike"("commentId", "voterId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureSubscriber_featureId_email_key" ON "FeatureSubscriber"("featureId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapStat_key_key" ON "RoadmapStat"("key");

-- AddForeignKey
ALTER TABLE "FeatureVote" ADD CONSTRAINT "FeatureVote_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureComment" ADD CONSTRAINT "FeatureComment_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureComment" ADD CONSTRAINT "FeatureComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FeatureComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCommentLike" ADD CONSTRAINT "FeatureCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "FeatureComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureSubscriber" ADD CONSTRAINT "FeatureSubscriber_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

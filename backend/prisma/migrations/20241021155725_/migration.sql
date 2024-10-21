-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ANALYST', 'ACCOUNTANT', 'APPROVERS');

-- CreateEnum
CREATE TYPE "ScriptStatus" AS ENUM ('AWAITNG_ANALYSIS', 'IN_ANALYSIS', 'AWAITNG_REVISION', 'IN_REVISION', 'AWAITNG_APPROVAL', 'IN_APPROVAL', 'APROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "script" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "phoneNumerAlt" TEXT,
    "scriptFile" TEXT NOT NULL,
    "responsibleId" TEXT,
    "status" "ScriptStatus" NOT NULL DEFAULT 'AWAITNG_ANALYSIS',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "script" ADD CONSTRAINT "script_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

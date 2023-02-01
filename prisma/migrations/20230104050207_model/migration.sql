-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'TECHNICIAN', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technicians" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_technicians" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" TEXT,
    "id_status" TEXT,
    "bgPhoto" TEXT,
    "picture" TEXT,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "profile_technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degrees" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "academicDegree" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "id_language" TEXT NOT NULL,
    "proficiency" TEXT NOT NULL,
    "id_proficiency" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "cite" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technician_social_networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tecId" INTEGER NOT NULL,

    CONSTRAINT "technician_social_networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavorites" (
    "profileId" INTEGER NOT NULL,
    "tecId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavorites_pkey" PRIMARY KEY ("profileId","tecId")
);

-- CreateTable
CREATE TABLE "UserContacts" (
    "profileId" INTEGER NOT NULL,
    "tecId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserContacts_pkey" PRIMARY KEY ("profileId","tecId")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnTechnicians" (
    "categoryId" INTEGER NOT NULL,
    "tecId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnTechnicians_pkey" PRIMARY KEY ("categoryId","tecId")
);

-- CreateTable
CREATE TABLE "social_networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "social_networks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "technicians_userId_key" ON "technicians"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_technicians_tecId_key" ON "profile_technicians"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_tecId_key" ON "locations"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_tecId_key" ON "portfolios"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "technician_social_networks_tecId_key" ON "technician_social_networks"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorites_profileId_key" ON "UserFavorites"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorites_tecId_key" ON "UserFavorites"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_profileId_key" ON "UserContacts"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_tecId_key" ON "UserContacts"("tecId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesOnTechnicians_categoryId_key" ON "CategoriesOnTechnicians"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesOnTechnicians_tecId_key" ON "CategoriesOnTechnicians"("tecId");

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_technicians" ADD CONSTRAINT "profile_technicians_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degrees" ADD CONSTRAINT "degrees_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_social_networks" ADD CONSTRAINT "technician_social_networks_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnTechnicians" ADD CONSTRAINT "CategoriesOnTechnicians_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnTechnicians" ADD CONSTRAINT "CategoriesOnTechnicians_tecId_fkey" FOREIGN KEY ("tecId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

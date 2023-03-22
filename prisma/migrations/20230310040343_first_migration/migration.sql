-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EXPERT', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "experts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_personal_info" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "title" TEXT,
    "bgPhoto" TEXT,
    "picture" TEXT,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_personal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_degrees" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "academic_degree" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_languages" (
    "id" SERIAL NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_locations" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_portfolios" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "cite" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_social_networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "exp_id" INTEGER NOT NULL,

    CONSTRAINT "expert_social_networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavorites" (
    "profile_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavorites_pkey" PRIMARY KEY ("profile_id","exp_id")
);

-- CreateTable
CREATE TABLE "UserContacts" (
    "profile_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserContacts_pkey" PRIMARY KEY ("profile_id","exp_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills_on_experts" (
    "skill_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_on_experts_pkey" PRIMARY KEY ("skill_id","exp_id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_on_experts" (
    "experience_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experience_on_experts_pkey" PRIMARY KEY ("experience_id","exp_id")
);

-- CreateTable
CREATE TABLE "categories_degree" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_degree_on_experts" (
    "category_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_degree_on_experts_pkey" PRIMARY KEY ("category_id","exp_id")
);

-- CreateTable
CREATE TABLE "list_languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso" TEXT NOT NULL,
    "flag" TEXT NOT NULL,

    CONSTRAINT "list_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language_on_experts" (
    "language_id" INTEGER NOT NULL,
    "language_expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "language_on_experts_pkey" PRIMARY KEY ("language_id","language_expert_id")
);

-- CreateTable
CREATE TABLE "proficiency_language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "proficiency_language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proficiency_on_experts" (
    "proficiency_id" INTEGER NOT NULL,
    "language_expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proficiency_on_experts_pkey" PRIMARY KEY ("proficiency_id","language_expert_id")
);

-- CreateTable
CREATE TABLE "work_mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "work_mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_mode_on_experts" (
    "work_mode_id" INTEGER NOT NULL,
    "expert_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_mode_on_experts_pkey" PRIMARY KEY ("work_mode_id","expert_id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_on_experts" (
    "status_id" INTEGER NOT NULL,
    "exp_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_on_experts_pkey" PRIMARY KEY ("status_id","exp_id")
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
CREATE UNIQUE INDEX "experts_user_id_key" ON "experts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_personal_info_exp_id_key" ON "expert_personal_info"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_locations_exp_id_key" ON "expert_locations"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_portfolios_exp_id_key" ON "expert_portfolios"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_social_networks_exp_id_key" ON "expert_social_networks"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorites_profile_id_key" ON "UserFavorites"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorites_exp_id_key" ON "UserFavorites"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_profile_id_key" ON "UserContacts"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserContacts_exp_id_key" ON "UserContacts"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_on_experts_skill_id_key" ON "skills_on_experts"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_on_experts_exp_id_key" ON "skills_on_experts"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "experience_on_experts_experience_id_key" ON "experience_on_experts"("experience_id");

-- CreateIndex
CREATE UNIQUE INDEX "experience_on_experts_exp_id_key" ON "experience_on_experts"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_degree_on_experts_category_id_key" ON "categories_degree_on_experts"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_degree_on_experts_exp_id_key" ON "categories_degree_on_experts"("exp_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_mode_on_experts_work_mode_id_key" ON "work_mode_on_experts"("work_mode_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_mode_on_experts_expert_id_key" ON "work_mode_on_experts"("expert_id");

-- CreateIndex
CREATE UNIQUE INDEX "status_on_experts_status_id_key" ON "status_on_experts"("status_id");

-- CreateIndex
CREATE UNIQUE INDEX "status_on_experts_exp_id_key" ON "status_on_experts"("exp_id");

-- AddForeignKey
ALTER TABLE "experts" ADD CONSTRAINT "experts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_personal_info" ADD CONSTRAINT "expert_personal_info_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_degrees" ADD CONSTRAINT "expert_degrees_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_services" ADD CONSTRAINT "expert_services_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_languages" ADD CONSTRAINT "expert_languages_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_locations" ADD CONSTRAINT "expert_locations_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_portfolios" ADD CONSTRAINT "expert_portfolios_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_social_networks" ADD CONSTRAINT "expert_social_networks_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_experts" ADD CONSTRAINT "skills_on_experts_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_experts" ADD CONSTRAINT "skills_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_on_experts" ADD CONSTRAINT "experience_on_experts_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_on_experts" ADD CONSTRAINT "experience_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_degree_on_experts" ADD CONSTRAINT "categories_degree_on_experts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories_degree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_degree_on_experts" ADD CONSTRAINT "categories_degree_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_on_experts" ADD CONSTRAINT "language_on_experts_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "list_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language_on_experts" ADD CONSTRAINT "language_on_experts_language_expert_id_fkey" FOREIGN KEY ("language_expert_id") REFERENCES "expert_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proficiency_on_experts" ADD CONSTRAINT "proficiency_on_experts_proficiency_id_fkey" FOREIGN KEY ("proficiency_id") REFERENCES "proficiency_language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proficiency_on_experts" ADD CONSTRAINT "proficiency_on_experts_language_expert_id_fkey" FOREIGN KEY ("language_expert_id") REFERENCES "expert_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_mode_on_experts" ADD CONSTRAINT "work_mode_on_experts_work_mode_id_fkey" FOREIGN KEY ("work_mode_id") REFERENCES "work_mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_mode_on_experts" ADD CONSTRAINT "work_mode_on_experts_expert_id_fkey" FOREIGN KEY ("expert_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_on_experts" ADD CONSTRAINT "status_on_experts_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_on_experts" ADD CONSTRAINT "status_on_experts_exp_id_fkey" FOREIGN KEY ("exp_id") REFERENCES "experts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

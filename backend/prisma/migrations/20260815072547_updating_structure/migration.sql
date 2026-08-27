/*
  Warnings:

  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Muscle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMuscle" (
    "exerciseId" INTEGER NOT NULL,
    "muscleId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseMuscle_pkey" PRIMARY KEY ("exerciseId","muscleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Muscle_name_key" ON "Muscle"("name");

-- AddForeignKey
ALTER TABLE "ExerciseMuscle" ADD CONSTRAINT "ExerciseMuscle_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscle" ADD CONSTRAINT "ExerciseMuscle_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

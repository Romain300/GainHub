const prisma = require("./client");

const exercises = [
    // Chest
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Dumbbell Bench Press",
    "Incline Dumbbell Press",
    "Chest Fly",
    "Cable Fly",
    "Dips",

    // Shoulders
    "Overhead Press",
    "Dumbbell Shoulder Press",
    "Arnold Press",
    "Lateral Raise",
    "Cable Lateral Raise",
    "Rear Delt Fly",
    "Face Pull",

    // Back
    "Pull Up",
    "Chin Up",
    "Lat Pulldown",
    "Barbell Row",
    "Pendlay Row",
    "Seated Cable Row",
    "Dumbbell Row",
    "Chest-Supported Row",
    "Barbell Shrug",

    // Legs
    "Squat",
    "Front Squat",
    "Leg Press",
    "Bulgarian Split Squat",
    "Lunges",
    "Leg Extension",
    "Leg Curl",
    "Romanian Deadlift",
    "Deadlift",
    "Hip Thrust",
    "Calf Raise",

    // Biceps
    "Barbell Curl",
    "Dumbbell Curl",
    "Hammer Curl",
    "Preacher Curl",
    "Incline Dumbbell Curl",
    "Cable Curl",

    // Triceps
    "Tricep Pushdown",
    "Overhead Tricep Extension",
    "Skull Crusher",
    "Close-Grip Bench Press",

    // Abs
    "Cable Crunch",
    "Hanging Leg Raise",
    "Ab Wheel Rollout",
    "Plank"
];

const muscles = [
    "Chest",
    "Lats",
    "Upper Back",
    "Lower Back",
    "Front Delts",
    "Side Delts",
    "Rear Delts",
    "Biceps",
    "Triceps",
    "Forearms",
    "Abs",
    "Obliques",
    "Quads",
    "Hamstrings",
    "Glutes",
    "Calves",
    "Hip Flexors",
    "Adductors",
    "Abductors",
    "Traps"
];

const exerciseMuscles = {
    "Bench Press": ["Chest", "Front Delts", "Triceps"],
    "Incline Bench Press": ["Chest", "Front Delts", "Triceps"],
    "Decline Bench Press": ["Chest", "Triceps"],
    "Dumbbell Bench Press": ["Chest", "Front Delts", "Triceps"],
    "Incline Dumbbell Press": ["Chest", "Front Delts", "Triceps"],
    "Chest Fly": ["Chest"],
    "Cable Fly": ["Chest"],
    "Dips": ["Chest", "Triceps"],

    "Overhead Press": ["Front Delts", "Side Delts", "Triceps"],
    "Dumbbell Shoulder Press": ["Front Delts", "Side Delts", "Triceps"],
    "Arnold Press": ["Front Delts", "Side Delts", "Triceps"],
    "Lateral Raise": ["Side Delts"],
    "Cable Lateral Raise": ["Side Delts"],
    "Rear Delt Fly": ["Rear Delts"],
    "Face Pull": ["Rear Delts", "Upper Back"],

    "Pull Up": ["Lats", "Biceps", "Upper Back"],
    "Chin Up": ["Lats", "Biceps", "Upper Back"],
    "Lat Pulldown": ["Lats", "Biceps"],
    "Barbell Row": ["Upper Back", "Lats", "Biceps"],
    "Pendlay Row": ["Upper Back", "Lats", "Biceps"],
    "Seated Cable Row": ["Upper Back", "Lats", "Biceps"],
    "Dumbbell Row": ["Lats", "Upper Back", "Biceps"],
    "Chest-Supported Row": ["Upper Back", "Lats", "Biceps"],
    "Barbell Shrug": ["Traps"],

    "Squat": ["Quads", "Glutes", "Adductors"],
    "Front Squat": ["Quads", "Glutes"],
    "Leg Press": ["Quads", "Glutes"],
    "Bulgarian Split Squat": ["Quads", "Glutes"],
    "Lunges": ["Quads", "Glutes", "Hamstrings"],
    "Leg Extension": ["Quads"],
    "Leg Curl": ["Hamstrings"],
    "Romanian Deadlift": ["Hamstrings", "Glutes", "Lower Back"],
    "Deadlift": ["Hamstrings", "Glutes", "Lower Back", "Traps"],
    "Hip Thrust": ["Glutes", "Hamstrings"],
    "Calf Raise": ["Calves"],

    "Barbell Curl": ["Biceps", "Forearms"],
    "Dumbbell Curl": ["Biceps", "Forearms"],
    "Hammer Curl": ["Biceps", "Forearms"],
    "Preacher Curl": ["Biceps"],
    "Incline Dumbbell Curl": ["Biceps"],
    "Cable Curl": ["Biceps"],

    "Tricep Pushdown": ["Triceps"],
    "Overhead Tricep Extension": ["Triceps"],
    "Skull Crusher": ["Triceps"],
    "Close-Grip Bench Press": ["Triceps", "Chest"],

    "Cable Crunch": ["Abs"],
    "Hanging Leg Raise": ["Abs", "Hip Flexors"],
    "Ab Wheel Rollout": ["Abs"],
    "Plank": ["Abs", "Obliques"]
}

async function main() {
    console.log("seeding...");
    for (const name of exercises) {
        try {
            await prisma.exercise.upsert({
                where: {name},
                update: {},
                create: {name},
            });
        }catch (error) {
            console.error(`Error adding ${name}:`, error);
        }
    }

    for (const name of muscles) {
        try {
            await prisma.muscle.upsert({
                where: {name},
                update: {},
                create: {name}, 
            });
        }catch (error) {
            console.error(`Error adding ${name}:`, error)
        }
    }

    for (const [exerciseName, muscleNames] of Object.entries(exerciseMuscles)) {
        try {
            const exercise = await prisma.exercise.findUnique({
                where: { name: exerciseName }
            });

            for (const muscleName of muscleNames) {
                const muscle = await prisma.muscle.findUnique({
                    where: { name: muscleName }
                });

                await prisma.exerciseMuscle.upsert({
                    where: {
                        exerciseId_muscleId: {
                            exerciseId: exercise.id,
                            muscleId: muscle.id
                        }
                    },
                    update: {},
                    create: {
                        exerciseId: exercise.id,
                        muscleId: muscle.id
                    }
                });
            }
        }catch(error) {
            console.error(`Error adding ${exerciceName}:`, error);
        }
    }

    console.log("seeding done");
};

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
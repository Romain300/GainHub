const prisma = require("./client");

const exercises = [
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Overhead Press",
    "Dumbbell Shoulder Press",
    "Lateral Raise",
    "Cable Fly",
    "Dumbbell Fly",
    "Dips",
    
    "Pull Up",
    "Chin Up",
    "Lat Pulldown",
    "Barbell Row",
    "Seated Cable Row",
    "Dumbbell Row",
    "Face Pull",
    "Barbell Shrug",
    
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

    "Barbell Curl",
    "Dumbbell Curl",
    "Hammer Curl",
    "Preacher Curl",
    "Tricep Pushdown",
    "Skull Crusher",
    "Overhead Tricep Extension",

    "Cable Crunch",
    "Hanging Leg Raise",
    "Ab Wheel Rollout"
];

async function main() {
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
};

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
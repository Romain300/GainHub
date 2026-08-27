const prisma = require("./client");

async function createUser(firstname, lastname, username, email, password) {
    try {
        return await prisma.user.create({
            data: {
                firstname,
                lastname,
                username,
                email,
                password
            }
        })
    }catch(error) {
        throw error;
    }
};

async function getUserByEmail(email) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    }catch(error) {
        throw error;
    }
};

async function getAllExercises() {
    try {
        return await prisma.exercise.findMany({
            select: {
                name: true,
                id: true,
            }
        });
    }catch (error) {
        throw error;
    }
};

async function createWorkout(userId, name, exercises, date) {
    try {
        const newWorkout = await prisma.workout.create({
            data: {
                userId: userId,
                name: name,
                date: date,
            }
        });

        for (const [index, exercise] of exercises.entries()) {
            await createWorkoutExercise(newWorkout.id, exercise, exercise.sets, index+1)
        }

        return newWorkout;
    }catch (error) {
        throw error;
    }
};

async function createSet(workoutExerciseId, set) {
    try {
        return await prisma.set.create({
            data: {
                reps: set.reps,
                weight: set.weight,
                workoutExerciseId: workoutExerciseId
            }
        });
    }catch (error) {
        throw error;
    }
};

async function createWorkoutExercise(workoutId, exercise, sets, order) {
    try {
        const newExercise = await prisma.workoutExercise.create({
            data: {
                workoutId: workoutId,
                exerciseId: exercise.id,
                order: order
            }
        });

        for (const set of sets) {
            await createSet(newExercise.id, set);
        }

        return newExercise;
    }catch (error) {
        throw error;
    }
};




module.exports = {
    createUser,
    getUserByEmail,
    getAllExercises,
    createWorkout
};

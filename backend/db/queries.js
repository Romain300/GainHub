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

module.exports = {
    createUser,
    getUserByEmail
};

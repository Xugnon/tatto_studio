const prisma = require("../../../../database/prismaClient");
const { compare } = require("bcryptjs");
const AppError = require("../../../../utils/errors/appError");
const { sign } = require("jsonwebtoken");

class AuthenticateUserUseCase {
  async execute({ email, password }) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError("Email or Password invalid!!", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or Password invalid!!", 401);
    } else {
      const token = sign({ email }, process.env.SECRET_USER, {
        subject: user.id,
        expiresIn: "15d",
      });

      return token;
    }
  }
}

module.exports = AuthenticateUserUseCase;

const AppError = require("../../../../utils/errors/appError");

class InsertUserServiceUseCase {
  constructor(usersRepository, servicesRepository) {
    this.usersRepository = usersRepository;
    this.servicesRepository = servicesRepository;
  }

  async execute({ id_user, id_service }) {
    const user = await this.usersRepository.findById({ id_user });
    if (!user) {
      throw new AppError("User not found!!", 404);
    }

    const service = await this.servicesRepository.findById({ id_service });
    if (!service) {
      throw new AppError("Service not found!!", 404);
    }

    const upService = await this.servicesRepository.insertUser({
      id_service: service.id,
      id_user: user.id,
    });

    return upService;
  }
}

module.exports = InsertUserServiceUseCase;

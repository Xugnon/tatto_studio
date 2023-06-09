const Router = require("express");

const ensureAuthUser = require("../middlewares/ensureAuthUser");
const ensureAdminUser = require("../middlewares/ensureAdminUser");
const CreateScheduleController = require("../../../../modules/schedules/useCases/createSchedule/createScheduleController");
const GetAvailableSchedulesController = require("../../../../modules/schedules/useCases/getAvailableSchedules/getAvailableSchedulesController");
const InsertUserSchedulesController = require("../../../../modules/schedules/useCases/insertUserSchedules/insertUserSchedulesController");
const CancelScheduleController = require("../../../../modules/schedules/useCases/cancelShedule/cancelScheduleController");
const DeleteScheduleController = require("../../../../modules/schedules/useCases/deleteSchedule/deleteScheduleController");

const schedulesRoutes = Router();

const createScheduleController = new CreateScheduleController();
const getAvailableSchedulesController = new GetAvailableSchedulesController();
const insertUserSchedulesController = new InsertUserSchedulesController();
const cancelScheduleController = new CancelScheduleController();
const deleteScheduleController = new DeleteScheduleController();

schedulesRoutes.post(
  "/",
  ensureAuthUser,
  ensureAdminUser,
  createScheduleController.handle
);

schedulesRoutes.get(
  "/",
  ensureAuthUser,
  getAvailableSchedulesController.handle
);

schedulesRoutes.put(
  "/:id",
  ensureAuthUser,
  insertUserSchedulesController.handle
);

schedulesRoutes.put(
  "/cancel/:id",
  ensureAuthUser,
  cancelScheduleController.handle
);

schedulesRoutes.delete(
  "/:id",
  ensureAuthUser,
  ensureAdminUser,
  deleteScheduleController.handle
);

module.exports = schedulesRoutes;

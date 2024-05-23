import { Router } from "express";

import typesExercise from "./typesexercise";
import category from "./category";
import exercise from "./exercise";
import users from "./users";
import routine from "./routine";
import mainRoutine from "./mainRoutine";
import sessions from "./sessions";
import sessions_exercise from "./sessions_exercise";
import calendar from "./calendar";

const routes = Router();

routes.use("/typeExercise", typesExercise);

routes.use("/category", category);

routes.use("/exercise", exercise);

routes.use("/users", users);

routes.use("/routine", routine);

routes.use("/mainRoutine", mainRoutine);

routes.use("/sessions", sessions);

routes.use("/sessions_exercise", sessions_exercise);

routes.use("/calendar", calendar);

export default routes;

import { Router } from "express";
import { todosController } from "../controllers/todosController";

const router = Router();

router.get('/getTodos', todosController.getTodos);
router.post('/createTodo', todosController.createTodo);
router.delete('/removeTodo', todosController.deleteTodo);
router.put('/updateTodo', todosController.updateTodo);
router.get('/getUser', todosController.getUser);

export { router };
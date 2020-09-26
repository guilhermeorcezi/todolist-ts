import Router from 'express';
import TodoController from './controllers/TodoController';

const routes = Router();

const todoController = new TodoController();

routes.post('/todos', todoController.create);
routes.get('/todos', todoController.show);
routes.get('/todos/:id', todoController.read);
routes.delete('/todos/:id', todoController.destroy);
routes.patch('/todos/:id', todoController.update);
routes.put('/todos/:id', todoController.updateStatus);

export default routes;

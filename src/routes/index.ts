import { Router } from 'express';
import usersRoutes from './users.routes';
import projectsRoutes from './project.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/projects', projectsRoutes);

export default routes;

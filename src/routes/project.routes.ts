import { Router } from 'express';
import ProjectsRepository from '../databases/repositories/ProjectsRepository';
import { getCustomRepository } from 'typeorm';

const projetosRoutes = Router();

projetosRoutes.get('/', async (request, response) => {
  const projetosRepository = getCustomRepository(ProjectsRepository);

  const projects = await projetosRepository.find({});

  return response.json(projects);
});

projetosRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const projetosRepository = getCustomRepository(ProjectsRepository);

  const project = await projetosRepository.findOne({ where: { id } });

  if (!project) {
    return response.status(400).json({ error: { message: 'Projeto não encontrado!' } })
  }

  return response.json(project);
});

projetosRoutes.post('/', async (request, response) => {
  const { name, tipo } = request.body;

  const projetosRepository = getCustomRepository(ProjectsRepository);

  const project = projetosRepository.create({ name, tipo });

  await projetosRepository.save(project);

  return response.json(project);
});

projetosRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, tipo } = request.body;

  const projetosRepository = getCustomRepository(ProjectsRepository);

  const project = await projetosRepository.findOne({ where: { id } });

  if (!project) {
    return response.status(400).json({ error: { message: 'Projeto não encontrado!' } })
  }

  project.name = name ? name : project.name;
  project.tipo = tipo ? tipo : project.tipo;

  await projetosRepository.save(project);

  return response.json(project);
});

projetosRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const projetosRepository = getCustomRepository(ProjectsRepository);

  const project = await projetosRepository.findOne({ where: { id } });

  if (!project) {
    return response.status(400).json({ error: { message: 'Projeto não encontrado!' } })
  }

  await projetosRepository.delete(project);

  return response.send();
});

export default projetosRoutes;

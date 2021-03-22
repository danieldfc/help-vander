import { Router } from 'express';
import UsersRepository from '../databases/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import ProjectRepository from '../databases/repositories/ProjectsRepository';

const usersRoutes = Router();

/**
 * GET - lista informações da tabela
 * POST - cria informações na tabela
 * PUT - atualiza informações na tabela
 * DELETE - deleta informações na tabela
 * 
 * PATCH - atualizar uma única informação na tabela
 */

usersRoutes.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UsersRepository);

  const users = await userRepository.find({});

  return response.json(users);
});

usersRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;
  const userRepository = getCustomRepository(UsersRepository);

  const user = await userRepository.findOne({ where: { id } });

  return response.json(user);
});

usersRoutes.post('/', async (request, response) => {
  const { name, email } = request.body;

  const userRepository = getCustomRepository(UsersRepository);

  const userExists = await userRepository.findOne({ where: { email } });

  if (userExists) {
    // return response.json(userExists);
    return response.status(400).json({ error: { message: 'Usuário já existente!' } })
  }

  const user = userRepository.create({ name, email });

  await userRepository.save(user);

  return response.json(user);
});

usersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const userRepository = getCustomRepository(UsersRepository);

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return response.status(400).json({ error: { message: 'Usuário não existente!' } })
  }

  if (email) {
    const emailExists = await userRepository.findOne({ where: { email } });

    if (emailExists) {
      return response.status(400).json({ error: { message: 'Email já está sendo utilizado!' } });
    }
  }

  user.name = name ? name : user.name;
  user.email = email ? email : user.email;

  await userRepository.save(user);

  return response.json(user);
});

usersRoutes.patch('/:user_id/projects/:project_id', async (request, response) => {
  const { user_id, project_id } = request.params;
 
  const usersRepository = getCustomRepository(UsersRepository);
  const projectsRepository = getCustomRepository(ProjectRepository);

  const user = await usersRepository.findOne({ where: { id: user_id } });
  
  if (!user) {
    return response.status(400).json({ error: { message: 'Usuário não existente!' } })
  }

  const project = await projectsRepository.findOne({ where: { id: project_id } });

  if (!project) {
    return response.status(400).json({ error: { message: 'Projeto não existente!' } })
  };

  user.projectId = project.id;
  user.project = project;

  await usersRepository.manager.save(user);

  return response.json(user);
});

usersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userRepository = getCustomRepository(UsersRepository);

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return response.status(400).json({ error: { message: 'Usuário não existente!' } });
  }

  await userRepository.delete(user);

  return response.send();
});

export default usersRoutes;

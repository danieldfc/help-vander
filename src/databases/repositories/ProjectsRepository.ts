import { EntityRepository, Repository } from 'typeorm';

import Projeto from '../entities/Projeto';

@EntityRepository(Projeto)
export default class ProjectRepository extends Repository<Projeto> {}
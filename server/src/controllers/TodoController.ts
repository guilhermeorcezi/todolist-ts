import { Request, Response } from 'express';
import knex from '../database/connection';

export default class TodoController {
  async create(request: Request, response: Response) {
    const { content } = request.body;

    const todo = await knex('todo').insert({
      content,
      status: false,
    });

    return response.json(todo);
  }

  async show(request: Request, response: Response) {
    const todos = await knex.select().table('todo');

    return response.json(todos);
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;

    const todo = await knex.select().table('todo').where({ id });

    return response.json(todo);
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    const todo = await knex('todo').delete().where({ id });

    return response.json(todo);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { content } = request.body;

    const todoUpdated = await knex('todo').update({ content }).where({ id });

    return response.json(todoUpdated);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;

    const todoUpdated = await knex('todo')
      .update({ status: true })
      .where({ id });

    return response.json(todoUpdated);
  }
}

import Knex from 'knex'

export async function up(knex: Knex){
return knex.schema.createTable('todo',table =>
{
    table.increments('id').primary();
    table.string('content').notNullable();
    table.boolean('status').notNullable()
})
}

export async function down(knex: Knex){
    return knex.schema.dropSchema('todo')
}
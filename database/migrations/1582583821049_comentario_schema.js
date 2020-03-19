'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComentarioSchema extends Schema {
  up () {
    this.create('comentarios', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('tarefa_id')
        .unsigned()
        .references('id')
        .inTable('tarefas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.text('texto')
      table.timestamps()
    })
  }

  down () {
    this.drop('comentarios')
  }
}

module.exports = ComentarioSchema

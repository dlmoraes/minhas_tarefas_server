'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TarefaSchema extends Schema {
  up () {
    this.create('tarefas', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('atribuido_por_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('titulo', 100).notNullable()
      table.date('data_vencimento').notNullable()
      table.boolean('finalizado').defaultTo(false)
      table.boolean('bloqueado').defaultTo(false)
      table.boolean('arquivado').defaultTo(false)
      table.string('prioridade').notNullable().defaultTo('Normal')
      table.timestamps()
    })
  }

  down () {
    this.drop('tarefas')
  }
}

module.exports = TarefaSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvidenciaSchema extends Schema {
  up () {
    this.create('evidencias', (table) => {
      table.increments()
      table
        .integer('tarefa_id')
        .unsigned()
        .references('id')
        .inTable('tarefas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('evidencias')
  }
}

module.exports = EvidenciaSchema

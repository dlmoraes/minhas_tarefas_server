"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddDtaFinalizadoTarefaSchema extends Schema {
  up() {
    this.alter("tarefas", table => {
      table.date("data_fim");
    });
  }

  down() {
    this.alter("tarefas", table => {
      // reverse alternations
    });
  }
}

module.exports = AddDtaFinalizadoTarefaSchema;

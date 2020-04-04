"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddCamposComplementaresProjetoSchema extends Schema {
  up() {
    this.alter("projetos", table => {
      table
        .string("situacao", 2)
        .defaultTo("AT")
        .notNullable();
      table.date("data_vencimento");
      table.date("data_fim");
      table
        .string("prioridade", 10)
        .defaultTo("Baixa")
        .notNullable();
    });
  }

  down() {
    this.alter("projetos", table => {
      table.dropColumn("situacao");
      table.dropColumn("data_vencimento");
      table.dropColumn("data_fim");
      table.dropColumn("prioridade");
    });
  }
}

module.exports = AddCamposComplementaresProjetoSchema;

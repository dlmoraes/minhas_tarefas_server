'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjetoTarefaSchema extends Schema {
	up() {
		this.create('projeto_tarefas', (table) => {
			table.increments();
			table
				.integer('projeto_id')
				.unsigned()
				.references('id')
				.inTable('projetos')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table
				.integer('tarefa_id')
				.unsigned()
				.references('id')
				.inTable('tarefas')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.timestamps();
		});
	}

	down() {
		this.drop('projeto_tarefas');
	}
}

module.exports = ProjetoTarefaSchema;

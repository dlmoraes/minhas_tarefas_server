'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjetoSchema extends Schema {
	up() {
		this.create('projetos', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.string('titulo', 100).notNullable();
			table.text('resumo');
			table.timestamps();
		});
	}

	down() {
		this.drop('projetos');
	}
}

module.exports = ProjetoSchema;

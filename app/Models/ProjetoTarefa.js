'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProjetoTarefa extends Model {
	projeto() {
		return this.belongsTo('App/Models/Projeto', 'projeto_id', 'id');
	}

	tarefa() {
		return this.belongsTo('App/Models/Tarefa', 'tarefa_id', 'id');
	}

	user() {
		return this.belongsTo('App/Models/User', 'user_id', 'id');
	}
}

module.exports = ProjetoTarefa;

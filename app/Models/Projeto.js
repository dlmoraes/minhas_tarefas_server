'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Projeto extends Model {
	user() {
		return this.belongsTo('App/Models/User', 'user_id', 'id');
	}

	tarefas() {
		return this.hasMany('App/Models/ProjetoTarefa', 'id', 'projeto_id');
	}
}

module.exports = Projeto;

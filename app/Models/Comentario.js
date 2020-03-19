'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comentario extends Model {

  user() {
    return this.belongsTo('App/Models/User')
  }

  tarefa() {
    return this.belongsTo('App/Models/Tarefa')
  }

  static get hidden() {
    return ['user_id', 'tarefa_id', 'updated_at']
  }

}

module.exports = Comentario

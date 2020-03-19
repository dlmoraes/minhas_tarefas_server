'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarefa extends Model {

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

  atribuidor() {
    return this.belongsTo('App/Models/User', 'atribuido_por_id', 'id')
  }

  comentarios() {
    return this.hasMany('App/Models/Comentario', 'id', 'tarefa_id')
  }

  evidencias() {
    return this.hasMany('App/Models/Evidencia', 'id', 'tarefa_id')
  }

}

module.exports = Tarefa

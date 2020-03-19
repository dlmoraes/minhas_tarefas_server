'use strict'

const Env = use("Env");
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evidencia extends Model {

  static get computed() {
    return ['url']
  }

  static get hidden() {
    return ['path ', 'tarefa_id', 'updated_at']
  }

  tarefa() {
    return this.belongsTo('App/Models/Tarefa')
  }

  getUrl({ path }) {
    return `${Env.get('APP_URL')}/evidencias/${path}`
  }

}

module.exports = Evidencia

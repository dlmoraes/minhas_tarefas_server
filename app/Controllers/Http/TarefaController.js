"use strict";

const Tarefa = use("App/Models/Tarefa");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tarefas
 */
class TarefaController {
  /**
   * Show a list of all tarefas.
   * GET tarefas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request }) {
    const { id } = auth.user;
    const tarefas = await Tarefa.query()
      .with("atribuidor")
      .with("evidencias")
      .with("comentarios.user")
      .where("user_id", id)
      .orWhere("atribuido_por_id", id)
      .fetch();
    return tarefas;
  }

  /**
   * Create/save a new tarefa.
   * POST tarefas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;
    let data = request.only([
      "atribuido_por_id",
      "titulo",
      "data_vencimento",
      "data_fim",
      "finalizado",
      "bloqueado",
      "arquivado",
      "prioridade"
    ]);
    if (data.atribuido_por_id === undefined) {
      data.atribuido_por_id = id;
    }
    const tarefa = await Tarefa.create({ ...data, user_id: id });
    return tarefa;
  }

  /**
   * Display a single tarefa.
   * GET tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const tarefa = await Tarefa.findOrFail(params.id);
    await tarefa.loadMany(["comentarios", "evidencias", "user", "atribuidor"]);
    return tarefa;
  }

  /**
   * Update tarefa details.
   * PUT or PATCH tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const tarefa = await Tarefa.findOrFail(params.id);
    const data = request.only([
      "atribuido_por_id",
      "titulo",
      "data_vencimento",
      "data_fim",
      "finalizado",
      "bloqueado",
      "arquivado",
      "prioridade"
    ]);

    data.finalizado = !!data.data_fim;
    if (data.atribuido_por_id === undefined) {
      data.atribuido_por_id = tarefa.user_id;
    }

    tarefa.merge(data);
    await tarefa.save();
    return tarefa;
  }

  /**
   * Delete a tarefa with id.
   * DELETE tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const tarefa = await Tarefa.findOrFail(params.id);
    if (
      tarefa.user_id !== auth.user.id ||
      tarefa.atribuido_por_id !== auth.user.id
    ) {
      return response.status(401).send({ error: "Não autorizado" });
    }
    await tarefa.delete();
  }
}

module.exports = TarefaController;

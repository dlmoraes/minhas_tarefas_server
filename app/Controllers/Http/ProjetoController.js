"use strict";

const Projeto = use("App/Models/Projeto");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projetos
 */
class ProjetoController {
  /**
   * Show a list of all projetos.
   * GET projetos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request }) {
    const { id } = auth.user;
    const projetos = await Projeto.query()
      .where("user_id", id)
      .fetch();
    return projetos;
  }

  /**
   * Create/save a new projeto.
   * POST projetos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;
    let data = request.only(["titulo", "resumo"]);

    const projeto = await Projeto.create({ ...data, user_id: id });
    return projeto;
  }
  /**
   * Display a single projeto.
   * GET projetos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const projeto = await Projeto.findOrFail(params.id);
    await projeto.loadMany(["tarefas", "tarefas.user"]);
    return projeto;
  }

  /**
   * Update projeto details.
   * PUT or PATCH projetos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const projeto = await Projeto.findOrFail(params.id);
    const data = request.only(["titulo", "resumo"]);

    projeto.merge(data);
    await projeto.save();
    return projeto;
  }

  /**
   * Delete a projeto with id.
   * DELETE projetos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const projeto = await Projeto.findOrFail(params.id);
    if (projeto.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Não autorizado" });
    }
    await projeto.delete();
  }
}

module.exports = ProjetoController;

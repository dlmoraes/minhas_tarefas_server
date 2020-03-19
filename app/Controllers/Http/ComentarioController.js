"use strict";

const Comentario = use("App/Models/Comentario");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comentarios
 */
class ComentarioController {
  /**
   * Show a list of all comentarios.
   * GET comentarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request }) {
    const comentarios = await Comentario.query()
      .where("tarefa_id", params.id)
      .with("user")
      .fetch();
    return comentarios;
  }

  async store({ params, auth, request }) {
    const { id } = auth.user;
    const data = request.only(["texto"]);
    const comentario = await Comentario.create({
      ...data,
      user_id: id,
      tarefa_id: params.id
    });
    return comentario;
  }

  /**
   * Update comentario details.
   * PUT or PATCH comentarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const comentario = await Comentario.findOrFail(params.id);
    const data = request.only(["texto"]);
    comentario.merge(data);
    await comentario.save();
    return comentario;
  }

  /**
   * Delete a comentario with id.
   * DELETE comentarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const comentario = await Comentario.findOrFail(params.id);
    if (comentario.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Não autorizado" });
    }
    await comentario.delete();
  }
}

module.exports = ComentarioController;

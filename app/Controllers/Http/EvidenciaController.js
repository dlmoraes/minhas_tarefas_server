"use strict";

const Evidencia = use("App/Models/Evidencia");
const Tarefa = use("App/Models/Tarefa");
const Helpers = use("Helpers");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with evidencias
 */
class EvidenciaController {
  /**
   * Create/save a new evidencia.
   * POST evidencias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request }) {
    const tarefa = await Tarefa.findOrFail(params.id);
    const evidencias = request.file("image", {
      types: ["image"],
      size: "2mb"
    });

    await evidencias.moveAll(Helpers.tmpPath("uploads"), file => ({
      name: `${Date.now()}-${file.clientName}`
    }));

    if (!evidencias.movedAll()) {
      return evidencias.errors();
    }

    return await Promise.all(
      evidencias
        .movedList()
        .map(image => tarefa.evidencias().create({ path: image.fileName }))
    );
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }
}

module.exports = EvidenciaController;

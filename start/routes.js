"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/users/options/selects", "UserController.optionsSelect").middleware(
  "auth"
);
Route.get("/users/avatar", "UserController.getAvatar").middleware("auth");
Route.post("/users", "UserController.create");

Route.post("/sessions", "SessionController.create");

Route.resource("tarefas", "TarefaController")
  .apiOnly()
  .middleware("auth");

Route.post("tarefas/:id/evidencias", "EvidenciaController.store").middleware(
  "auth"
);

Route.get("evidencias/:path", "EvidenciaController.show");

Route.get("tarefas/:id/comentarios", "ComentarioController.index").middleware(
  "auth"
);
Route.post("tarefas/:id/comentarios", "ComentarioController.store").middleware(
  "auth"
);
Route.put("comentarios/:id", "ComentarioController.update").middleware("auth");
Route.delete("comentarios/:id", "ComentarioController.destroy").middleware(
  "auth"
);

Route.resource("projetos", "ProjetoController")
  .apiOnly()
  .middleware("auth");

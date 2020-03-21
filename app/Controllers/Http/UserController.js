"use strict";

const User = use("App/Models/User");

class UserController {
  async optionsSelect({ auth, request }) {
    const users = await User.query()
      .select("id as atribuido_por_id", "username", "avatar_path")
      .whereNot("id", auth.user.id)
      .fetch();
    return users;
  }

  async getAvatar({ auth, request }) {
    return auth.user.avatar_path;
  }

  async create({ request }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.create(data);
    return user;
  }
}

module.exports = UserController;

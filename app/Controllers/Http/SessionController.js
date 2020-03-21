"use strict";

const User = use("App/Models/User");

class SessionController {
  async create({ request, auth }) {
    const { username, password } = request.all();
    const token = await auth.attempt(username, password);

    const user = await User.query()
      .where("username", username)
      .first();

    token.username = username;
    token.avatar = user.avatar_path;

    return token;
  }
}

module.exports = SessionController;

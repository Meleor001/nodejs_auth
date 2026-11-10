import hashService from "../middleware/hashService.js";
import User from "../models/User.js";

class UserController {
  async registration(req, res) {
    try {
      const { name, lastName, phoneNumber, email, password } = req.body;
      console.log(name);

      const hashPassword = await hashService.hashPassword(password);

      const user = await User.create({
        name,
        lastName,
        phoneNumber,
        email,
        password: hashPassword,
      });
      res.status(200).json("Регистрация прошла успешно");
    } catch (err) {
      res.status(500).json("Ошибка при регистрации")
    }
  }

  async login(req, res){
    try {
      const {email , password} = req.body

      const user = await User.findOne({email})
      
      if(!user){
        return res.status(400).json("Неверный логин или пароль")
      }

      const isPassValid = await hashService.comparePassword(password , user.password)

      if(!isPassValid){
        return res.status(400).json("Неверный логин или пароль")
      }

      return res.json(user)
      
    } catch(err) {
      console.error("Ошибка логина:", err);
      return res.status(500).json("Ошибка сервера при входе");
    }
  }
}

export default new UserController();

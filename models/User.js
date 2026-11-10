import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Имя не можеть быть пустой"],
  },
  lastName: {
    type: String,
    required: [true, "Фамилия не можеть быть пустой"],
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Почта не может быть пустой!"],
    match: [/^\S+@\S+\.\S+$/ , "Введите корректный email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Пароль обязателен"],
    minLength: [6 , "Пароль должен быть не менее 6 символов"]
  },
});
export default mongoose.model("User", UserSchema);

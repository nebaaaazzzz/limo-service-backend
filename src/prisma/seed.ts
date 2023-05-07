import { User } from "../config/db";

(async () => {
  await User.create({
    data: {
      email: "neba@gmail.com",
      lastName: "Daniel",
      firstName: "Nebiyu",
      password: "$2a$10$EZq8FjlPlFQJtctyPFfOfuYBRf1SAb57C/Kj1AzKUrgFfpSpzAQSG",
      // password: "123456",
    },
  });
})();

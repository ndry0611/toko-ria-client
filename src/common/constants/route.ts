import { PUBLIC_URL } from "../../utils/api";

export enum NavigationRoutes {
  //Admin Website
  loginAdmin = "/admin/login",
  home = "/admin",

  //Categories
  category = "/admin/category",
  createCategory = "/admin/category/create",
  detailCategory = "/admin/category/[id]",

  //SpareParts
  sparePart = "/admin/spare-part",

<<<<<<< Updated upstream
  //Cars
  car = "/admin/car"
=======
  //Stock Adjustment
  stockAdjustment = "/admin/stock-adjustment",
>>>>>>> Stashed changes

  //User
  login = "/login"
}

export enum PublicImageRoutes {
  categories = PUBLIC_URL + "/uploads/categories/",
  users = PUBLIC_URL + "/uploads/users/",
  spareParts = PUBLIC_URL + "/uploads/spare_parts/"
}
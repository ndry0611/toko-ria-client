import { PUBLIC_URL } from "../../utils/api";

export enum NavigationRoutes {

  home = "/admin",
  car = "/admin/car",
  user = "/admin/user",
  brand = "/admin/brand",
  loginAdmin = "/admin/login",
  supplier = "/admin/supplier",
  category = "/admin/category",
  sparePart = "/admin/spare-part",
  stockAdjustment = "/admin/stock-adjustment",

  login = "/login"
}

export enum PublicImageRoutes {
  categories = PUBLIC_URL + "/uploads/categories/",
  users = PUBLIC_URL + "/uploads/users/",
  spareParts = PUBLIC_URL + "/uploads/spare_parts/"
}
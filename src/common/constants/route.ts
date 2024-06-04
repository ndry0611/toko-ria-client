import { PUBLIC_URL } from "../../utils/api";

export enum NavigationRoutes {
  login = "/login",
  register = "/register",
  forgetPassword = "/forget-password",

  adminHome = "/admin",
  car = "/admin/car",
  user = "/admin/user",
  brand = "/admin/brand",
  supplier = "/admin/supplier",
  category = "/admin/category",
  sparePart = "/admin/spare-part",
  stockAdjustment = "/admin/stock-adjustment",
  sales = '/admin/sales',
  purchase = '/admin/purchase',

  userHome = "/user",
  transaction = "/user/transaction",
  cart = "/user/cart",
  profile = "/user/profile",
  profileEdit = profile + "/edit",
  changePassword = "/user/change-password",
  complaint = "/user/complaint"
}

export enum PublicImageRoutes {
  categories = PUBLIC_URL + "/uploads/categories/",
  users = PUBLIC_URL + "/uploads/users/",
  spareParts = PUBLIC_URL + "/uploads/spare_parts/"
}
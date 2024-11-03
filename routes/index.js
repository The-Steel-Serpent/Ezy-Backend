const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   logout,
//   userDetails,
//   searchUser,
// } = require("../controllers/UserController");
const {
  getAllCategories,
  getAllCategoriesWithSubCategories,
  getSubCategories,
  getCategoriesName,
  addCategory,
  getCategoriesByShop,
  deleteCategory,
  updateCategory,
  getSubCategoriesByID,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/CategoryController");
const {
  getAllProducts,
  getProductDetailsByID,
  getSuggestProducts,
  getLimitSuggestProducts,
  getProductVarients,
  getAllProductsOfShop,
  getProductBySortAndFilter,
  getSuggestProductsNameBySearch,
  getProductAndShopBySearch,
  getSuggestProductsOfShop,
  getProductBySubCategory,
  addProduct,
  getShopProducts,
  searchShopProducts,
  updateProductStatus,
  getProductByID,
  resetProductStock,
} = require("../controllers/ProductController");
const { getProductReview } = require("../controllers/ProductReviewController");
const {
  getAllUser,
  sellerRegister,
  checkEmailExists,
  buyerRegister,
  checkUser,
  checkUsernameExists,
  getUserData,
  logOut,
  findUserByEmailOrUsername,
  updateSetupStatus,
  updateProfile,
  registerOTP,
  checkOTP,
  updateEmail,
  addAddress,
  updateAddress,
  setDefaultAddress,
  removeAddress,
  getAddresses,
  getDefaultAddress,
  getUserDataByUserId,
} = require("../controllers/UserController");
const { 
  getAllRole,
  addRole,
  deleteRole,
} = require("../controllers/RoleController");
const {
  getAllBusinessStyle,
} = require("../controllers/BusinessStyleController");
const {
  getShops,
  getShopDetail,
  createShop,
  getShopByUserID,
  updateShopProfile,
} = require("../controllers/ShopController");
const {
  getProductClassifyByProductID,
  getAllProductClassify,
  addProductClassify,
  getClassifyIDsByProductID,
  updateProductClassify,
  deleteProductClassify,
  deleteSomeProductClassify,
  updateClassifyTypeName,
} = require("../controllers/ProductClassifyController");
const { addProductImage } = require("../controllers/ProductImgsController");
const {
  addProductVarients,
  findProductVarients,
  deleteProductVarients,
  deleteAllProductVarients,
  deleteSomeProductVarients,
  deleteProductVarientsByClassify,
} = require("../controllers/ProductVarientsController");
const {
  addProductSize,
  getSizeOfProduct,
} = require("../controllers/ProductSizeController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  addOrUpdateCart,
  addToCart,
  getLimitCartItems,
  getCart,
  updateVarients,
  updateQuantity,
  updateSelectedAll,
  updateAllItemsOfShop,
  updateSelectedItem,
  removeAllItems,
  removeItem,
} = require("../controllers/CartController");
const {
  getVoucherList,
  getAllVouchers,
  addVoucher,
  getAllDiscountVoucherType,
} = require("../controllers/DiscountVoucherController");

const {
  checkoutWithCOD,
  checkoutWithMomo,
  checkoutWithVNPay,
  checkoutWithEzyWallet,
  vnPayIPN,
} = require("../controllers/PaymentController");

const {
  getAllSaleEvents,
  addSaleEvent,
  deleteSaleEvent,
  addCategoriesToEvent,
  getAllCategoryIdsForEvent,
} = require("../controllers/SaleEventController");
const { ro } = require("translate-google/languages");
const { getOrderStatus } = require("../controllers/OrderStatusController");
const {
  getWallet,
  getWalletHistory,
  depositToWallet,
  ipnHandler,
} = require("../controllers/WalletController");

//------------------Categories-----------------------
router.get("/categories", getAllCategories);
router.get("/categories_name/:category_id", getCategoriesName);
router.get("/categories-sub", getAllCategoriesWithSubCategories);
router.get("/sub-categories/:category_id", getSubCategories);
router.post("/add-category", addCategory);
router.get("/shop-categories", getCategoriesByShop);
router.delete("/delete-category/:category_id", deleteCategory);
router.put("/update-category/:category_id", updateCategory);
router.get("/get-sub-categories/:sub_category_id", getSubCategoriesByID);
router.post("/add-sub-category/:category_id", addSubCategory);
router.put("/update-sub-category/:sub_category_id", updateSubCategory);
router.delete("/delete-sub-category/:sub_category_id", deleteSubCategory);

//------------------Shop--------------------------------
router.get("/shop-products", getAllProductsOfShop);
router.get("/search-shop", getShops);
router.get("/shop/:shop_username", getShopDetail);
router.get("/shop_recommendations/:shop_id", getSuggestProductsOfShop);
router.post("/create-shop", createShop);
router.get("/get-shop", authenticate, getShopByUserID);
router.get("/shop-products-status", getShopProducts);
router.post("/update-shop-profile", updateShopProfile);
router.get("/get-product", getProductByID);

//------------------Products-----------------------
router.get("/products", getAllProducts);
router.get("/product-details/:id", getProductDetailsByID);
router.get("/product-varients", getProductVarients);
router.get("/product-by-sort-and-filter/:cat_id", getProductBySortAndFilter);
router.get(
  "/product-by-sub-category/:sub_category_id",
  getProductBySubCategory
);
router.get("/suggest-products-name", getSuggestProductsNameBySearch);
router.get("/search", getProductAndShopBySearch);
router.get("/search-shop-products", searchShopProducts);

router.post("/add-product", addProduct);
router.post("/update-product-status", updateProductStatus);
router.post("/reset-product-stock", resetProductStock);

//-----------------ProductClassify-------------------
router.get("/classify-products", getProductClassifyByProductID);
router.get("/all-classifies", getAllProductClassify);
router.get("/get-classifies-id", getClassifyIDsByProductID);
router.post("/add-product-classify", addProductClassify);
router.post("/update-product-classify", updateProductClassify);
router.post("/delete-product-classify", deleteProductClassify);
router.post("/delete-some-product-classify", deleteSomeProductClassify);
router.post("/update-classify-type-name", updateClassifyTypeName);

//-----------------ProductVarient-------------------
router.get("/find-product-varient", findProductVarients);
router.post("/add-product-varient", addProductVarients);
router.post("/delete-product-varient", deleteProductVarients);
router.post("/delete-some-product-varients", deleteSomeProductVarients);
router.post("/delete-all-product-varients", deleteAllProductVarients);
router.post("/delete-product-varients-by-classify", deleteProductVarientsByClassify);

//-----------------ProductImage-------------------
router.post("/add-product-image", addProductImage);
//-----------------ProductSize-------------------
router.post("/add-product-size", addProductSize);
router.get("/get-product-size", getSizeOfProduct);
//-----------------ProductsReview-------------------
router.get("/product-reviews/:product_id", getProductReview);

//-----------------Suggest Products-----------------
router.get("/suggest-products-limit", getLimitSuggestProducts);
router.get("/suggest-products", getSuggestProducts);
//-----------------UserAccount-----------------
router.get("/all-user", getAllUser);
router.get("/get-user-by-id", getUserDataByUserId);
router.get("/check-email", checkEmailExists);
router.get("/check-username", checkUsernameExists);
router.post("/seller-register", sellerRegister);
router.post("/buyer-register", buyerRegister);
router.get("/check-user", checkUser);
router.post("/find-user-email-or-username", findUserByEmailOrUsername);
router.post("/update-profile", updateProfile);
router.post("/update-email", updateEmail);
router.post("/register-otp", registerOTP);
router.post("/check-otp", checkOTP);
router.post("/fetch_user_data", authenticate, getUserData);
router.post("/logout", authenticate, logOut);
router.post("/update-setup-status", authenticate, updateSetupStatus);
//-----------------Address-----------------
router.get("/address/get-address", getAddresses);
router.post("/address/add-address", addAddress);
router.post("/address/update-address", updateAddress);
router.post("/address/set-default-address", setDefaultAddress);
router.post("/address/remove-address", removeAddress);
router.get("/address/get-default-address", getDefaultAddress);
//-----------------Role-----------------
router.get("/all-role", getAllRole);
router.post("/add-role", addRole);
router.delete("/delete-role/:id", deleteRole);

//-----------------BusinessStyle-----------------
router.get("/all-business-styles", getAllBusinessStyle);

//-----------------Cart-----------------
router.get("/cart/add_to_cart", addToCart);
router.get("/cart/limit-items", getLimitCartItems);
router.get("/cart/get-cart", getCart);
router.post("/cart/update-varients", updateVarients);
router.post("/cart/update-quantity", updateQuantity);
router.post("/cart/update-selected-all", updateSelectedAll);
router.post("/cart/update-all-items-of-shop", updateAllItemsOfShop);
router.post("/cart/update-selected-item", updateSelectedItem);
router.post("/cart/destroy-cart", removeAllItems);
router.post("/cart/remove-item", removeItem);

//-----------------DiscountVoucher-----------------
router.post("/voucher/voucher-list", getVoucherList);
router.get("/voucher/get-all-voucher", getAllVouchers);
router.post("/voucher/add-voucher", addVoucher);
router.get("/voucher/types", getAllDiscountVoucherType);

//-----------------Checkout-----------------
router.post("/checkout/cod", checkoutWithCOD);
router.post("/checkout/momo", checkoutWithMomo);
router.post("/checkout/vnpay", checkoutWithVNPay);
router.post("/checkout/ezywallet", checkoutWithEzyWallet);
router.get("/vnpay-ipn", vnPayIPN);
//-----------------SaleEvent-----------------
router.get("/sale-events/get-event", getAllSaleEvents);
router.post("/sale-events/add-event", addSaleEvent);
router.delete("/sale-events/delete-event/:id", deleteSaleEvent);
router.post("/sale-events/set-categories/:id", addCategoriesToEvent);
router.get("/sale-events/get-categories/:id", getAllCategoryIdsForEvent);

//-----------------Wallet-----------------
router.post("/wallet/get-wallet", authenticate, getWallet);
router.post("/wallet/get-wallet-history", getWalletHistory);
router.post("/wallet/deposit", depositToWallet);
router.post("/wallet/wallet-ipn", ipnHandler);
//-----------------Order-----------------
router.get("/order/order-status", getOrderStatus);
module.exports = router;

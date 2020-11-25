import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import userReducer from "./user_reducer";
import companyReducer from "./company_reducer";
import customerReducer from "./customer_reducer";
import licenseReducer from "./license_reducer";
import PaymentListReducer from "./paymentlist_reducer";
import paymentaddReducer from "./payment_reducer_add";
import districtReducer from "./district_reducer";
import goodsclassReducer from "./goodsClass_reducer";
import licenseAddReducer from "./license_add_reducer";
import checkregnumReducer from "./checkregnum_reducer";
import storeReducer from "./Customer_infoReducer";
import customeraddReducer from "./customer_reducer_add";
import emailReducer from "./email_reducer";
import saleReducer from "./sale_reducer";
import todayStatusReducer from "./todayStatus_reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import feedbackReducer from "./feedback_reducer";
import customerStatusReducer from "./customerStatus_reducer";
import paymentDashboardReducer from "./paymentDashboard_reducer";
import licenseStatusReducer from "./licenseStatus_reducer";
import sellerCalculationReducer from "./sellerCalculation_reducer";
import desktopReducer from "./desktop_reducer";
import OnisUser_reducer from "./OnisUser_reducer";
import OnisUpdate_reducer from "./OnisUpdate_reducer";
import UpdateEdit_reducer from "./UpdateEdit_reducer";
import UpdatePopUp_reducer from "./UpdatePopUp_reducer";
import shopReducer from "./shop_reducer";
import Banner_reducer from "./Banner_reducer";
import UmoneyReducer from "./OnisShop/UmoneyReducer";
import ShopUpointReducer from "./OnisShop/ShopUpointReducer";
import UserPosApiReducer from "./OnisShop/UserPosApiReducer";
import UserListReducer from "./OnisShop/UserListReducer";
import ShopBannerReducer from "./OnisShop/ShopBannerReducer";
import ShopUpdateReducer from "./OnisShop/ShopUpdateReducer";
import MerchantReducer from "./OnisShop/MerchantReducer";
import FeedbackReducer from "./OnisShop/FeedbackReducer";
import LicenseReducer from "./OnisShop/LicenseReducer";
import QpayReducer from "./OnisShop/QpayReducer";
import MobicomReducer from "./OnisShop/MobicomReducer";

const rootReducer = combineReducers({
  paymentaddreducer: paymentaddReducer,
  paymentlist: PaymentListReducer,
  store: storeReducer,
  company: companyReducer,
  licenseAdd: licenseAddReducer,
  customer: customerReducer,
  checkregnum: checkregnumReducer,
  custaddreducer: customeraddReducer,
  license: licenseReducer,
  email: emailReducer,
  district: districtReducer,
  goodsclass: goodsclassReducer,
  user: userReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer,
  form: formReducer,
  routing: routerReducer,
  saleList: saleReducer,
  dashboard: todayStatusReducer,
  feedback: feedbackReducer,
  customerstatus: customerStatusReducer,
  paymentDashboard: paymentDashboardReducer,
  licenseStatus: licenseStatusReducer,
  sellerCalculation: sellerCalculationReducer,
  desktop: desktopReducer,
  OnisShop: OnisUser_reducer,
  onisupdate: OnisUpdate_reducer,
  updateedit: UpdateEdit_reducer,
  updatepopup: UpdatePopUp_reducer,
  shop: shopReducer,
  bannerList: Banner_reducer,
  umoneySettings: UmoneyReducer,
  userPosApi: UserPosApiReducer,
  shopUserList: UserListReducer,
  shopBannerList: ShopBannerReducer,
  shopUpdateList: ShopUpdateReducer,
  shopUpointReducer: ShopUpointReducer,
  merchantReducer: MerchantReducer,
  feedbackReducer: FeedbackReducer,
  shopLicense: LicenseReducer,
  shopQpay: QpayReducer,
  shopMobicom: MobicomReducer
});

export default rootReducer;

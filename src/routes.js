import React from "react";
import { Router, Route, IndexRedirect, browserHistory } from "react-router";

// Layouts
import Full from "./layouts/Full/";

// Pages
import LoginPage from "./containers/LoginPage";
import NotFoundPage from "./containers/NotFoundPage";

//User Pages
import feedbacklist from "./containers/Feedback/feedbackList";
import Customerlist from "./containers/Customerlist/Customerlist";
import License from "./containers/License/License";
import Inventory from "./containers/Inventory/Inventory";
import paymentList from "./containers/License/paymentList";
import SaleList from "./containers/Sale/SaleList";
import SellerCalculation from "./containers/Seller/SellerCalculation";
import LicenseReport from "./containers/LicenseReport/LicenseReport";
import CustomerAddList from "./containers/Customerlist/CustomerAddList";
import CustomerEditList from "./containers/Customerlist/CustomerEditList";
import LicenseAdd from "./containers/License/LicenseAdd";
import Blank from "./containers/Blank/Blank";
import TransacAdd from "./containers/Transaction/TransacAdd";
import TransacEdit from "./containers/Transaction/TransacEdit";
import UserLicense from "./containers/License/UserLicense";
import Dashboard from "./containers/Dashboard/Dashboard";
import LicenseStatus from "./containers/License/LicenseStatus";
import customerDashboard from "./containers/customerDashboard/customerDashboard";
import paymentDashboard from "./containers/paymentDashboard/paymentDashboard";
import desktopUser from "./containers/OnisDesktop/desktopUser";
import desktopBranch from "./containers/OnisDesktop/desktopBranch";
import desktopPayment from "./containers/OnisDesktop/desktopPayment";
import desktopcustomeradd from "./containers/OnisDesktop/AddWindow/addUser";
import desktopbranchadd from "./containers/OnisDesktop/AddWindow/addBranch";
import paymentadd from "./containers/OnisDesktop/AddWindow/addPayment";
import desktopcustomeredit from "./containers/OnisDesktop/editWindow/desktopcustomeredit";
import desktopbranchedit from "./containers/OnisDesktop/editWindow/desktopbranchedit";
import desktoppaymentedit from "./containers/OnisDesktop/editWindow/desktoppaymentedit";
// import onisuserlist from "./containers/OnisShop/OnisShop_UserList";
import updatelist from "./containers/OnisShop/UpdateList";
import updateeditlist from "./containers/OnisShop/UpdateEditList";
import UmoneyConnectList from "./containers/OnisShop/Umoney/UmoneyConnect";
import UpointConnectList from "./containers/OnisShop/Upoint/UpointConnect";
import LendConnectList from "./containers/OnisShop/Lend/LendList";
import UserPosApiConnectList from "./containers/OnisShop/UserPosApi/PosApiConnect";
import ShopUserList from "./containers/OnisShop/UserList/UserList";
import ShopBannerList from "./containers/OnisShop/Banner/BannerList";
import ShopUpdateList from "./containers/OnisShop/Update/UpdateList";
import MerchantList from "./containers/OnisShop/Merchant/MerchantList";
import FeedbackList from "./containers/OnisShop/Feedback/FeedbackList";
import MasterList from "./containers/OnisShop/Master/MasterList";
import LicenseList from "./containers/OnisShop/ShopLicense/LicenseList";
import SmsReport from "./containers/License/SmsReport";
import DillerSaleList from "./containers/OnisShop/Mobicom/DillerSaleList/List";
import DillerSaleListGMobile from "./containers/OnisShop/Gmobile/GmobileDillerSaleList/List";
import DillerChargeListGmobile from "./containers/OnisShop/Gmobile/GmobileDillerCharge/List";
import DillerListGmobile from "./containers/OnisShop/Gmobile/GmobileDillerList/List";
import DillerChargeList from "./containers/OnisShop/Mobicom/DillerCharge/List";
import DillerList from "./containers/OnisShop/Mobicom/DillerList/List";
import QpayConnect from "./containers/OnisShop/Qpay/QpayConnect";
import ShopPaymentList from "./containers/OnisShop/ShopPaymentList/List";
import NonVatProducts from "./containers/OnisShop/NonVatProduct";
import ShopMerchantReport from "./containers/OnisShop/Report/MerchantReport/List";
import ShopUserReport from "./containers/OnisShop/Report/UserReport/List";
import MapReport from "./containers/OnisShop/MapReport";
// Components
import { requireAuth, hideLogin } from "./utils/authHOC";

export default (
  <Router history={browserHistory}>
    <Route path="/" name="Home" component={requireAuth(Full)}>
      <IndexRedirect to="UserPosApi" />
      <Route
        path="UserPosApi"
        name="UserPosApi"
        component={UserPosApiConnectList}
      />
      <IndexRedirect to="customerlist" />
      <Route path="customerlist" name="Customerlist" component={Customerlist} />
      <IndexRedirect to="license" />
      <Route path="license" name="License" component={License} />
      <IndexRedirect to="inventory" />
      <Route path="inventory" name="Inventory" component={Inventory} />
      <IndexRedirect to="smsReport" />
      <Route path="smsReport" name="SmsReport" component={SmsReport} />
      <IndexRedirect to="ShopBannerList" />
      <Route
        path="ShopBannerList"
        name="ShopBannerList"
        component={ShopBannerList}
      />
      <IndexRedirect to="merchantList" />
      <Route path="merchantList" name="merchantList" component={MerchantList} />
      <IndexRedirect to="feedbackList" />
      <Route path="feedbackList" name="feedbackList" component={FeedbackList} />
      <IndexRedirect to="ShopUpdateList" />
      <Route
        path="ShopUpdateList"
        name="ShopUpdateList"
        component={ShopUpdateList}
      />
      <IndexRedirect to="paymentlist" />
      <Route path="paymentlist" name="paymentList" component={paymentList} />
      <IndexRedirect to="saleList" />
      <Route path="saleList" name="SaleList" component={SaleList} />
      <IndexRedirect to="updateeditlist" />
      <Route
        path="updateeditlist"
        name="updateeditlist"
        component={updateeditlist}
      />
      <IndexRedirect to="sellerCalculation" />
      <Route
        path="sellerCalculation"
        name="SellerCalculation"
        component={SellerCalculation}
      />
      <IndexRedirect to="licenseReport" />
      <Route
        path="licenseReport"
        name="LicenseReport"
        component={LicenseReport}
      />
      <IndexRedirect to="customeraddlist" />
      <Route
        path="customeraddlist"
        name="CustomerAddList"
        component={CustomerAddList}
      />
      <IndexRedirect to="customereditlist" />
      <Route
        path="customereditlist"
        name="CustomerEditList"
        component={CustomerEditList}
      />
      <IndexRedirect to="licenseadd" />
      <Route path="licenseadd" name="LicenseAdd" component={LicenseAdd} />
      <IndexRedirect to="transacadd" />
      <Route path="transacadd" name="TransacAdd" component={TransacAdd} />
      <IndexRedirect to="transacedit" />
      <Route path="transacedit" name="TransacEdit" component={TransacEdit} />
      <IndexRedirect to="feedbacklist" />
      <Route path="feedbacklist" name="feedbacklist" component={feedbacklist} />
      <IndexRedirect to="licenselist" />
      <Route path="licenselist" name="UserLicense" component={UserLicense} />
      <IndexRedirect to="customerDashboard" />
      <Route
        path="customerDashboard"
        name="customerDashboard"
        component={customerDashboard}
      />
      <IndexRedirect to="paymentDashboard" />
      <Route
        path="paymentDashboard"
        name="paymentDashboard"
        component={paymentDashboard}
      />
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" name="Dashboard" component={Dashboard} />
      <IndexRedirect to="ShopUserList" />
      <Route path="ShopUserList" name="ShopUserList" component={ShopUserList} />
      <IndexRedirect to="updatelist" />
      <Route path="updatelist" name="updatelist" component={updatelist} />
      <IndexRedirect to="licensestatus" />
      <Route
        path="licensestatus"
        name="licenseStatus"
        component={LicenseStatus}
      />
      <IndexRedirect to="desktopUser" />
      <Route path="desktopUser" name="desktopUser" component={desktopUser} />
      <IndexRedirect to="desktopBranch" />
      <Route
        path="desktopBranch"
        name="desktopBranch"
        component={desktopBranch}
      />
      <IndexRedirect to="desktopPayment" />
      <Route
        path="desktopPayment"
        name="desktopPayment"
        component={desktopPayment}
      />
      <IndexRedirect to="desktopcustomeradd" />
      <Route
        path="desktopcustomeradd"
        name="desktopcustomeradd"
        component={desktopcustomeradd}
      />
      <IndexRedirect to="desktopbranchadd" />
      <Route
        path="desktopbranchadd"
        name="desktopbranchadd"
        component={desktopbranchadd}
      />
      <IndexRedirect to="paymentadd" />
      <Route path="paymentadd" name="paymentadd" component={paymentadd} />
      <IndexRedirect to="desktopcustomeredit" />
      <Route
        path="desktopcustomeredit"
        name="desktopcustomeredit"
        component={desktopcustomeredit}
      />
      <IndexRedirect to="desktopbranchedit" />
      <Route
        path="desktopbranchedit"
        name="desktopbranchedit"
        component={desktopbranchedit}
      />
      <IndexRedirect to="desktoppaymentedit" />
      <Route
        path="desktoppaymentedit"
        name="desktoppaymentedit"
        component={desktoppaymentedit}
      />
      <IndexRedirect to="umoneyConnectList" />
      <Route
        path="umoneyConnectList"
        name="umoneyConnectList"
        component={UmoneyConnectList}
      />
      <IndexRedirect to="upointConnectList" />
      <Route
        path="upointConnectList"
        name="upointConnectList"
        component={UpointConnectList}
      />
      <IndexRedirect to="lendConnectionList" />
      <Route
        path="lendConnectionList"
        name="lendConnectionList"
        component={LendConnectList}
      />
      <IndexRedirect to="shopMasterList" />
      <Route
        path="shopMasterList"
        name="shopMasterList"
        component={MasterList}
      />
      <IndexRedirect to="shopPaymentList" />
      <Route
        path="shopPaymentList"
        name="shopPaymentList"
        component={ShopPaymentList}
      />
      <IndexRedirect to="nonVatProducts" />
      <Route
        path="nonVatProducts"
        name="nonVatProducts"
        component={NonVatProducts}
      />
      <IndexRedirect to="qpayList" />
      <Route path="qpayList" name="qpayList" component={QpayConnect} />
      <IndexRedirect to="shopLicense" />
      <Route path="shopLicense" name="shopLicense" component={LicenseList} />
      <IndexRedirect to="mobicomDillerSaleList" />
      <Route
        path="mobicomDillerSaleList"
        name="mobicomDillerSaleList"
        component={DillerSaleList}
      />
      <IndexRedirect to="mobicomDillerCharge" />
      <Route
        path="mobicomDillerCharge"
        name="mobicomDillerCharge"
        component={DillerChargeList}
      />
      <IndexRedirect to="mobicomDillerList" />
      <Route
        path="mobicomDillerList"
        name="mobicomDillerList"
        component={DillerList}
      />
      <IndexRedirect to="gmobileDillerSaleList" />
      <Route
        path="gmobileDillerSaleList"
        name="gmobileDillerSaleList"
        component={DillerSaleListGMobile}
      />
      <IndexRedirect to="gmobileDillerCharge" />
      <Route
        path="gmobileDillerCharge"
        name="gmobileDillerCharge"
        component={DillerChargeListGmobile}
      />
      <IndexRedirect to="gmobileDillerList" />
      <Route
        path="gmobileDillerList"
        name="gmobileDillerList"
        component={DillerListGmobile}
      />
      <IndexRedirect to="shopUserReport" />
      <Route
        path="shopUserReport"
        name="shopUserReport"
        component={ShopUserReport}
      />
      <IndexRedirect to="shopMerchantReport" />
      <Route
        path="shopMerchantReport"
        name="shopMerchantReport"
        component={ShopMerchantReport}
      />
      <IndexRedirect to="mapReport" />
      <Route path="mapReport" name="mapReport" component={MapReport} />

      <IndexRedirect to="blank" />
      <Route path="blank" name="Blank" component={Blank} />
    </Route>

    <Route path="/login" name="Нэвтрэх" component={hideLogin(LoginPage)} />
    {/*<Route path='/invoice' name='test' component={Invoice} />*/}
    <Route path="*" component={NotFoundPage} />
  </Router>
);

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
import Banner from "./containers/Banner/Banner";
// import userPosApi from "./containers/UserPosApi/userPosApi";
// import BannerPopup from "./container/Banner/BanerPopUp";
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
// import userApi from "./containers/UserPosApi/userPosApi";
// import userApiPopUp from "./containers/UserPosApi/posApiPopUp";
// import Invoice from './containers/Blank/Invoice';

// Components
import { requireAuth, hideLogin } from "./utils/authHOC";

export default (
  <Router history={browserHistory}>
    <Route path="/" name="Home" component={requireAuth(Full)}>
      {/* <IndexRedirect to="userApi" />
      <Route path="userApi" name="userApi" component={userApi} />

      <IndexRedirect to="userApiPopUp" />
      <Route path="userApiPopUp" name="userApiPopUp" component={userApiPopUp} /> */}

      <IndexRedirect to="customerlist" />
      <Route path="customerlist" name="Customerlist" component={Customerlist} />

      <IndexRedirect to="license" />
      <Route path="license" name="License" component={License} />

      <IndexRedirect to="inventory" />
      <Route path="inventory" name="Inventory" component={Inventory} />

      
      <IndexRedirect to="Banner" />
      <Route path="Banner" name="Banner" component={Banner} />
      
      <IndexRedirect to="paymentlist" />
      <Route path="paymentlist" name="paymentList" component={paymentList} />
    

      <IndexRedirect to="saleList" />
      <Route path="saleList" name="SaleList" component={SaleList} />

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

      <IndexRedirect to="blank" />
      <Route path="blank" name="Blank" component={Blank} />
    </Route>

    <Route path="/login" name="Нэвтрэх" component={hideLogin(LoginPage)} />
    {/*<Route path='/invoice' name='test' component={Invoice} />*/}
    <Route path="*" component={NotFoundPage} />
  </Router>
);
import React from "react";

export const MenuData = [
  {
    name: "Оньс Mobile",
    subMenus: [
      {
        name: "Хэрэглэгчийн жагсаалт",
        icon: "icon-user",
        route: "customerlist",
      },
      {
        name: "Төлбөрийн гүйлгээ",
        icon: "icon-list",
        route: "paymentlist",
      },
      {
        name: "Лицензийн жагсаалт",
        icon: "icon-clock",
        route: "license",
      },
      {
        name: "Хэрэглэгчийн лиценз",
        icon: "fa fa-clock-o",
        route: "licenselist",
      },
      {
        name: "Мессеж тайлан",
        icon: "icon-clock",
        route: "smsReport",
      },
      {
        name: "Борлуулагчийн тооцоо",
        icon: "icon-clock",
        route: "sellerCalculation",
      },
      {
        name: "Лицензийн тайлан",
        icon: "icon-clock",
        route: "licenseReport",
        hidden: true,
      },
      {
        name: "Борлуулалт",
        icon: "icon-graph",
        route: "salelist",
      },
      {
        name: "Санал хүсэлт",
        icon: "fa fa-bullhorn",
        route: "feedbacklist",
      },
    ],
  },
  {
    name: "Тайлан",
    subMenus: [
      {
        name: "Хянах самбар",
        icon: "fa fa-line-chart",
        route: "dashboard",
      },
      {
        name: "Хэрэглэгч",
        route: "customerDashboard",
        icon: "fa fa-user",
      },
      {
        name: "Төлбөр төлөлт",
        icon: "fa fa-credit-card-alt",
        route: "paymentDashboard",
      },
      {
        name: "Лиценз сунгалт",
        icon: "fa fa-credit-card-alt",
        route: "licenseStatus",
      },
    ],
  },
  {
    name: "Оньс десктоп систем",
    subMenus: [
      {
        name: "Хэрэглэгч",
        icon: "fa fa-user",
        route: "desktopUser",
      },
      {
        name: "Төлбөр",
        icon: "fa fa-credit-card",
        route: "desktopPayment",
      },
    ],
  },
  {
    name: "Оньс шоп систем",
    subMenus: [
      {
        name: "Төлбөрийн гүйлгээ",
        route: "shopPaymentList",
      },
      {
        name: "НӨАТ - с чөлөөлөх",
        route: "nonVatProducts",
      },
      {
        name: "Хэрэглэгчийн жагсаалт",
        route: "ShopUserList",
      },
      {
        name: "Хэрэглэгчийн PosAPI",
        route: "userPosApi",
      },
      {
        name: "Баннер",
        route: "ShopBannerList",
      },
      {
        name: "Програмын шинэчлэл",
        route: "ShopUpdateList",
      },
      {
        name: "Umoney холболт",
        route: "umoneyConnectList",
      },
      {
        name: "Upoint холболт",
        route: "upointConnectList",
      },
      {
        name: "SuperUp/Lend холболт",
        route: "lendConnectionList",
      },
      {
        name: "Merchant холболт",
        route: "merchantList",
      },
      {
        name: "Санал хүсэлт",
        route: "feedbackList",
      },
      {
        name: "Шоп үнэ бүртгэл",
        route: "shopMasterList",
      },
      {
        name: "Шоп Лиценз",
        route: "shopLicense",
      },
      {
        name: "Qpay холболт",
        route: "qpayList",
      },
    ],
  },
  {
    name: "Оньс шоп Мобиком",
    subMenus: [
      {
        name: "Моби диллерийн жагсаалт",
        route: "mobicomDillerList",
      },
      {
        name: "Диллерийн борлуулалт",
        route: "mobicomDillerSaleList",
      },
      {
        name: "Диллерийн цэнэглэлт",
        route: "mobicomDillerCharge",
      },
    ],
  },
  {
    name: "Оньс шоп ЖиМобайл",
    subMenus: [
      {
        name: "ЖиМобайл диллерийн жагсаалт",
        route: "gmobileDillerList",
      },
      {
        name: "Диллерийн борлуулалт",
        route: "gmobileDillerSaleList",
      },
      {
        name: "Диллерийн цэнэглэлт",
        route: "gmobileDillerCharge",
      },
    ],
  },
  {
    name: "Оньс Шоп Тайлан",
    subMenus: [
      {
        name: "Тайлан хэрэглэгчээр",
        route: "shopUserReport",
      },
      {
        name: "Тайлан мерчантаар",
        route: "shopMerchantReport",
      },
      {
        name: "Газрын зураг",
        route: "mapReport",
      },
    ],
  },
];

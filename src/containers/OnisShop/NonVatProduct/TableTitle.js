export const NonVatProductsTableTitle = [
    {
      data: 'barcode',
      label: 'Барааны код',
      format: 'custom',
      props: {
        width: '60px',
        dataSort: true,
        dataAlign: "left"
      }
    },
    {
      data: 'name',
      label: 'Барааны нэр',
      format: 'custom',
      props: {
        width: '85px',
        dataSort: true,
        dataAlign: "left"
      }
    },
    {
      data: 'vat',
      label: 'НӨАТ',
      format: 'yesno',
      props: {
        width: '30px',
        dataSort: true
      }
    },
    {
      data: 'startymd',
      label: 'Эхлэх хугацаа',
      format: 'datetime',
      props: {
        width: '60px',
        dataSort: true
      }
    },
    {
      data: 'endymd',
      label: 'Дуусах хугацаа',
      format: 'datetime',
      props: {
        width: '65px',
        dataSort: true
      }
    },
    {
        data: 'status',
        label: 'Төлөв',
        format: 'ISAPPROVED',
        props: {
          width: '65px',
          dataSort: true,
        }
      },
      {
        data: 'regno',
        label: 'Дэлгүүр',
        format: 'custom',
        props: {
          width: '65px',
          dataSort: true
        }
      },
      {
        data: 'insymd',
        label: 'Бүртгэсэн огноо',
        format: 'datetime',
        props: {
          width: '65px',
          dataSort: true
        }
      },
      {
        data: 'insbyname',
        label: 'Бүртгэсэн',
        format: 'custom',
        props: {
          width: '65px',
          dataSort: true
        }
      }
  ]
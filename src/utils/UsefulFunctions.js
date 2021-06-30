class UsefulFunctions {
    static generateFooterItems(index, label, data) {
        let tmp = {
          label: "0",
          columnIndex: index,
          align: "right",
          formatter: data => {
            let sum = 0;
            data.map((item, i) => {
              if (item[label] !== undefined && item[label] !== NaN) {
                sum += item[label];
              }
            });
            return (
              <strong>
                {sum === 0 ? "-" : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </strong>
            );
          }
        }
        return tmp;
      }

}
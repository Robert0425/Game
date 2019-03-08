import IOrder from "./IOrder";
import Qs from 'qs';

export default class OrderService{
    axios:any;
    Qs:any;
    constructor(axio:any){
        this.axios = axio
    }
    sendOder(order:IOrder){
        this.axios
        .post(
          'http://lt.vir999.net/pt/mem/ajax/shoppingcart/order.json',
          Qs.stringify(order),
        )
        .then((response:any) => {
            alert('投注成功');
          })
          .catch((response:any) => {
            alert('投注失敗');
          });
    }
}



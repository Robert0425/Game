<template>
  <div>
    <button
      v-for="(item, index) in title"
      :key="index"
      :class="checkbox.includes(item.keyName) ? 'active' : '' "
      @click="check(item.keyName);"
    >
        {{ item.name }}
        <span class="gameArea-item-rate">{{ item.odds}}</span>
    </button>
    <br>
    <br>每注：
    <input v-model.number="money" type="number" class="inp-orders">
    投注數：
    <span class="orders-amounts">{{couunt}}</span>

    <button class="btn-addOrders" @click="sendOrder">投注</button>
  </div>
</template>

<script>
import Qs from 'qs';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
export default {
  data() {
    return {
      money: 0,
      number: '',
      couunt: 0,
      checkbox: [],
      oddss: '',
      title: [
        { name: '高', keyName: 'ALL:SUM:HIGH', odds: 1.97 },
        { name: '低', keyName: 'ALL:SUM:LOW', odds: 1.97 },
        { name: '單', keyName: 'ALL:SUM:ODD', odds: 1.97 },
        { name: '雙', keyName: 'ALL:SUM:EVEN', odds: 1.97 },
        { name: '1', keyName: 'ALL:SUM:LAST:1', odds: 9.8 },
        { name: '2', keyName: 'ALL:SUM:LAST:2', odds: 9.8 },
        { name: '3', keyName: 'ALL:SUM:LAST:3', odds: 9.8 },
        { name: '4', keyName: 'ALL:SUM:LAST:4', odds: 9.8 },
        { name: '5', keyName: 'ALL:SUM:LAST:5', odds: 9.8 },
        { name: '6', keyName: 'ALL:SUM:LAST:6', odds: 9.8 },
        { name: '7', keyName: 'ALL:SUM:LAST:7', odds: 9.8 },
        { name: '8', keyName: 'ALL:SUM:LAST:8', odds: 9.8 },
        { name: '9', keyName: 'ALL:SUM:LAST:9', odds: 9.8 },
        { name: '0', keyName: 'ALL:SUM:LAST:0', odds: 9.8 },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 賠率
      this.axios
        .get(
          'http://lt.vir999.net/pt/provider/mem/source/filter.json?game_type=BBHL&data=%5B%22odds%22%2C%22disable_odds%22%5D&timestamp=1548984112279',
        )
        .then((response) => {
          this.oddss = response.data.ret.odds;
        });
      // 當前期號
      this.axios
        .get(
          'http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1548646023971',
        )
        .then((response) => {
          this.number = response.data.game.info.BBHL.current.num;
        });
    },
    sendOrder() {
      const order = this.generateOrder();
      this.axios
        .post(
          'http://lt.vir999.net/pt/mem/ajax/shoppingcart/order.json',
          Qs.stringify(order),
          config,
        )
        .then((response) => {
          alert('投注成功');
        })
        .catch((error) => {
          alert('投注失敗');
        });
    },
    generateOrder() {
      const tempOrder = [];
      this.checkbox.forEach((item) => {
        tempOrder.push({
          choose: item,
          odds: { [item]: this.oddss[item] },
          tag: 'main-page',
          gold: this.money,
          bets: 1,
        });
      });
      return {
        game: 'BBHL',
        game_num: this.number,
        entrance: 7,
        platform: 0,
        portal: 0,
        client: 0,
        orders: JSON.stringify([tempOrder]),
      };
    },
    check(i) {
      const idx = this.checkbox.indexOf(i);
      console.log(this.checkbox.indexOf(i));
      if (idx > -1) {
        this.checkbox.splice(idx, 1);
      } else {
        this.checkbox.push(i);
      }
      this.couunt = this.checkbox.length;
    },
  },
};
</script>
<style scoped>
button {
  font-size: 14px;
  color: #48586f;
  line-height: 14px;
  width: 82px;
  height: 40px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #d8d8d8;
  margin: 2px 4px 2px 0;
  padding: 4px 8px 26px;
  position: relative;
  text-align: left;
  vertical-align: middle;
  word-wrap: break-word;
  cursor: pointer;
}
.active {
  color: #455164;
  background-color: #fff;
  border-color: #e75251;
}
.inp-orders {
  font-size: 14px;
  color: #48586f;
  line-height: 36px;
  font-weight: bolder;
  width: 122px;
  height: 36px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  padding: 0 12px;
  text-align: right;
}
.orders-amounts {
  color: #e75251;
  font-weight: bolder;
  padding: 0 10px;
}
.btn-addOrders {
  font-size: 14px;
  color: #fff;
  line-height: 36px;
  font-weight: bolder;
  width: 136px;
  height: 36px;
  background-color: #08b3b3;
  border-radius: 8px;
  margin-left: 30px;
}
.gameArea-item-rate {
  font-size: 12px;
  color: #e75251;
  line-height: 12px;
  display: block;
  position: absolute;
  right: 8px;
  bottom: 2px;
}
</style>

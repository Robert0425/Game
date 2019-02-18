<template>
    <div>
        <span >{{name}}</span>
        <br>
        <span >No.{{number}} </span>
        <br>
        <span :class="timeclass">{{countDown | time }}</span>
    </div>
</template>

<script>
const check = i => (i < 10 ? `0${i}` : i);
export default {
  data() {
    return {
      serverTime: '',
      name: '',
      number: '',
      closeTime: '',
    };
  },
  filters: {
    time(val) {
      const countDown = Math.floor(val);
      console.log(countDown);
      const hh = Math.floor(countDown / 3600);
      const mm = Math.floor((countDown % 3600) / 60);
      const ss = countDown % 60;
      const h = check(hh);
      const m = check(mm);
      const s = check(ss);
      return `${h}:${m}:${s}`;
    },
  },
  computed: {
    timeclass() {
      if (this.countDown > 10) {
        return 'green';
      }
      if (this.countDown <= 10 && this.countDown >= 1) {
        return 'red';
      }
      return 'gray';
    },
    countDown() {
      const countDown = this.closeTime - this.serverTime;
      return countDown <= 0 ? 0 : countDown;
    },
  },
  methods: {
    start() {
      this.$emit('open');
      this.init();
      this.interval = setInterval(this.setTime, 1000);
    },
    init() {
      // 主機時間
      this.axios
        .get('http://lt.vir999.net/pt/mem/ajax/config/init.json')
        .then((response) => {
          this.serverTime = Math.floor(response.data.server_time);
        });
      // 遊戲名稱
      this.axios
        .get('http://lt.vir999.net/pantheon/bia/locales/zh-tw/game.json')
        .then((response) => { this.name = response.data.game.name.BBHL; });
      this.axios
        .get('http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1548646023971')
        .then((response) => {
        // 期號
          this.number = response.data.game.info.BBHL.current.num;
          // 遊戲關閉時間
          this.closeTime = Math.floor(response.data.game.info.BBHL.current.close_timestamp);
        });
    },
    setTime() {
      this.tickCountDown();
      if (this.countDown <= 0) {
        this.closeGameAndReStar();
      }
    },
    tickCountDown() {
      this.serverTime += 1;
    },
    closeGameAndReStar() {
      clearInterval(this.interval);
      setTimeout(this.start, 10000);
      this.$emit('close');
    },

  },
  mounted() {
    this.start();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scope>
.green{
  color:#32CD32
}
.red{
  color:red
}
.gray{
  color:gray
}
</style>

<template>
  <div>
      <div>
       No.{{resultShow.num}}
      </div>
      <br>
      <div>
         <span >{{resultShow.low}}</span>
          <br>
         <span >{{resultShow.odd}}</span>
          <br>
         <span >{{resultShow.all}}</span>


     </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { get } from 'lodash';

export default {
  mounted() {
    this.$store.dispatch('loadResult');
  },
  computed: {
    ...mapState(['result']),
    resultShow() {
      return {
        num: get(this.result, '0.num', '尚未取得'),
        low: get(this.result, '0.result.low_high', '0'),
        odd: get(this.result, '0.result.odd_even', '0'),
        all: get(this.result, '0.result.all_sum_last', '0'),
      };
    },
  },
};

</script>

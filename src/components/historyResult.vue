<template>
  <div>
    <h4  v-for="(item ,index) in historyResult" :key="index">
     {{ item.num_alias }}
     {{ item.low_high }}
     {{ item.odd_even }}
     {{ item.all_sum_last }}
    </h4>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('loadResult');
  },
  computed: {
    ...mapState(['result']),
    historyResult() {
      const fiveHistoryResult = this.result.slice(1, 6);
      return fiveHistoryResult.map(item => ({
        num_alias: item.num_alias,
        low_high: item.result.low_high,
        odd_even: item.result.odd_even,
        all_sum_last: item.result.all_sum_last,
      }));
    },
  },
};
</script>


<style>
</style>

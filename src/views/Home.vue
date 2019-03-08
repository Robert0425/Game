<template>
<div>
  <div v-show="isOpening">
    <div class="ccle">
      <div>
        <gameTime @close="handelClose" @open="handelOpen"/>
      </div>
      <div>
        <gameResult/>
      </div>
      <div>
        <historyResult/>
      </div>
    </div>
      <br>
      <div class="ccle">
        <orderCompent/>
      </div>
  </div>

  <div v-show="!isOpening">
    關盤中......
  </div>
 </div>
</template>

<script>
import gameTime from '@/components/gameTime.vue';
import historyResult from '@/components/historyResult.vue';
import gameResult from '@/components/gameResult.vue';
import orderCompent from '@/components/orderCompent.vue';
export default {
  components: {
    gameTime,
    historyResult,
    gameResult,
    orderCompent,
  },
  data() {
    return {
      isOpening: true,
    };
  },
  methods: {
    handelClose() {
      this.isOpening = false;
    },
    handelOpen() {
      this.isOpening = true;
    },
  },
};
</script>

<style>
.ccle {
  margin: 0px auto;/*div對齊效果*/
  text-align: center;/*display: inline對齊效果*/
}
.ccle div {
  display: inline-block;/*讓div並排*/
  vertical-align: top;/*就算個個div行數不同，也一律向上對齊*/
  border-radius:3px;margin: 2px;
  }
</style>
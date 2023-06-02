<template>
  <div class="loading" v-show="$store.state.loading">
    <div class="overlay" :style="overlayPosition">
      <div class="message-box">
        <p>計算中...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlayPosition: {
        top: "0"
      }
    };
  },
  watch: {
    "$store.state.loading": function(newVal) {
      if (newVal) {
        this.overlayPosition.top = window.pageYOffset + "px";
      }
    }
  }
};
</script>

<style>
.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  /* 画面いっぱいに広げる */
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  /* 子要素を上下左右に中央寄せ */
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-box {
  color: #fff;
  animation-name: blink;
  animation-duration: 600ms;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<template>
  <ul class="picList">
    <li v-for="index in picTotal" :key="index" :style="pictureList(index)"></li>
  </ul>
</template>

<script>
import { ref } from "vue";

const animationDuration = 10;

export default {
  props: intPicCount,
  data() {
    return {
      scroll: ref(false),
      picTotal: ref(intPicCount),
    };
  },

  mounted: () => {
    const pictureList = function (index) {
      return {
        backgroundImage: `url(https://picsum.photos/1920/1200?random=${index})`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${
          ((index - 1) * animationDuration) / this.intPicCount
        }s`,
      };
    };

    window.addEventListener("scroll", () => {
      this.scroll.value = window.scrollY > 0;
    });
  },
};
</script>

<style>
.picList {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
}
.picList > li {
  position: absolute;
  width: 100%;
  height: 100%;
  list-style: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 150% auto;
  opacity: 0;
}
.picList > li {
  animation-name: pictureAnimate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.scroll .picList {
  width: 1200px;
  height: 300px;
}

@keyframes pictureAnimate {
  0% {
    opacity: 0;
    background-size: 150% auto;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  to {
    opacity: 0;
    background-size: 120% auto;
  }
}
</style>
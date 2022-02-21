<template>
  <div class="bottomLayer" :class="{ scroll }">
    <ul class="picList">
      <li
        v-for="index in picTotal"
        :key="index"
        :style="pictureList(index)"
        :class="{ animate: active === index - 1 || preActive === index - 1 }"
      ></li>
    </ul>
    <h1 class="title">Live Or Life</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const scroll = ref(false);
const picTotal = ref(5);
const animationDuration = 10;
const active = ref(0);
const preActive = ref(0);

const pictureList = function (index) {
  return {
    backgroundImage: `url(https://picsum.photos/1920/1200?random=${index})`,
    animationDuration: `${animationDuration}s`,
    // animationDelay: `${((index - 1) * animationDuration) / 2}s`,
  };
};

window.addEventListener("scroll", () => {
  scroll.value = window.scrollY > 0;
});

setInterval(function () {
  preActive.value = active.value;
  active.value = (active.value + 1 + picTotal.value) % picTotal.value;
}, (animationDuration / 2) * 1000);
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}
body {
  height: 200vh;
}

.bottomLayer {
  width: 100vw;
  height: 100vh;
  background-color: rgb(179, 179, 179);
}
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
.picList > li.animate {
  animation-name: pictureAnimate;
  animation-timing-function: linear;
  /* animation-iteration-count: infinite; */
}

.scroll .picList {
  width: 1200px;
  height: 300px;
}

.title {
  /* color: white; */
  display: flex;
  align-items: center;
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

 
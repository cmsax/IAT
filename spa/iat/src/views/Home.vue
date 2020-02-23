<template>
  <div
    id="home"
    v-page-title
    :data-title="pageTitle"
    :style="{ backgroundImage: 'url(\'' + require('@/assets/ill.svg') + '\')' }"
  >
    <div class="container">
      <div class="title">
        <h1>{{ pageTitle }}</h1>
      </div>

      <div class="cards">
        <div v-for="(card, index) in cards" :key="index" class="card">
          <div class="bg-icon">
            <i :class="card.icon2"></i>
          </div>
          <el-row>
            <div class="icon">
              <i :class="card.icon"></i>
            </div>
          </el-row>
          <el-row type="flex" align="middle">
            <el-col :span="18">
              <h4>{{ card.title }}</h4>
              <p>{{ card.desc }}</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <router-link :to="card.path">
                <el-button>进入测验</el-button>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Card } from "@/interfaces/card";

@Component({})
export default class Home extends Vue {
  private cards: Card[] = [
    {
      icon: "el-icon-potato-strips",
      title: "饮食内隐联想测验",
      desc: "这项研究可以帮助我们了解人们对美味食物的一些看法。",
      icon2: "el-icon-position",
      color: "",
      path: "/iat/welcome"
    }
  ];

  get pageTitle() {
    return "进行中的项目";
  }
}
</script>

<style lang="less">
#home {
  // background-color: #6666e0;
  background-repeat: no-repeat;
  padding: 20px;
  background-position-x: 70%;
  background-size: 45%;
  background-position-y: 40%;
  padding-top: 80px;
  min-height: 700px;
  // min-height: 100vh;
  .container {
    margin: auto;
    display: flex;
    justify-items: center;
    flex-direction: column;
    text-align: left;
    max-width: 500px;
    background-position: 10cm;
    h1 {
      margin: 30px 0;
      font-size: 40px;
      color: black;
    }

    .card:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      transform: translateY(-1px);
      transition: all 200ms linear 0ms;
    }
    .card {
      background-color: #e0e4fd;
      padding: 10px 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      position: relative;

      h4 {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 10px 0;
      }
      p {
        margin: 5px 0 20px 0;
      }
      .bg-icon {
        font-size: 100px;
        position: absolute;
        font-weight: 200;
        color: #2649f3;
        z-index: 0;
        top: 0px;
        right: 10px;
        opacity: 0.6;
      }
      .icon {
        padding: 8px 10px;
        font-size: 24px;
        background-color: white;
        color: #2649f3;
        display: inline-block;
        border-radius: 10px;
        margin-bottom: 15px;
      }

      button {
        border: none;
        background-color: #2649f3;
        color: white;
        text-transform: capitalize;
        z-index: 99;
        font-size: 10px;
      }
    }
  }
}
</style>

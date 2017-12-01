<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="loadImage" class="needsclick">  
                </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item" :key="index">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 知识点：1.jsonp,promise,Obiect.assign(),公共部分抽离
 *        2.better-scroll,ref,props, 生命周期
 *        3.keep-alive， 通过后端代理方式，获取歌单列表（dev-server.js,axios）
 *        4.flex布局，better-scroll
 */
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { getRecommend,getDiscList } from "api/recommend"
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

export default{
  data(){
    return{
      recommends:[],
      discList:[]
    }
  },
  created(){
    this._getRecommend()
    this._getDiscList()
  },
  methods:{
    _getRecommend(){
      getRecommend().then((res)=>{
          if(res.code === ERR_OK){
              this.recommends = res.data.slider
          }
      })
    },
    _getDiscList() {
        // 获取不到数据了，暂时先mock
        // getDiscList().then((res) => {
        //   if (res.code === ERR_OK) {
        //     console.log(res)
        //   }
        // })
        setTimeout(()=>{
          this.discList = [
              {
                  "dissid": "892810685",
                  "createtime": "2017-11-20",
                  "commit_time": "2017-11-20",
                  "dissname": "异域风情：电影中的手风琴BGM",
                  "imgurl": "http://p.qpic.cn/music_cover/x9DLyh0c10r7JMNsHc4d2MFYujNaichgmER8V6djMovyd8qntSPy99A/600?n=1",
                  "introduction": "",
                  "listennum": 39240,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 3226975720,
                      "encrypt_uin": "oi-A7wEl7KSAon**",
                      "name": "Sugarbling。Ada",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2987745505",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "《跳舞的线》游戏背景原声收录",
                  "imgurl": "http://p.qpic.cn/music_cover/3gNibArB0BKquGve7mp3bdsFHJxGKZ0wU03WibOicPzcIbI9pZbuliarkQ/600?n=1",
                  "introduction": "",
                  "listennum": 20979,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2083172477,
                      "encrypt_uin": "ownFoi6lowvl7z**",
                      "name": "焦糖玛奇朵",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1788704534",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "时代记忆，精选20世纪台湾乐坛的华语金曲",
                  "imgurl": "http://p.qpic.cn/music_cover/8KfvDey9cibtZ5xkWxRic6voPcLibzl7qfaJmMYyby0vrDWWHZ4ibEib6DA/600?n=1",
                  "introduction": "",
                  "listennum": 37413,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1367363703,
                      "encrypt_uin": "oKos7iosoiSzoz**",
                      "name": "秋水浮萍任飘渺",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "892820052",
                  "createtime": "2017-11-20",
                  "commit_time": "2017-11-20",
                  "dissname": "Hard Dance | 直男专用的硬舞曲",
                  "imgurl": "http://p.qpic.cn/music_cover/aWAZibTor9icxjdW8SicoT6nP4awkNoyIZzpNpZpFFxo2kzmTibibq2ReZA/600?n=1",
                  "introduction": "",
                  "listennum": 14778,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 3371793920,
                      "encrypt_uin": "oioloKSqoiEAon**",
                      "name": "Molly Wu_正是在下",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3287476945",
                  "createtime": "2017-11-24",
                  "commit_time": "2017-11-24",
                  "dissname": "暧昧调剂！约会后一定会听的性感萨克斯",
                  "imgurl": "http://p.qpic.cn/music_cover/r9Js18hQauaHlf3udYvKslDgibE0pbDUlyoH1L2rWVNMOcXhss55WXA/600?n=1",
                  "introduction": "",
                  "listennum": 27645,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1400010678,
                      "encrypt_uin": "oKvzoen5oeClNn**",
                      "name": "玫瑰王",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1490361110",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "世界一流爵士女王Stacey Kent的巨星路 ",
                  "imgurl": "http://p.qpic.cn/music_cover/rOmHoEialXTfiaSAiaPxicEianzgeRbiawD8cxvtssPKKRdfqFZ4RebCVjMw/600?n=1",
                  "introduction": "",
                  "listennum": 18933,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 739703652,
                      "encrypt_uin": "7ioq7ini7w4A",
                      "name": "jennifer",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2084362149",
                  "createtime": "2017-11-28",
                  "commit_time": "2017-11-28",
                  "dissname": "偏执的文艺音乐：打破感官的隐喻",
                  "imgurl": "http://p.qpic.cn/music_cover/G4TbibkcBn5ZGjoicUG69iaWBY3clbMNRINFicU7aLicFVq7hRwJOtKUPDA/600?n=1",
                  "introduction": "",
                  "listennum": 24027,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 519473114,
                      "encrypt_uin": "7K6q7eSioK6P",
                      "name": "浅岛先生",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1187885115",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "浸身于迷恍Trance丨如此浩渺星空的奇境感",
                  "imgurl": "http://p.qpic.cn/music_cover/hBibLwnyBfQncfrhVAHPPa2cvxmbapK1YgG30j5FAiaYA9zy073XbE7Q/600?n=1",
                  "introduction": "",
                  "listennum": 38199,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1900614021,
                      "encrypt_uin": "oKEzoeC57enAov**",
                      "name": "LoVe",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3278477819",
                  "createtime": "2017-09-28",
                  "commit_time": "2017-09-28",
                  "dissname": "嘘！别告诉我妈是因为听这些歌扭断了凳子",
                  "imgurl": "http://p.qpic.cn/music_cover/S1bSX2PZGVyP4gjphwWzmAq7m3Q866OYqpPgxGDFc7icFS2uh9lG7jQ/600?n=1",
                  "introduction": "",
                  "listennum": 307501,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1027805448,
                      "encrypt_uin": "oKnA7icz7KvPNn**",
                      "name": "＂忘川ˉ",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1742823491",
                  "createtime": "2017-01-11",
                  "commit_time": "2017-01-11",
                  "dissname": "<日系>来感受Remix与动漫的盛大派对",
                  "imgurl": "http://p.qpic.cn/music_cover/qH8rLHHhL8O8Iibm56uPzJyxicdj1tTTxYHPs56YShiamWx1XbicObW3RA/600?n=1",
                  "introduction": "",
                  "listennum": 1011686,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1812948313,
                      "encrypt_uin": "oKc5owEPNeo5oz**",
                      "name": "           私に闻いて风i",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "893806937",
                  "createtime": "2017-11-28",
                  "commit_time": "2017-11-28",
                  "dissname": "2018第60届格莱美提名名单",
                  "imgurl": "http://p.qpic.cn/music_cover/9FFOSC3NnCw42Dx1kQ7Cug34EyrsnxtVCSibQKyb6UWGZjn4BVuxpiaA/600?n=1",
                  "introduction": "",
                  "listennum": 1749763,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 471440350,
                      "encrypt_uin": "7eS57evzoi4z",
                      "name": "弓长",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3275882661",
                  "createtime": "2017-08-23",
                  "commit_time": "2017-08-23",
                  "dissname": "城市白领必备：解压入眠式后摇精选",
                  "imgurl": "http://p.qpic.cn/music_cover/9nRiabv4x7ia0PE103qdsno7Zf22ibS1X3kmADPawictWBRwaLpxOaNPdA/600?n=1",
                  "introduction": "",
                  "listennum": 180846,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 3242653788,
                      "encrypt_uin": "oi-PowCkoiSFNn**",
                      "name": "爱上后摇的中年人",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1772778070",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "年度收藏！2017年1月-11月新番大合集",
                  "imgurl": "http://p.qpic.cn/music_cover/qH8rLHHhL8O8Iibm56uPzJ5Qv4XGh7qjHbA8UnIibKeoKJKG9IVrIDzA/600?n=1",
                  "introduction": "",
                  "listennum": 746959,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1812948313,
                      "encrypt_uin": "oKc5owEPNeo5oz**",
                      "name": "           私に闻いて风i",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3287545627",
                  "createtime": "2017-11-24",
                  "commit_time": "2017-11-24",
                  "dissname": "自豪！世界舞台中发光的中国音乐家",
                  "imgurl": "http://p.qpic.cn/music_cover/1HFn1Rm4ztLiaPmN5cz0jG8CtF1F00j8LJiblBuOUXhn2ibUK5UwfYXQA/600?n=1",
                  "introduction": "",
                  "listennum": 64154,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1776206658,
                      "encrypt_uin": "oKSl7w-z7wCkNn**",
                      "name": "开心的笑",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3286270219",
                  "createtime": "2017-11-14",
                  "commit_time": "2017-11-14",
                  "dissname": "不用吃狗粮！甜蜜度0％的男女合唱集",
                  "imgurl": "http://p.qpic.cn/music_cover/KZXhqWFleib6haUmPFZXatdL3VwYUgAHq34qz8djruM5th8Wnv4PFgw/600?n=1",
                  "introduction": "",
                  "listennum": 72322,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2366812118,
                      "encrypt_uin": "owos7wc5ow65Nn**",
                      "name": "幸福的小麻花",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2687708908",
                  "createtime": "2017-11-07",
                  "commit_time": "2017-11-07",
                  "dissname": "荒诞情绪飘零记：将过往在喧嚣中重新拾起",
                  "imgurl": "http://p.qpic.cn/music_cover/etRVVF7aQu1fex4ZQECBHcyAGlm2YBqEajpp6TUPBUSuia5L1IPbq9A/600?n=1",
                  "introduction": "",
                  "listennum": 22313,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 928619736,
                      "encrypt_uin": "NK-F7w6q7ios",
                      "name": "二七",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2972749403",
                  "createtime": "2017-08-04",
                  "commit_time": "2017-08-04",
                  "dissname": "钢琴摇滚：让我们寂静地呐喊",
                  "imgurl": "http://p.qpic.cn/music_cover/M5qM47JwUz1iaz3iaFzvH9rPAlO6Af6ZDQu61ibvA8RupqTyLrHxZwoDw/600?n=1",
                  "introduction": "",
                  "listennum": 1933805,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 3199564937,
                      "encrypt_uin": "oi6qNK4s7eEi7z**",
                      "name": "丁教授最爱的徒弟",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1179723378",
                  "createtime": "2017-09-25",
                  "commit_time": "2017-09-25",
                  "dissname": "诗人30首心事：无词民谣里的千愁万绪",
                  "imgurl": "http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaRwPKpQM2qXwuf7OBa4vIW3xO4bDAwticL2w/600?n=1",
                  "introduction": "",
                  "listennum": 433319,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2083923631,
                      "encrypt_uin": "ownFoiEAoiCiov**",
                      "name": "风吹草地",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2679129579",
                  "createtime": "2017-08-29",
                  "commit_time": "2017-08-29",
                  "dissname": "单身慎点：这些韩语R&B合唱有毒! ",
                  "imgurl": "http://p.qpic.cn/music_cover/UuXq5S0NJhiaNAaXeTgXzLxN1GicFTqh2NUruvk6dtPVO9gqicgXDa6bg/600?n=1",
                  "introduction": "",
                  "listennum": 588261,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2715155986,
                      "encrypt_uin": "owS57K6k7KEF7c**",
                      "name": "Piggy",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1476620220",
                  "createtime": "2017-08-09",
                  "commit_time": "2017-08-09",
                  "dissname": "新语言：历史老师听了也蒙圈的造语歌",
                  "imgurl": "http://p.qpic.cn/music_cover/BmOdzdMZlr7VR7sd0wfX5hGFzHTObDsgcNtqZqdGbHlyoJicwqU95tw/600?n=1",
                  "introduction": "",
                  "listennum": 425491,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2496312532,
                      "encrypt_uin": "owvq7wo5ow4ioc**",
                      "name": "欧美没范",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2075119332",
                  "createtime": "2017-08-31",
                  "commit_time": "2017-08-31",
                  "dissname": "小众日系R&B：纯净如北海道的风",
                  "imgurl": "http://p.qpic.cn/music_cover/tHzMbKzYyUqgJIqHZCoy9fstSMPjRlLWBWhlGeqa91uhxwKLURuYVQ/600?n=1",
                  "introduction": "",
                  "listennum": 251006,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2084375814,
                      "encrypt_uin": "ownF7eol7Kc57n**",
                      "name": "ChaCha",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3272884960",
                  "createtime": "2017-08-02",
                  "commit_time": "2017-08-02",
                  "dissname": "转角咖啡店：芝士味乡村乐撞上柠檬爵士",
                  "imgurl": "http://p.qpic.cn/music_cover/7nibdU75Y368rHg3ciaicZ08YnHmvyjS1eaovWpQmafQkSflsic8OoiaEzQ/600?n=1",
                  "introduction": "",
                  "listennum": 154947,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2602353068,
                      "encrypt_uin": "owCzowokoinsNn**",
                      "name": "浩克",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2083059243",
                  "createtime": "2017-11-07",
                  "commit_time": "2017-11-07",
                  "dissname": "「古风」开荒南野际，守拙归园田",
                  "imgurl": "http://p.qpic.cn/music_cover/2ZzHFzypCAMCviaLZRib6Y9yJrEL8E9g28iaRmHsH4pG6Tl0nrCDEIH3w/600?n=1",
                  "introduction": "",
                  "listennum": 353976,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2105165064,
                      "encrypt_uin": "ow6z7K6s7Kns7n**",
                      "name": "水手怕水",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "3586610566",
                  "createtime": "2017-11-02",
                  "commit_time": "2017-11-02",
                  "dissname": "港乐小众乐队，在茶餐厅品味港式文艺",
                  "imgurl": "http://p.qpic.cn/music_cover/7bIkpcpiavM08csogLbcpA4ZXrc59TUibDZsKNGS0pyS4PabaPUlBTng/600?n=1",
                  "introduction": "",
                  "listennum": 19764,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1986255869,
                      "encrypt_uin": "oKEF7w-k7KcsNv**",
                      "name": "fashion姐",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1185448695",
                  "createtime": "2017-11-07",
                  "commit_time": "2017-11-07",
                  "dissname": "Girls only！这家少女的店只有你能进来",
                  "imgurl": "http://p.qpic.cn/music_cover/fqHUqZibOfMrpDDNYkevRSrQa99SEDtw59J8EaiajraDqwoAl9ZUn9tA/600?n=1",
                  "introduction": "",
                  "listennum": 14552,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2845491591,
                      "encrypt_uin": "owcP7KvqoK4qov**",
                      "name": "一点绿",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1487871644",
                  "createtime": "2017-11-08",
                  "commit_time": "2017-11-08",
                  "dissname": "雅静纯音｜仿佛沉浸在宁静的森林湖泊",
                  "imgurl": "http://p.qpic.cn/music_cover/aaxX4Babic4VicBPicJOwr5xoT5wk2EozWm0oOfppKFVibuZRVoQVAvbDQ/600?n=1",
                  "introduction": "",
                  "listennum": 76445,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 1600189472,
                      "encrypt_uin": "oKCzoe6FNKvloc**",
                      "name": "꧁ζ࿆ั͡ 默꙰ 笙꙰✾࿆꧂",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "1177225945",
                  "createtime": "2017-11-21",
                  "commit_time": "2017-11-21",
                  "dissname": "雨天微凉！下班途中耳机里关于孤独的歌",
                  "imgurl": "http://p.qpic.cn/music_cover/e8Jvd83AZrRbhqofb1ES4AL2sb80jqDdhR6XyCvFb7WGB7oNMgSrfA/600?n=1",
                  "introduction": "",
                  "listennum": 40608,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 301096031,
                      "encrypt_uin": "oin5oeEsoeo5",
                      "name": "掌心薔薇開",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "893703289",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "BBC：2018年度之声十六强提名已出",
                  "imgurl": "http://p.qpic.cn/music_cover/oTVicCll2ic4QLktJAkDJRJWIdibwtVSpgiaB3WDL7P3fMGVfjVhiba3G6w/600?n=1",
                  "introduction": "",
                  "listennum": 44396,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2741225920,
                      "encrypt_uin": "owSPoK-A7KEAon**",
                      "name": "静静的顿河",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "885166591",
                  "createtime": "2017-11-27",
                  "commit_time": "2017-11-27",
                  "dissname": "发际线又后移了！90后秃头粗暴疗法",
                  "imgurl": "http://p.qpic.cn/music_cover/rTTmm5kYwyYzDb9vVF6KscPfJAPM79TOWyiaFibpXJ8z9JkbrEUv9J3Q/600?n=1",
                  "introduction": "",
                  "listennum": 64897,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2185430030,
                      "encrypt_uin": "ow6F7Kvioenion**",
                      "name": "winner",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              },
              {
                  "dissid": "2388956814",
                  "createtime": "2017-11-08",
                  "commit_time": "2017-11-08",
                  "dissname": "止不住的诱惑：韩国大长腿MV精选",
                  "imgurl": "http://p.qpic.cn/music_cover/l0JHLnMZDpBlzoJJM9N5KiartWibOBK87hd5grrag74SxyXhibtWsAw5A/600?n=1",
                  "introduction": "",
                  "listennum": 153332,
                  "score": 0,
                  "version": 0,
                  "creator": {
                      "type": 0,
                      "qq": 2877560265,
                      "encrypt_uin": "owcl7i4soe-s7v**",
                      "name": "心情如歌单",
                      "isVip": 0,
                      "avatarUrl": "",
                      "followflag": 0
                  }
              }
          ]
        },2000)
    },
    loadImage(){
      if(!this.checkloaded){
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components:{
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>
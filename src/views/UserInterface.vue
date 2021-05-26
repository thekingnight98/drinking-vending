<template>
  <div>
    <div v-if="loading">
      <Loading></Loading>
    </div>
    <div v-else>
      <v-alert v-if="alertDone" text type="success">
        <strong>Order completed</strong>
      </v-alert>
      <v-alert v-if="alertFail" text type="error">
        <strong>Order failed</strong>
      </v-alert>
      <v-container class="content-bg">
        <v-row>
          <v-col>
            <h1>Drinking System.</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(item, index) in machineData" :key="index" cols="6">
            <div @click="onPayment(item)" class="layout-machine">
              <div class="machine">
                <img
                  class="img-machine"
                  src="../assets/img/drink-machine.png"
                  alt=""
                />
                <div class="label-text">
                  <h1 class="text-number-machine">{{ item.name }}</h1>
                  <div class="text-location">
                    location : {{ item.location }}
                  </div>
                  <div class="text-center label-couting">
                    balance :
                    <span class="text-couting">{{ item.balance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2">
              เครื่องจำหน่ายสินค้า: {{ UserPayData.name }}
            </v-card-title>
            <v-card-text>
              <div class="label-location">
                Location : {{ UserPayData.location }}
              </div>
              <div class="label-location">
                จำนวนสินค้าคงเหลือ :
                <span class="text-couting">{{ UserPayData.balance }}</span> ชิ้น
              </div>
            </v-card-text>

            <v-divider></v-divider>
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader>ซื้อสินค้าจำนวน</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="ชิ้น"
                    :value="UserPayData.userCount"
                    v-model="UserPayData.userCount"
                    type="number"
                    required
                  ></v-text-field>
                  <!-- {{ UserPayData }} -->
                  <span
                    class="label-normal-text"
                    v-if="this.StoreCounting >= 0"
                  >
                    จำนวนสิ้นค้าที่ซื้อได้อีก
                    <span class="text-red-couting">{{
                      this.StoreCounting
                    }}</span>
                    ชิ้น
                  </span>
                  <span v-else class="text-red-couting"
                    >สินค้าไม่พอจำหน่าย !!!</span
                  >
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                ยกเลิก
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="SaveUserPayData(UserPayData)"
                :disabled="BuyActive"
              >
                ซื้อ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </div>
</template>

<script>
import { env } from "process";
import { mapActions, mapState } from "vuex";
import { GetAllMachine, UpdateMachine, SendLineNoti } from "../api/index";
import Loading from "../components/Loading";

export default {
  components: {
    Loading,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      dialog: false,
      loading: false,
      alertDone: false,
      alertFail: false,
      UserPayData: {},
      SaveUserPay: {},
    };
  },
  computed: {
    ...mapState(["machineData"]),
    StoreCounting() {
      return this.UserPayData.balance - this.UserPayData.userCount;
    },
    BuyActive() {
      if (this.UserPayData.balance < this.UserPayData.userCount) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions(["setMachineData", "setUserPay"]),
    init() {
      // rest api get all machine
      this.getMachine();
    },
    async getMachine() {
      try {
        this.loading = true;
        const res = await GetAllMachine();
        const result = res.data;
        this.setMachineData(result);
        console.log("result = ", result);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    onPayment(item) {
      console.log("item = ", item);
      const data = {
        name: item.name,
        id: item._id,
        location: item.location,
        countStock: item.countStock,
        userCount: item.usercount,
        balance: item.balance,
      };
      this.UserPayData = data;
      this.dialog = true;
    },
    SendNotify() {
      console.log("เข้า send noti");
      const axios = require("axios");
      const querystring = require("querystring");

      axios({
        method: "post",
        url: "https://notify-api.line.me/api/notify",
        headers: {
          Authorization:
            "Bearer " + "Joy3qiVXf3UlNT3ZlLvZJx65T1DmVf6iaZwBqNkbe8z",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        data: querystring.stringify({
          message: "something you would like to push",
        }),
      })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    async SaveUserPayData(data) {
      console.log("user Pay = ", data);
      try {
        this.loading = true;
        const payload = {
          name: data.name,
          location: data.location,
          stock: data.countStock,
          userCount: parseInt(data.userCount),
          balance: data.balance - parseInt(data.userCount),
        };
        console.log("payload = ", payload);
        const res = await UpdateMachine(data.id, payload);
        const result = res.data;
        console.log("result = ", result);
        this.dialog = false;
        this.alertDone = true;
        setInterval(() => {
          this.alertDone = false;
        }, 3000);
        this.getMachine();
        if (result && payload.balance <= 10) {
          this.setUserPay(payload);
          this.$router.push({ name: "SendEmail" });
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.alertFail = true;
        setInterval(() => {
          this.alertFail = false;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.layout-machine {
  /* margin: 80px 40px; */
  background: url("../assets/img/wall-nature.jpg");
  justify-content: center;
  display: flex;
}
.text-center {
  text-align: center;
}
.machine {
  /* border: 1px solid #333; */
  padding: 60px 0px;
}
.text-number-machine {
  text-align: center;
  color: #fff;
}
.img-machine {
  width: 100%;
  transition: transform 0.2s;
}
.text-location {
  text-align: center;
  color: #f7f5f5 !important;
}
.label-location {
  color: #333 !important;
}
.img-machine:hover {
  opacity: 1;
  transform: scale(1.2);
}
.text-couting {
  text-align: center;
  color: rgb(87, 226, 52);
}
.label-text {
  background-color: rgba(163, 156, 156, 0.267);
  z-index: 1;
  position: relative;
  bottom: 100px;
}
.label-normal-text {
  color: #333 !important;
}
.label-couting {
  color: #f7f5f5 !important;
}
.text-red-couting {
  color: #8a060b;
}
</style>

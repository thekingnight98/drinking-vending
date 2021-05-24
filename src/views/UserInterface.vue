<template>
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
              <div class="text-location">location : {{ item.location }}</div>
              <div class="text-center label-couting">
                count : <span class="text-couting">{{ item.balance }}</span>
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
            <span class="text-couting">{{ UserPayData.countStock }}</span> ชิ้น
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
                required
              ></v-text-field>
              <span class="label-normal-text" v-if="this.StoreCounting > 0">
                จำนวนสิ้นค้าที่ซื้อได้อีก
                <span class="text-red-couting">{{ this.StoreCounting }}</span>
                ชิ้น
              </span>
              <span v-else class="text-couting"
                >กรุณากรอกจำนวนให้ถูกต้องด้วย !!!</span
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
          >
            ซื้อ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  mounted() {
    this.init();
  },
  data() {
    return {
      dialog: false,
      items: [
        {
          id: 1,
          name: "machine1",
          location: "Phra Nakhon District",
          stock: 30,
          userCount: 1,
          balance: 30,
        },
        {
          id: 2,
          name: "machine2",
          location: "Dusit District",
          stock: 30,
          userCount: 1,
          balance: 30,
        },
        {
          id: 3,
          name: "machine3",
          location: "Nong Chok District",
          stock: 30,
          userCount: 1,
          balance: 30,
        },
        {
          id: 4,
          name: "machine4",
          location: "Bang Rak District",
          stock: 30,
          userCount: 1,
          balance: 30,
        },
      ],
      UserPayData: {},
      SaveUserPay: {},
    };
  },
  computed: {
    ...mapState(["machineData"]),
    StoreCounting() {
      return this.UserPayData.countStock - this.UserPayData.userCount;
    },
  },
  methods: {
    ...mapActions(["setMachineData"]),
    init() {
      // rest api get all machine
      const res = this.items;
      console.log(res);
      this.setMachineData(res);
    },
    onPayment(item) {
      this.dialog = true;
      const data = {
        name: item.name,
        id: item.id,
        location: item.location,
        countStock: item.stock,
        userCount: item.userCount,
      };
      this.UserPayData = data;
      console.log("data = ", data);
    },
    SaveUserPayData(temp) {
      console.log("temp = ", temp);
      this.dialog = false;
      this.SaveUserPay = {
        name: temp.name,
        location: temp.location,
        id: temp.id,
        stock: temp.countStock,
        userCount: parseInt(temp.userCount),
        balance: temp.countStock - parseInt(temp.userCount),
      };
      // console.log("จำนวนสินค้าที่ลูกค้าซื้อทั้งหมด =", this.SaveUserPay);
      // rest api update stock
      // after rest api return value to items
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

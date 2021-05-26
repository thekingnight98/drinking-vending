<template>
  <v-form @submit.prevent="sendEmail" v-model="valid">
    <v-container>
      <h1>Stock สินค้าของคุณเหลือน้อย</h1>
      <h2>ระบบจะทำการส่ง email แจ้งเตือนไปยังบริษัท</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="saveUserPay.location"
            :value="saveUserPay.location"
            name="name"
            label="Location name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            name="email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="subject"
            label="Subject"
            name="subject"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            solo
            v-model="processMsg"
            name="message"
            label="message"
            :value="processMsg"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-4 success"
          @submit.prevent="sendEmail"
          type="submit"
          :disabled="!valid"
        >
          submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import emailjs from "emailjs-com";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      valid: false,
      location: "",
      message: "",
      subject: "Stock สินค้าของคุณเหลือน้อย",
      email: "arm@example.com",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapState(["saveUserPay"]),
    processMsg() {
      return `สินค้าคงเหลือจำนวน ${this.saveUserPay.balance} ชิ้น ที่สาขา ${this.saveUserPay.location}`;
    },
  },
  methods: {
    ...mapActions(["setUserPay"]),
    async sendEmail(e) {
      emailjs
        .sendForm(
          "service_bs8ocvu",
          "template_adr5suf",
          e.target,
          "user_dQSPj0DgCuteQDxkhj4pG"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
            console.log(alert(`can't sent the Email.`));
          }
        );
      e.target.reset();
      await this.$router.push({ name: "UserInterface" });
    },
  },
};
</script>

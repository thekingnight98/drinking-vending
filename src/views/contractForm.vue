<template>
  <v-form @submit.prevent="sendEmail" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            name="name"
            label="First name"
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
            v-model="message"
            name="message"
            label="message"
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

export default {
  data() {
    return {
      valid: false,
      firstname: "",
      message: "",
      subject: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    sendEmail: (e) => {
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
      this.$router.push({
        name: "UserInterface",
      });
    },
  },
};
</script>

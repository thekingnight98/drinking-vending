<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1 class="cursor-pointer" @click="GotoHomepage()">Drinking</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="GotoStock()" text>
        <span class="mr-2">Stock</span>
        <v-icon>mdi-storefront-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import "./assets/css/App.css";
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    GotoStock() {
      this.$router.push({ name: "Stock" });
    },
    GotoHomepage(){
      this.$router.push({ name: "UserInterface" });
    }
  },
};
</script>

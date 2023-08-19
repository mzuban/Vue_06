<template>
  <div class="about">
    <h1>This is a signup page</h1>

    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">E-mail adresa</label>
            <input
              type="email"
              v-model="username"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword2">Repeat Password</label>
            <input
              type="password"
              v-model="passwordRepeat"
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
            />
          </div>

          <button type="button" @click="signup()" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { firebase, db } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    signup() {
      console.log("Start...");
      console.log("User:", this.username, this.password);

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(() => {
          console.log("Uspješna registracija");
          alert("Uspješna registracija");
          this.username = "";
          this.password = "";
        })
        .catch((error) => {
          console.error("Došlo je do greške pri registraciji", error.message);
        });
      console.log("Nastavak.");
    },
  },
};
</script>

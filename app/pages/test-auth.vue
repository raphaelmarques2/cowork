<template>
  <div>
    <h1>Test Auth</h1>
    <div class="flex flex-col">
      <button @click="() => login()">Login</button>
      <button @click="() => signup()">Signup</button>
      <button @click="() => logout()">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { backendService } from "../services/backend";
async function login() {
  console.log("login");
  const res = await backendService.login({
    email: "a@abc.com",
    password: "123456",
  });
  console.log(res);
}

function logout() {
  console.log("logout");
}

async function signup() {
  console.log("signup");
  const res = await backendService.signup({
    name: "A",
    email: "a@abc.com",
    password: "123456",
  });
  console.log(res);
}
</script>

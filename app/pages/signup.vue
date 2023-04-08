<template>
  <div class="bg-white rounded p-10 space-y-4">
    <h1>Signup</h1>
    <div class="flex flex-col w-60">
      <label class="text-xs">Name</label>
      <input
        class="border border-solid border-gray-950 rounded px-2 py-1"
        type="name"
        placeholder="John Smith"
        v-model="name"
      />
    </div>
    <div class="flex flex-col w-60">
      <label class="text-xs">Email</label>
      <input
        class="border border-solid border-gray-950 rounded px-2 py-1"
        type="email"
        placeholder="name@mail.com"
        v-model="email"
      />
    </div>
    <div class="flex flex-col w-60">
      <label class="text-xs">Password</label>
      <input
        class="border border-solid border-gray-950 rounded px-2 py-1"
        type="password"
        placeholder="**********"
        v-model="password"
      />
    </div>
    <div>
      <FlatButton class="w-full mt-4" @click="signup">Sign Up</FlatButton>
    </div>
    <div class="text-sm">
      <p>
        {{ "Do you have an account? " }}
        <LinkButton to="/login">Login</LinkButton>
      </p>
    </div>
  </div>
</template>

<script setup>
import { backendService } from "~/services/backend";

definePageMeta({
  layout: "auth",
});

const name = ref("");
const email = ref("");
const password = ref("");

async function signup() {
  console.log("signup");
  const res = await backendService.signup({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  console.log(res);
}
</script>

<template>
  <div class="bg-white rounded p-10 space-y-4">
    <h1>Login</h1>
    <div class="flex flex-col w-60">
      <label class="text-xs">Email</label>
      <input
        class="border border-solid border-gray-950 rounded px-2 py-1"
        type="email"
        placeholder="name@mail.com"
      />
    </div>
    <div class="flex flex-col w-60">
      <label class="text-xs">Password</label>
      <input
        class="border border-solid border-gray-950 rounded px-2 py-1"
        type="password"
        placeholder="**********"
      />
    </div>
    <div>
      <FlatButton class="w-full mt-4">Login</FlatButton>
    </div>
    <div class="text-sm">
      <p>
        {{ "Don't you have an account? " }}
        <LinkButton to="/signup">Sign Up</LinkButton>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>

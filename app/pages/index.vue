<template>
  <div class="min-h-screen flex flex-col page-gradient">
    <header class="flex justify-between px-8 py-10 text-white">
      <div>
        <span>Logo</span>
      </div>
      <div class="space-x-20">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/about">Price</NuxtLink>
        <NuxtLink to="/about">Blog</NuxtLink>
      </div>
    </header>
    <main class="text-white flex justify-center items-center flex-1">
      <div class="flex flex-col items-center pb-20">
        <h1 class="text-5xl text-center pb-4">Cowork</h1>
        <p class="w-96 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          dolore nobis optio, error modi.
        </p>
        <FlatButton class="w-32 mt-10">
          <NuxtLink to="/login">CLICK HERE</NuxtLink>
        </FlatButton>
      </div>
    </main>
  </div>
</template>

<script setup></script>

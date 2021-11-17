<script setup lang="ts"></script>
<template>
  <div class="container">
    <nav class="nav">
      <NuxtLink to="/" class="home-link">Welcome to the Jojo APP</NuxtLink>
    </nav>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<style>


.container {
  --nav-height: 64px;
  --nav-color: grey;
  --main-background-color: lightgrey;

  min-height: 100vh;
  background-color: var(--main-background-color);
}
.nav {
  height: var(--nav-height);
  background-color: var(--nav-color);
  display: flex;
  align-items: center;
  padding-left: 16px;
}
.home-link {
  text-decoration: none;
  color: white;
}
.body {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  min-height: calc(100vh - var(--nav-height));
}
</style>

<script setup lang="ts">

// Client side
// const { data }: { data: any } = await useFetch('/api/hello?search=mash')

// Server side
const { data } : { data: any } = await useAsyncData('searchData', () =>
  $fetch('/api/hello?search=girls')
)

</script>
<template>
  <div>
    <h1>Hello world</h1>
    <img src="/broly.jpg" alt="broly">
    <div>
      {{ data }}
    </div>
  </div>
</template>

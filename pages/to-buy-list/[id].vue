<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const list = ref({})
const item = ref('')

console.log('hey')
// Fetch la liste des taches en utilisant l'id
const { data } = await useFetch(`/api/to-buy-list?id=${route.params.id}`)
list.value = data.value
/*const { data2 } = useFetch('/api/to-buy-list', {
  method: 'POST'
})
const { data3 } = useFetch('/api/to-buy-list', {
  method: 'PUT'
})*/
// Add object to the list


// Check the item

// Remove object to the list
const nuxtInstance = useNuxtApp()

const addItem = async () => {
  await $fetch('/api/to-buy-list', {
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    body: {
      listId: list.value.id,
      title: item.value
    }
  })
  console.log('routeId', route.params.id)
  const data = await $fetch(`/api/to-buy-list?id=${route.params.id}`)
  console.log('after fetch', data)
  list.value = data
}
const removeItem = async (itemId) => {
  await $fetch(`/api/to-buy-list?id=${itemId}`, {
    method: 'DELETE'
  })
  const data = await $fetch(`/api/to-buy-list?id=${route.params.id}`)
  console.log('after fetch', data)
  list.value = data
}
</script>

<template>
  <div class="to-buy-list">
    <h3>Liste de course id n° {{ $route.params.id }}</h3>
    <h3>Liste récupéré id n° {{ list.id }}</h3>
    {{ $route.params }}
    <ul>
      <li v-for="item in list.items">{{ item.title }}
        <button @click="removeItem(item.id)">supprimer</button>
      </li>
    </ul>
    <input type="text" v-model="item">
    <button @click="addItem">Add Item !</button>
  </div>
</template>

<style>
.to-buy-list {
  width: 80%;
  margin: 64px auto;
  background-color: #EEEEEE;
  border: 2px solid aquamarine;
}
</style>

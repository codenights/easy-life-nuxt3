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
      'Content-type': 'application/json'
    },
    body: {
      listId: list.value.id,
      title: item.value
    }
  })
  const { data } = await useFetch(`/api/to-buy-list?id=${route.params.id}`)
  list.value = data.value
}
const removeItem = async (itemId) => {
  await $fetch(`/api/to-buy-list?id=${itemId}`, {
    method: 'DELETE'
  })
  const { data } = await useFetch(`/api/to-buy-list?id=${route.params.id}`)
  list.value = data.value
}
</script>

<template>
  <div>
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

<template>
    <div>
      <select v-model="locale">
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
      <TreeView :locale="locale" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import TreeNode from '../components/TreeNode.vue';
  
  const locale = ref('ru');
  </script>
  
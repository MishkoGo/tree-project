<template>
  <div class="p-4">
    <select v-model="locale" class="mb-8">
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
    
    <div v-if="tree.length">
      <ul class="list-none">
        <TreeNode
          v-for="node in tree"
          :key="node.id"
          :node="node"
          :locale="locale"
        />
      </ul>
    </div>
    <div v-else>
      <p>Загружаем данные</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TreeNode from './components/TreeNode.vue';
import './assets/css/tailwind.css';

const locale = ref('ru');
const tree = ref([]);

const fetchTreeData = async () => {
  const response = await fetch('/api/tasks');
  if (response.ok) {
    tree.value = await response.json();
  } else {
    console.error('Ошибка загрузки данных');
  }
};

onMounted(() => {
  fetchTreeData();
});
</script>
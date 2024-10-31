<template>
  <li>
    <div @click="toggle" class="cursor-pointer flex items-start flex-col">
      <img class="w-1/5 h-16 mr-2 mb-5 mt-5" v-if="node.category_image" :src="node.category_image" alt=""  />
      <span class="">{{ getCategoryName(node) }}</span>
    </div>

    <div class="text-sm text-gray-600">
      <span v-for="(id, index) in breadcrumbIds" :key="id">
        <a :href="getBreadcrumbLink(id)" class="text-blue-500 underline" target="_blank">
          {{ getBreadcrumbName(id) }}
        </a>
        <span v-if="index < breadcrumbIds.length - 1"> → </span>
      </span>
    </div>

    <div v-if="isOpen">
      <ul v-if="node.childs && node.childs.length > 0" class="mb-8 ml-10 mt-1">
        <TreeNode class="mt-4"
          v-for="child in node.childs"
          :key="child.id"
          :node="child"
          :locale="locale"
        />
      </ul>
    </div>

    <div>
      <a :href="getCategoryLink(node)" class="text-blue-600 underline" target="_blank">
        Подробнее
      </a>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import './assets/css/tailwind.css';

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const breadcrumbIds = computed(() => {
  return props.node.path_to_top || [];
});

const getCategoryName = (node) => {
  return node.locale && node.locale[props.locale]
    ? node.locale[props.locale].cg_name || node.locale['ru']?.cg_name || ''
    : '';
};

const getBreadcrumbName = (id) => {
  const findNodeById = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.childs) {
        const found = findNodeById(node.childs, id);
        if (found) return found;
      }
    }
    return null;
  };

  const parentNode = findNodeById(props.node.path_to_top || [], id);
  return parentNode ? getCategoryName(parentNode) : '';
};

const getBreadcrumbLink = (id) => {
  const parentNode = props.node.path_to_top?.find((item) => item === id);
  return parentNode ? `/${parentNode.locale?.[props.locale]?.link}` : '';
};

const getCategoryLink = (node) => {
  return node.locale && node.locale[props.locale]?.link || node.locale?.['ru']?.link || '';
};

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

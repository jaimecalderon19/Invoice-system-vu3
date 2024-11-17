<template>
    <aside class="sidebar">
      <nav class="nav-menu">
        <ul class="menu-list">
          <!-- Iteramos sobre los items del menú -->
          <li v-for="item in menuItems" :key="item.id" class="menu-item">
            <!-- Item principal -->
            <div 
              class="menu-link"
              :class="{ 'active': isActive(item.path) }"
              @click="handleMenuClick(item)"
            >
              <span>{{ item.title }}</span>
              <span 
                v-if="item.children" 
                class="arrow"
                :class="{ 'expanded': isExpanded(item.id) }"
              >
                ▼
              </span>
            </div>
  
            <!-- Submenú -->
            <transition name="slide">
              <ul v-if="item.children" 
                  v-show="isExpanded(item.id)" 
                  class="submenu">
                <li v-for="child in item.children" 
                    :key="child.id" 
                    class="submenu-item">
                  <router-link 
                    :to="child.path"
                    class="submenu-link"
                    :class="{ 'active': isActive(child.path) }"
                  >
                    {{ child.title }}
                  </router-link>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  interface MenuItem {
    id: number;
    title: string;
    path: string;
    children?: MenuItem[];
  }
  
  // Props para recibir los items del menú
  const props = withDefaults(defineProps<{
    menuItems: MenuItem[];
  }>(), {
    menuItems: () => []
  });
  
  const route = useRoute();
  const router = useRouter();
  
  // Control de submenús expandidos
  const expandedMenus = ref<number[]>([]);
  
  // Verifica si un menú está expandido
  const isExpanded = (menuId: number): boolean => {
    return expandedMenus.value.includes(menuId);
  };
  
  // Verifica si una ruta está activa
  const isActive = (path: string): boolean => {
    return route.path === path;
  };
  
  // Maneja el click en un item del menú
  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      // Si tiene submenús, toggle la expansión
      const index = expandedMenus.value.indexOf(item.id);
      if (index === -1) {
        expandedMenus.value.push(item.id);
      } else {
        expandedMenus.value.splice(index, 1);
      }
    } else {
      // Si no tiene submenús, navega a la ruta
      router.push(item.path);
    }
  };
  </script>
  
  <style >
  .sidebar {
    width: 100%;
    height: 100%;
  }
  
  .nav-menu {
    padding: 1rem 0;
  }
  
  .menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-item {
    margin: 0.25rem 0;
  }
  
  .menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: #e9ecef;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .menu-link:hover {
    background-color: #7b5cfa;
  }
  
  .menu-link.active {
    background-color: #7b5cfa;
    color: #ffff;
    font-weight: 500;
  }
  
  .arrow {
    font-size: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  .arrow.expanded {
    transform: rotate(180deg);
  }
  
  .submenu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .submenu-item {
    margin: 0;
  }
  
  .submenu-link {
    display: block;
    padding: 0.5rem 2rem;
    color: #6c757d;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .submenu-link:hover {
    background-color: #886bff;
    color: #495057;
  }
  
  .submenu-link.active {
    background-color: #886bff;
    color: #ffff;
    font-weight: 700;
  }
  
  /* Animaciones */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
    max-height: 400px; /* Ajusta según necesites */
  }
  
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    max-height: 0;
  }
  </style>
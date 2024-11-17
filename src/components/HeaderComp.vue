<template>
  <div class="header">
    <div class="logo-container">
      <router-link :to="{ name: 'Home' }">
        <div class="logo">
          <div class="logo-rect"></div>
        </div>
      </router-link>
    </div>
    <SidebarMenu :menuItems="menuItems" />
    <div class="user-info">
      <a href="https://github.com/jaimecalderon19" target="_blank">
        <img
          class="user-photo"
          width="40px"
          height="40px"
          src="https://jaimecalderon16.github.io/portafolio/images/LogoJC.png"
          alt="profile photo"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>

import SidebarMenu from '../components/LateralMenu.vue';

const menuItems = [
  {
    id: 1,
    title: 'Cargar Informacion',
    path: '/information',
    children: [
      {
        id: 3,
        title: 'Trayectos especiales',
        path: '/information/specials_path'
      },
    ]
  },
  {
    id: 2,
    title: 'Aprobaciones',
    path: '/aprobations',
    children: [
      {
        id: 4,
        title: 'Trayectos especiales',
        path: '/aprobations/specials_path'
      },
    ]
  },
  
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 100vh;
  width: 15vw;
  background-color: #1e2139;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 3;
}
.logo-container {
  width: 100%;
  height: 103px;
  background-color: #7b5cfa;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 40px;
  height: 40px;
  position: relative;
  background-color: white;
  border-radius: 50%;
}
.logo-rect {
  background: #7b5cfa;
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(80% 0, 20% 0, 50% 50%);
}
.user-info {
  width: 100%;
  height: 90px;
  border-top: 1px solid rgb(73, 79, 110);
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-photo {
  border-radius: 50%;
}

@media screen and (max-width: 1024px) {
  .header {
    height: 80px;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0;
  }
  .logo-container {
    width: 80px;
    height: 100%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }
  .logo {
    width: 30px;
    height: 30px;
    position: relative;
    background-color: white;
    border-radius: 50%;
  }
  .user-info {
    width: 90px;
    height: 100%;
    border-left: 1px solid rgb(73, 79, 110);
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

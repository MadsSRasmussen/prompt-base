<template>
  <div class="grid grid-flow-row grid-cols-[300px_1fr] fixed w-full h-full bg-gray-100 dark:bg-gray-800">
    <LayoutSidebar />
    <div class="custom_shadow p-10 pl-12 pr-12 overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.custom_shadow {

  @media (prefers-color-scheme: light) {
    box-shadow: inset 36px 0px 36px -16px rgb(194, 194, 194);
  }

  @media (prefers-color-scheme: dark) {
    box-shadow: inset 36px 0px 36px -16px rgb(27, 27, 27);
  }

}
</style>
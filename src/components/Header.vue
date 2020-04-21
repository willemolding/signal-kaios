<template>
  <header class="header">
    <span>{{ title }}</span>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.header {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #9b27af;
  padding: 3px 10px;
}

.header span {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
}

</style>
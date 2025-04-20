<template>
    <div id="paperpiece">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
</template>

<script>
export default {
  name: "Piece",
  props
  : {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
#paperpiece {
  border: 2px solid black;
}
</style>
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
  border-top: 2px dashed #bbb; /* Dashed border for perforation at the top */
  border-bottom: 2px dashed #bbb; /* Dashed border for perforation at the bottom */
  background: #fdfdfd; /* Light paper-like background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px; /* Add padding for content spacing */
  font-family: "Arial", sans-serif; /* Clean font for readability */
  line-height: 1.6; /* Improve text readability */
  position: relative; /* For decorative elements */
  overflow: hidden; /* Prevent pseudo-elements from affecting layout */
}

/* Remove spacing between pieces */
#paperpiece + #paperpiece {
  margin-top: -2px; /* Overlap the dashed border to connect pieces */
}

/* Add subtle texture to the paper */
#paperpiece::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(240, 240, 240, 0.5) 1px, transparent 1px);
  background-size: 15px 15px; /* Larger dots for texture */
  opacity: 0.4; /* Subtle texture effect */
  pointer-events: none; /* Ensure it doesn't interfere with interactions */
}

</style>
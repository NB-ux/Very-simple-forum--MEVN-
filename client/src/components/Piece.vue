<template>
    <div id="paperpiece">
      <button class="delete-btn" @click="deletePiece">✂</button>
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Piece",
  props
  : {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deletePiece() {
    console.log("Post object:", this.post); // Log the post object
    try {
      await axios.delete(`http://localhost:3001/api/${this.post._id}`);
      this.$emit("delete", this.post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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

/* Delete button styling */
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fdfdfd; /* Match the paper background */
  border: 2px dashed #bbb; /* Dashed border to match the design */
  border-radius: 50%; /* Circular button */
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #555; /* Subtle text color */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s;
}

.delete-btn:hover {
  background: #f0f0f0; /* Slightly darker background on hover */
  transform: scale(1.1); /* Slight zoom effect */
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
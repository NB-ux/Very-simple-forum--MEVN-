<template>
    <div class="paper">
    <div id="rightpane">&nbsp;</div>
      <div id="midpane">
        <Piece v-for="post in posts" :key="post._id" :post="post" @delete="deletePost" />
      </div>
      <div id="leftpane">&nbsp;</div>
        <!-- Post Actions -->
      <div class="post-actions">
        <button class="create-post-btn" @click="togglePopup">Create new post</button>
        <Popup :visible="isPopupVisible" @close="closePopup" />
      </div>
    </div>
</template>
  
  <script>
  // @ is an alias to /src
  import axios from "axios";
  import Piece from "@/components/Piece.vue";
  import Popup from "@/components/NewPostPopup.vue";

  export default {
    name: "paper",
    components: {
      Piece,
      Popup
    },
    data() {
    return {
      isPopupVisible: false,
      posts: [],
      };
    },
    methods: {
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3001/api'); // Adjust the endpoint if needed
        this.posts = response.data; // Store the fetched posts
        console.log("Fetched posts:", this.posts); // Log the fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    deletePost(postId) {
      this.posts = this.posts.filter((post) => post._id !== postId);
    },
  },
  mounted() {
    this.fetchPosts(); // Fetch posts when the component is mounted
  },
  };
  </script>

<style>

/* Styling for the Create New Post button */
.create-post-btn {
  display: inline-block;
  background: #fdfdfd; /* Light paper-like background */
  border: 2px dashed #bbb; /* Dashed border to match the toilet paper theme */
  border-radius: 10px; /* Slightly rounded corners */
  padding: 10px 20px; /* Add padding for spacing */
  font-family: "Arial", sans-serif; /* Clean font for readability */
  font-size: 16px; /* Adjust font size */
  color: #555; /* Subtle text color */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: background 0.3s, transform 0.2s; /* Smooth hover effects */
  margin: 20px auto; /* Center the button */
  display: block; /* Center-align the button */
}

.create-post-btn:hover {
  background: #f0f0f0; /* Slightly darker background on hover */
  transform: scale(1.05); /* Slight zoom effect */
}

#midpane {
  width: 50%;
  float: right;
}
#leftpane{
  width: 25%;
  float: left;
}
#rightpane{
  width: 25%;
  float: right;
}
</style>
  
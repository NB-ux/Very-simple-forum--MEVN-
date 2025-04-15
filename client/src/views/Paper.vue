<template>
    <div class="paper">
    <div id="rightpane">&nbsp;</div>
      <div id="midpane">
        <Piece v-for="post in posts" :key="post._id" :post="post" />
      </div>
      <div id="leftpane">&nbsp;</div>
        <!-- Post Actions -->
      <div class="post-actions">
        <button class="action-btn like-btn" @click="togglePopup">Create new post</button>
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
        const response = await axios.get('http://localhost:3001'); // Adjust the endpoint if needed
        this.posts = response.data; // Store the fetched posts
        console.log("Fetched posts:", this.posts); // Log the fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
  mounted() {
    this.fetchPosts(); // Fetch posts when the component is mounted
  },
  };
  </script>

<style>
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
  
<template>
    <div class="paper">
    <div id="rightpane">&nbsp;</div>
      <div id="midpane">
        <Piece />
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
      isPopupVisible: false
      };
    },
    methods: {
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    closePopup() {
      this.isPopupVisible = false;
    }
  }
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
  
<template>
    <div class="paper">
      <img alt="Vue logo" src="../assets/mevn.jpg" width="350" />
      <Piece />
      <a>test</a>
    </div>
</template>
  
  <script>
  // @ is an alias to /src
  import Piece from "@/components/Piece.vue";
  
  export default {
    name: "paper",
    components: {
      Piece
    }
  };
  </script>
  
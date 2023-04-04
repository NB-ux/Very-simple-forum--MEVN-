<template>
    <div class="paper">
    <div id="rightpane">&nbsp;</div>
      <div id="midpane">
        <Piece />
      </div>
      <div id="leftpane">&nbsp;</div>
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
  
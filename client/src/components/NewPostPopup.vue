<template>
    <div v-if="visible" class="popup-overlay">
        <div class="popup-content">
            <button class="close-btn" @click="closePopup">X</button>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewPostPopup",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 16px;
    cursor: pointer;
}
</style>

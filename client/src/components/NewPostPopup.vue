<template>
    <div v-if="visible" class="popup-overlay">

    <form @submit.prevent="submitPost">
        <div class="popup-content">
            <button class="close-btn" @click="closePopup">X</button>
            <slot></slot>
            <div>
                <h3>Create new post</h3>
                <input v-model="title" type="text" id="title" placeholder="Title here">
                <textarea v-model="content" id="content" placeholder="Enter post content here" rows="6"></textarea>
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NewPostPopup",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data(){
        return{
            title: "",
            content: "",
        };
    },
    methods: {

        closePopup() {
            this.$emit('close');
        },
        
        async submitPost(){
            const postData={
                title: this.title,
                content: this.content,
            };

            try {
                const res = await axios.post("http://localhost:3001/api/", postData);
                if (res.status===200){
                    alert("Post created successfully!");
                }
                this.title = "";
                this.content = "";
            } catch (error) {
                alert("Error creating post...")
                console.error(error)
            }
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

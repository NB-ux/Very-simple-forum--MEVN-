<template>
    <div v-if="visible" class="popup-overlay">

    <form @submit.prevent="submitPost">
        <div class="popup-content">
            <button class="close-btn" @click="closePopup">X</button>
        <h3>Create New Post</h3>
        <input v-model="title" type="text" id="title" placeholder="Title here" />
        <textarea
          v-model="content"
          id="content"
          placeholder="Enter post content here"
          rows="6"
        ></textarea>
        <button type="submit" class="submit-btn">Submit</button>
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
                    //alert("Post created successfully!");
                    this.$emit('postCreated', res.data);
                    this.title = "";
                    this.content = "";
                    this.closePopup();
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
  background: rgba(0, 0, 0, 0.5); /* Dimmed background */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  border-top: 2px dashed #bbb; /* Dashed border for perforation at the top */
  border-bottom: 2px dashed #bbb; /* Dashed border for perforation at the bottom */
  background: #fdfdfd; /* Light paper-like background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px; /* Add padding for content spacing */
  font-family: "Arial", sans-serif; /* Clean font for readability */
  line-height: 1.6; /* Improve text readability */
  border-radius: 10px; /* Rounded corners for a paper-like look */
  width: 300px;
  text-align: center;
  position: relative; /* For the close button */
  overflow: hidden; /* Prevent pseudo-elements from affecting layout */
}

/* Close button styling */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
}

/* Input and textarea styling */
input,
textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 2px dashed #bbb; /* Dashed border to match the paper theme */
  border-radius: 5px; /* Slightly rounded corners */
  background: #fdfdfd; /* Match the paper background */
  font-family: "Arial", sans-serif;
  font-size: 14px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inset shadow */
  box-sizing: border-box;
}

/* Submit button styling */
.submit-btn {
  background: #fdfdfd; /* Match the paper background */
  border: 2px dashed #bbb; /* Dashed border to match the design */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background: #f0f0f0; /* Slightly darker background on hover */
  transform: scale(1.05); /* Slight zoom effect */
}
</style>

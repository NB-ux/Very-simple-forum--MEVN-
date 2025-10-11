<template>
  <div class="login-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      error: "",
      success: ""
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.success = "";
      try {
        const res = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password
          })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          this.success = "Registration successful! You can now log in.";
        } else {
          this.error = data.message || "Registration failed.";
        }
      } catch (err) {
        this.error = "Registration failed. Server error.";
      }
    }
  }
};
</script>

<style scoped>
/* Reuse your login styles */
.login-container {
  max-width: 350px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
  background: #fdfdfd;
  border: 2px dashed #bbb;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}
input {
  display: block;
  width: 90%;
  margin: 15px auto;
  padding: 10px;
  border: 2px dashed #bbb;
  border-radius: 5px;
  background: #fff;
  font-size: 16px;
}
button {
  padding: 10px 30px;
  border: 2px dashed #bbb;
  border-radius: 5px;
  background: #fdfdfd;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background: #f0f0f0;
}
.error {
  color: #c00;
  margin-top: 10px;
}
.success {
  color: #080;
  margin-top: 10px;
}
</style>
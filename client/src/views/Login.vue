<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem('token', data.token); // Save token
        this.$router.push("/paper");
      } else {
        this.error = data.message || "Invalid username or password";
      }
    } catch (err) {
      this.error = "Login failed. Server error.";
    }
    }
  }
};
</script>

<style scoped>
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
</style>
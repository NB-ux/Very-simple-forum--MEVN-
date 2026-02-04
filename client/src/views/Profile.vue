<template>
  <div class="profile-container">
    <h2>Profile</h2>
    
    <div v-if="user" class="profile-info">
      <div class="info-block">
        <label>Username:</label>
        <p>{{ user.username }}</p>
      </div>
      <div class="info-block">
        <label>Email:</label>
        <p>{{ user.email }}</p>
      </div>
      <button @click="logout" class="logout-btn">Log Out</button>
    </div>

    <div v-else-if="loading" class="loading">
      Loading profile...
    </div>

    <div v-else class="error">
      <p>Unable to load profile. Please log in.</p>
      <button @click="$router.push('/login')">Go to Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: null,
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.loading = false;
        this.error = "No token found";
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        console.log('Profile response:', res.status, data);

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        this.user = data.user;
      } catch (err) {
        console.error('Profile fetch error:', err.message);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 10px;
  background: #fdfdfd;
  border: 2px dashed #bbb;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.profile-info {
  text-align: left;
  margin: 20px 0;
}

.info-block {
  margin: 15px 0;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.info-block label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.info-block p {
  margin: 0;
  color: #333;
}

.logout-btn {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: 2px dashed #bbb;
  border-radius: 5px;
  background: #fdfdfd;
  font-size: 16px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #f0f0f0;
}

.loading {
  padding: 20px;
  color: #666;
}

.error {
  padding: 20px;
  color: #c00;
}

.error button {
  margin-top: 10px;
  padding: 10px 20px;
  border: 2px dashed #bbb;
  border-radius: 5px;
  background: #fdfdfd;
  cursor: pointer;
}

.error button:hover {
  background: #f0f0f0;
}
</style>

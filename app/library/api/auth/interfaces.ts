const interfaces = {
  guestIn() {
    return this.post('/auth/guest_in');
  },
  register(data) {
    return this.post('/auth/register', { data });
  },
  signIn(data) {
    return this.post('/auth/sign_in', { data });
  },
}

export default interfaces;

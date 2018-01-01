const getters = {
  token: state => state.user.token,
  name: state => state.user.name, //sessionStorage.getItem('User-Name'),
  cartCount: state => state.user.cartCount,
}

export default getters;

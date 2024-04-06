const apiHost = 'https://bakesaleapi-rn.onrender.com';

export default {
  async fetchInitialDeals() {
    try {
      let response = await fetch(apiHost + '/deals');
      let responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.error(error);
    }
  }
};
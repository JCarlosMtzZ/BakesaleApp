const apiHost = 'https://bakesaleapi-rn.onrender.com';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(apiHost + '/deals');
      const responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.error(error);
    }
  },
  async fetchDealDetail(dealId) {
    try {
      const response = await fetch(apiHost + '/deals/' + dealId);
      const responseJson = await response.json();
      return responseJson
    } catch(error) {
      console.error(error);
    }
  }
};
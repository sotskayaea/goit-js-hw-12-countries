export default class NewApi {
  constructor(){
      this.searchQuery = '';

  }

  fetchCountries(query){
      const url = `https://restcountries.com/v2/name/${query}`;

      return fetch(url)
      .then(r => r.json())
      .then(data => data);
  }
 
  get query() {
    return  this.searchQuery
  }

  set query(newQuery){
      this.searchQuery = newQuery
  
  }
}
import axios from "axios";

interface Country {
   id:      number;
   name:    string;
   region:  string;
   country: string;
}

const FetchCountries = async (country: string): Promise<Country[]> => {
   try {
      const resp = await axios.request({
         method: 'GET',
         url: `http://api.weatherapi.com/v1/search.json?key=${ process.env.EXPO_PUBLIC_WEATHER_API_KEY }&q=${ country }`
      });
      return resp.data as Country[];
   } catch (err) {
      return [];
   }
}

export { 
   Country, 
   FetchCountries 
};
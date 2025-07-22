import axios from 'axios';

const API_BASE_URL = 'https://api.dataforseo.com/v3';
const USERNAME = 'shawn@shawnryder.com';
const PASSWORD = 'e9a6c54c89c45c74';

class DataForSeoAPI {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      auth: {
        username: USERNAME,
        password: PASSWORD
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Get keyword suggestions for local SEO
  async getKeywordSuggestions(keyword, location = 'United States') {
    try {
      const response = await this.client.post('/keywords_data/google_ads/keywords_for_keywords/live', [{
        keywords: [keyword],
        location_name: location,
        language_name: 'English'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching keyword suggestions:', error);
      throw error;
    }
  }

  // Get local pack rankings
  async getLocalPackRankings(keyword, location) {
    try {
      const response = await this.client.post('/serp/google/organic/live/regular', [{
        keyword: keyword,
        location_name: location,
        language_name: 'English',
        device: 'desktop',
        os: 'windows'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching local pack rankings:', error);
      throw error;
    }
  }

  // Get competitor analysis
  async getCompetitorAnalysis(domain) {
    try {
      const response = await this.client.post('/dataforseo_labs/google/domain_rank_overview/live', [{
        target: domain,
        location_name: 'United States',
        language_name: 'English'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching competitor analysis:', error);
      throw error;
    }
  }

  // Get keyword difficulty
  async getKeywordDifficulty(keywords) {
    try {
      const response = await this.client.post('/keywords_data/google_ads/search_volume/live', [{
        keywords: keywords,
        location_name: 'United States',
        language_name: 'English'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching keyword difficulty:', error);
      throw error;
    }
  }

  // Get local business listings
  async getLocalBusinessListings(keyword, location) {
    try {
      const response = await this.client.post('/business_data/google/my_business/find/live', [{
        keyword: keyword,
        location_name: location,
        language_name: 'English'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching local business listings:', error);
      throw error;
    }
  }

  // Site audit
  async getSiteAudit(domain) {
    try {
      const response = await this.client.post('/on_page/lighthouse/live', [{
        url: `https://${domain}`,
        device: 'desktop'
      }]);
      return response.data;
    } catch (error) {
      console.error('Error fetching site audit:', error);
      throw error;
    }
  }
}

export default new DataForSeoAPI();
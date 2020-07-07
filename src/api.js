import axios from 'axios'

var api_key = "RGAPI-1025294b-5ba1-4def-a7cf-e697794daad5"

export default {
  getSummonerInfo (summonerName) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + api_key
    })
  },

  getSummonerMatches (accountId) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountId + '?api_key=' + api_key
    })
  },

  getMatch(matchId) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/' + matchId + '?api_key=' + api_key
    })
  }
}

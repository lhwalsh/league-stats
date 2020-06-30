import axios from 'axios'

export default {
  getSummonerInfo (summonerName) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=RGAPI-038eaa59-ac10-4b7c-8b56-56c5ebbac9cd'
    })
  },

  getSummonerMatches (accountId) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountId + '?api_key=RGAPI-038eaa59-ac10-4b7c-8b56-56c5ebbac9cd'
    })
  },

  getMatch(matchId) {
    return axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/' + matchId + '?api_key=RGAPI-038eaa59-ac10-4b7c-8b56-56c5ebbac9cd'
    })
  }
}

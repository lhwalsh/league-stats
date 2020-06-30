<template>
  <div class="MainClass">
    <form v-on:submit.prevent="getSummonerStats">
      <input type="text" v-model="summonerName">
      <input type="text" v-model="partnerSummonerName">
      <input type="text" v-model="numMatches">
      <button type="submit">Search</button>
    </form>
    <div v-if="loaded">
      <h5>Total Games: {{summonerMatches.length}}</h5>
      <h5>Duo Games: {{duoMatches.length}}</h5>
      <h5>Solo Games: {{soloMatches.length}}</h5>
      <h5>{{summonerName}} Solo: {{findAverage(soloSummonerStats.kills) + "/" + findAverage(soloSummonerStats.deaths) + "/" + findAverage(soloSummonerStats.assists)}}</h5>
      <h5>{{summonerName}} with {{partnerSummonerName}}: {{findAverage(duoSummonerStats.kills) + "/" + findAverage(duoSummonerStats.deaths) + "/" + findAverage(duoSummonerStats.assists)}}</h5>
      <h5>{{partnerSummonerName}} with {{summonerName}}: {{findAverage(duoPartnerStats.kills) + "/" + findAverage(duoPartnerStats.deaths) + "/" + findAverage(duoPartnerStats.assists)}}</h5>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      summonerName: 'JayLenoIsDaHomie',
      partnerSummonerName: 'Kevin246',
      numMatches: 1,
      summonerMatches: [],
      soloMatches: [],
      duoMatches: [],
      loaded: false,
      soloSummonerStats: {
        kills: [],
        deaths: [],
        assists: [],
        won: []
      },
      duoSummonerStats: {
        kills: [],
        deaths: [],
        assists: [],
        won: []
      },
      duoPartnerStats: {
        kills: [],
        deaths: [],
        assists: [],
        won: []
      }
    }
  },
  methods: {
    getSummonerStats: function () {
      api.getSummonerInfo(this.summonerName).then(response => this.getSummonerMatches(response.data.accountId))
    },

    getSummonerMatches: function (accountId) {
      api.getSummonerMatches(accountId).then(response => this.getMatches(response.data.matches))
    },

    getMatches: function (matches) {
      for (let index = 0; index < this.numMatches; index++) {
        api.getMatch(matches[index].gameId).then(match => this.addMatch(match, index))
      }
    },

    findSoloMatches: function () {
      this.soloMatches = this.summonerMatches.filter(match => !this.duoMatches.some(duoMatch => duoMatch.gameId === match.gameId))
    },

    findDuoMatches: function () {
      this.duoMatches = this.summonerMatches.filter(match => match.participantIdentities.find(participant => participant.player.summonerName === this.partnerSummonerName))
    },

    addMatch: function (match, index) {
      this.summonerMatches.push(match.data)

      if (index >= this.numMatches - 1) {
        this.findDuoMatches()
        this.findSoloMatches()
        this.setStatsForAllMatches()
        this.loaded = true
      }
    },

    findParticipantId: function (name, match) {
      let participantIdentity = match.participantIdentities.find(participant => participant.player.summonerName === name)
      if (typeof participantIdentity != "undefined") {
        return participantIdentity.participantId
      }
    },

    findPlayer: function (name, match) {
      let participantId = this.findParticipantId(name, match)
      return match.participants.find(participant => participant.participantId === participantId)
    },

    setStatsForAllMatches: function () {
      this.summonerMatches.forEach(this.setStats)
    },

    setStats: function (match) {
      let summoner = this.findPlayer(this.summonerName, match).stats
      let partner = this.findPlayer(this.partnerSummonerName, match)
      let summonerStats = summoner.stats
      let partnerStats;

      if (partner) { partnerStats = partner.stats }

      if (partnerStats) {
        this.duoSummonerStats.kills.push(summonerStats.kills)
        this.duoSummonerStats.deaths.push(summonerStats.deaths)
        this.duoSummonerStats.assists.push(summonerStats.assists)

        this.duoPartnerStats.kills.push(partnerStats.kills)
        this.duoPartnerStats.deaths.push(partnerStats.deaths)
        this.duoPartnerStats.assists.push(partnerStats.assists)
      }
      else {
        this.soloSummonerStats.kills.push(summonerStats.kills)
        this.soloSummonerStats.deaths.push(summonerStats.deaths)
        this.soloSummonerStats.assists.push(summonerStats.assists)
      }
    },

    findAverage: function (stats) {
      let average = stats.reduce((a, b) => a + b, 0) / stats.length
      if (isNaN(average)) {
        return "?"
      } else {
        return Math.round(average * 10) / 10
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

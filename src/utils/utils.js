export const fetchBaseBallData = () => {
  return fetch('http://lookup-service-prod.mlb.com/json/named.leader_hitting_repeater.bam?sport_code=\'mlb\'&results=20&game_type=\'R\'&season=\'2017\'&sort_column=\'avg\'')
    .then(res => res.json())
    .then(data => data
      .leader_hitting_repeater
      .leader_hitting_mux
      .queryResults.row.map(player => ({
        avg: player.avg,
        playerName: player.name_display_first_last
      })));
};

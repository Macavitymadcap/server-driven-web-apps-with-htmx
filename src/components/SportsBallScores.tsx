interface SportsBallScoresProps {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

export const SportsBallScores = ({
  team1,
  team2,
  score1,
  score2,
}: SportsBallScoresProps) => {
  return (
    <>
      <label>{team1}: </label>
      <output>{score1}</output>
      <label>{team2}: </label>
      <output>{score2}</output>
    </>
  );
};

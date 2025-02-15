export class SportsballService {
  private _team1HasBall = true;
  private _team1: string;
  private _team2: string;
  private _score1 = 0;
  private _score2 = 0;

  constructor(team1: string, team2: string) {
    this._team1 = team1;
    this._team2 = team2;
  }

  get team1() {
    return this._team1;
  }

  set team1(team1: string) {
    this._team1 = team1;
  }

  get score1() {
    return this._score1;
  }

  get score2() {
    return this._score2;
  }

  get team2() {
    return this._team2;
  }

  set team2(team2: string) {
    this._team2 = team2;
  }

  private getPoints() {
    const number = Math.floor(Math.random() * 10);
    const touchdown = 7;
    const fieldGoal = 3;

    return number >= 8 ? touchdown : number >= 5 ? fieldGoal : 0;
  }

  getScore() {
    if (this._team1HasBall) {
      this._score1 += this.getPoints();
    } else {
      this._score2 += this.getPoints();
    }

    this._team1HasBall = !this._team1HasBall;
  }
}

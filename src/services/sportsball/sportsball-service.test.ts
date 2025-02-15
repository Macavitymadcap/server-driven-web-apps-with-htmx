import { beforeEach, expect, test, describe } from 'bun:test';
import { SportsballService } from './sportsball-service';

describe('SportsballService', () => {
  const team1 = 'Team A';
  const team2 = 'Team B';
  let sportsballService: SportsballService;

  beforeEach(() => {
    sportsballService = new SportsballService(team1, team2);
  });

  describe('constructor', () => {
    test('should initialize with given team names and scores set to 0', () => {
      expect(sportsballService.team1).toBe(team1);
      expect(sportsballService.team2).toBe(team2);
      expect(sportsballService.score1).toBe(0);
      expect(sportsballService.score2).toBe(0);
    });
  });

  describe('getters and setters', () => {
    test('should get and set team1 name', () => {
      const newTeam1 = 'New Team A';
      sportsballService.team1 = newTeam1;
      expect(sportsballService.team1).toBe(newTeam1);
    });

    test('should get and set team2 name', () => {
      const newTeam2 = 'New Team B';
      sportsballService.team2 = newTeam2;
      expect(sportsballService.team2).toBe(newTeam2);
    });
  });

  describe('getScore', () => {
    test('should update score1 when team1 has the ball', () => {
      sportsballService.getScore();
      expect(sportsballService.score1).toBeGreaterThanOrEqual(0);
      expect(sportsballService.score1).toBeLessThanOrEqual(7);
      expect(sportsballService.score2).toBe(0);
    });

    test('should update score2 when team2 has the ball', () => {
      sportsballService.getScore(); // team1 scores
      sportsballService.getScore(); // team2 scores
      expect(sportsballService.score2).toBeGreaterThanOrEqual(0);
      expect(sportsballService.score2).toBeLessThanOrEqual(7);
    });

    test('should alternate ball possession between teams', () => {
      const initialTeam1HasBall = sportsballService['_team1HasBall'];
      sportsballService.getScore();
      expect(sportsballService['_team1HasBall']).toBe(!initialTeam1HasBall);
      sportsballService.getScore();
      expect(sportsballService['_team1HasBall']).toBe(initialTeam1HasBall);
    });
  });
});

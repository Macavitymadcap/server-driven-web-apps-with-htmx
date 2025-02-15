import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { ConditionRepository } from './conditions-repository';

describe('ConditionRepository', () => {
  let repository: ConditionRepository;

  beforeEach(() => {
    repository = new ConditionRepository(':memory:');
  });

  afterEach(() => {
    repository.close();
  });

  test('should create a new condition', () => {
    const id = repository.create({ name: 'Test Condition' });
    const condition = repository.read(id);
    expect(condition).toEqual({ id, name: 'Test Condition' });
  });

  test('should read a condition by id', () => {
    const id = repository.create({ name: 'Read Condition' });
    const condition = repository.read(id);
    expect(condition).toEqual({ id, name: 'Read Condition' });
  });

  test('should read all conditions', () => {
    const conditions = repository.readAll();
    expect(conditions.length).toBeGreaterThan(0);
  });

  test('should update a condition', () => {
    const id = repository.create({ name: 'Update Condition' });
    repository.update({ id, name: 'Updated Condition' });
    const updatedCondition = repository.read(id);
    expect(updatedCondition).toEqual({ id, name: 'Updated Condition' });
  });

  test('should delete a condition', () => {
    const id = repository.create({ name: 'Delete Condition' });
    repository.delete(id);
    const condition = repository.read(id);
    expect(condition).toBeNull();
  });

  test('should insert initial data', () => {
    const conditions = repository.readAll();
    expect(conditions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Blinded' }),
        expect.objectContaining({ name: 'Charmed' }),
        expect.objectContaining({ name: 'Deafened' }),
        expect.objectContaining({ name: 'Frightened' }),
        expect.objectContaining({ name: 'Grappled' }),
        expect.objectContaining({ name: 'Incapacitated' }),
        expect.objectContaining({ name: 'Invisible' }),
        expect.objectContaining({ name: 'Paralyzed' }),
        expect.objectContaining({ name: 'Petrified' }),
        expect.objectContaining({ name: 'Poisoned' }),
        expect.objectContaining({ name: 'Prone' }),
        expect.objectContaining({ name: 'Restrained' }),
        expect.objectContaining({ name: 'Stunned' }),
        expect.objectContaining({ name: 'Unconscious' }),
      ]),
    );
  });
});

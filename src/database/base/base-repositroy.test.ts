// base-repository.test.ts
import { expect, test, describe, beforeEach, afterEach } from 'bun:test';
import { BaseRepository, BaseEntity } from './base-repository';

// Create a simple entity for testing
interface TestEntity extends BaseEntity {
  name: string;
  value: number;
}

// Concrete implementation of BaseRepository for testing
class TestRepository extends BaseRepository<TestEntity> {
  protected initDb(): void {
    this.createTables();
    this.insertInitialData();
  }

  protected createTables(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS test_entities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        value INTEGER NOT NULL
      );
    `);
  }

  protected insertInitialData(): void {
    // No initial data for test repository
  }

  create(entity: Omit<TestEntity, 'id'>): string {
    return this.executeInTransaction(() => {
      const id = crypto.randomUUID();
      this.prepareAndExecuteOne(
        'INSERT INTO test_entities (id, name, value) VALUES ($id, $name, $value)',
        { $id: id, $name: entity.name, $value: entity.value },
      );
      return id;
    });
  }

  read(id: string): TestEntity | null {
    return this.prepareAndExecuteOne(
      'SELECT * FROM test_entities WHERE id = $id',
      { $id: id },
    ) as TestEntity | null;
  }

  readAll(): TestEntity[] {
    return this.prepareAndExecute(
      'SELECT * FROM test_entities',
    ) as TestEntity[];
  }

  update(entity: TestEntity): void {
    this.executeInTransaction(() => {
      this.prepareAndExecuteOne(
        'UPDATE test_entities SET name = $name, value = $value WHERE id = $id',
        { $id: entity.id, $name: entity.name, $value: entity.value },
      );
    });
  }

  delete(id: string): void {
    this.executeInTransaction(() => {
      this.prepareAndExecuteOne('DELETE FROM test_entities WHERE id = $id', {
        $id: id,
      });
    });
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;

  beforeEach(() => {
    repository = new TestRepository(':memory:');
  });

  afterEach(() => {
    repository.close();
  });

  test('should create and read an entity', () => {
    const id = repository.create({ name: 'Test', value: 42 });
    const entity = repository.read(id);

    expect(entity).toBeDefined();
    expect(entity?.id).toBe(id);
    expect(entity?.name).toBe('Test');
    expect(entity?.value).toBe(42);
  });

  test('should read all entities', () => {
    repository.create({ name: 'Test 1', value: 1 });
    repository.create({ name: 'Test 2', value: 2 });

    const entities = repository.readAll();
    expect(entities.length).toBe(2);
  });

  test('should update an entity', () => {
    const id = repository.create({ name: 'Test', value: 42 });
    const entity = repository.read(id)!;

    repository.update({ ...entity, name: 'Updated', value: 100 });
    const updated = repository.read(id);

    expect(updated?.name).toBe('Updated');
    expect(updated?.value).toBe(100);
  });

  test('should delete an entity', () => {
    const id = repository.create({ name: 'Test', value: 42 });
    repository.delete(id);
    const entity = repository.read(id);

    expect(entity).toBeNull();
  });
});

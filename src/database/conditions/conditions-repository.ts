import { BaseEntity, BaseRepository } from '../base/base-repository';

interface ConditionEntity extends BaseEntity {
  name: string;
}

const initialConditions = [
  'Blinded',
  'Charmed',
  'Deafened',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralyzed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconscious',
];

export class ConditionRepository extends BaseRepository<ConditionEntity> {
  protected initDb(): void {
    this.createTables();
    this.insertInitialData();
  }

  protected createTables(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS conditions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);
  }

  protected insertInitialData(): void {
    initialConditions.forEach(condition => {
      const existingCondition = this.prepareAndExecuteOne(
        'SELECT * FROM conditions WHERE name = $name',
        { $name: condition },
      );
      if (!existingCondition) {
        this.create({ name: condition });
      }
    });
  }

  create(entity: Omit<ConditionEntity, 'id'>): string {
    return this.executeInTransaction(() => {
      const id = crypto.randomUUID();
      this.prepareAndExecuteOne(
        'INSERT INTO conditions (id, name) VALUES ($id, $name)',
        { $id: id, $name: entity.name },
      );
      return id;
    });
  }

  read(id: string): ConditionEntity | null {
    return this.prepareAndExecuteOne(
      'SELECT * FROM conditions WHERE id = $id',
      { $id: id },
    ) as ConditionEntity | null;
  }

  readAll(): ConditionEntity[] {
    return this.prepareAndExecute(
      'SELECT * FROM conditions',
    ) as ConditionEntity[];
  }

  update(entity: ConditionEntity): void {
    this.executeInTransaction(() => {
      this.prepareAndExecuteOne(
        'UPDATE conditions SET name = $name WHERE id = $id',
        { $id: entity.id, $name: entity.name },
      );
    });
  }

  delete(id: string): void {
    this.executeInTransaction(() => {
      this.prepareAndExecuteOne('DELETE FROM conditions WHERE id = $id', {
        $id: id,
      });
    });
  }
}

import { DbQueryFilter, DefaultRecord } from "../utils/db-query-filter";

export abstract class IRepository<Entity, EntityCreate, EntityUpdate> {
  abstract index({ select, include, orderBy, where, skip, take }: DbQueryFilter<Entity>): Promise<{ count: number, rows: Entity[] }>;
  abstract create(data: EntityCreate, include?: DefaultRecord<Entity, boolean | Object>): Promise<Entity | null>;
  abstract show(id: string, include?: DefaultRecord<Entity, boolean>): Promise<Entity>;
  abstract update(id: string, data: EntityUpdate): Promise<Entity>;
  abstract delete(id: string): Promise<void>;
}
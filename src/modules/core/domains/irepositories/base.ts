import { GetClauses } from '@root/modules/core/data/datasources/base'
import BaseEntity from '@root/modules/core/domains/entities/base'

export default interface IBaseRepository<Entity extends BaseEntity> {
    add?: (data: Entity) => Promise<string | Entity>,
    find?: (id: string) => Promise<BaseEntity | undefined>
    get?: (conditions?: GetClauses) => Promise<Entity[]>
    update?: (data: BaseEntity) => Promise<Entity>
}

import BaseRepository from '@data/repositories/base'
import { CourseFromModel, CourseToModel } from '@data/models/courses'
import CourseEntity from '@root/domains/entities/courses'

export default class CoursesRepository extends BaseRepository<CourseEntity, CourseFromModel, CourseToModel>{
    protected readonly collectionName = 'courses'
}

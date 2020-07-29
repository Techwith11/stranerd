import BaseRepository from '@data/repositories/base'
import CourseModel from '@data/models/courses'
import CourseEntity from '@root/domains/entities/courses'

export default class CoursesRepository extends BaseRepository<CourseEntity, CourseModel>{
    protected readonly collectionName = 'courses'
}

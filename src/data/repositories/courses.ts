import BaseRepository from '@data/repositories/base'
import CourseModel from '@data/models/courses'

export default class CoursesRepository extends BaseRepository<CourseModel>{
    protected readonly collectionName = 'courses'
}

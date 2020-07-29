import Bottle from 'bottlejs'
import FirestoreDataSource from '@data/datasources/firestore'
import UserTransformer from '@data/transformers/users'
import { CourseTransformer } from '@data/transformers/courses'
import PostTransformer from '@data/transformers/posts'
import SessionTransformer from '@data/transformers/sessions'
import PostsRepository from '@data/repositories/posts'
import CoursesRepository from '@data/repositories/courses'
import SessionsRepository from '@data/repositories/sessions'
import UsersRepository from '@data/repositories/users'

const bottle = new Bottle()

bottle.service('DataSource', FirestoreDataSource)

bottle.service('Transformer.Courses', CourseTransformer)
bottle.service('Transformer.Posts', PostTransformer)
bottle.service('Transformer.Sessions', SessionTransformer)
bottle.service('Transformer.Users', UserTransformer)

bottle.service('Repositories.Courses', CoursesRepository, 'DataSource', 'Transformer.Courses')
bottle.service('Repositories.Posts', PostsRepository,'DataSource','Transformer.Posts')
bottle.service('Repositories.Sessions', SessionsRepository,'DataSource','Transformer.Sessions')
bottle.service('Repositories.Users', UsersRepository,'DataSource','Transformer.Users')

const { Courses, Posts, Sessions, Users } = bottle.container.Repositories

export const CoursesRepo = Courses as CoursesRepository
export const PostsRepo = Posts as PostsRepository
export const SessionsRepo = Sessions as SessionsRepository
export const UsersRepo = Users as UsersRepository

import { Module } from '@root/modules/courses/domain/entities/subject'

export interface SubjectFromModel {
	id: string
	name: string
	modules: Module[]
}

export interface SubjectToModel {
	name: string
	modules: Module[]
}

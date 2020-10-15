import { Module } from '@modules/courses/domain/entities/subject'
import { Media } from '@modules/core/data/models/base'

export interface SubjectFromModel {
	id: string
	name: string
	image: Media
	modules: Module[]
}

export interface SubjectToModel {
	name: string
	image: Media
	modules: Module[]
}

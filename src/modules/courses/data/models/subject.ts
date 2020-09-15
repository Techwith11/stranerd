import { Module } from '@root/modules/courses/domain/entities/subject'
import { Media } from '@root/modules/core/data/models/base'

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

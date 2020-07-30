import BaseEntity from '@root/domains/entities/base'

export default class SessionEntity extends BaseEntity {
    public readonly id: string
    public readonly student: string
    public readonly tutor: string
    public readonly duration: number
    public readonly accepted: boolean
    public readonly tutorCancelled: boolean
    public readonly studentCancelled: boolean
    public readonly createdAt: Date
    public readonly endedAt: Date

    constructor({
        id, student, tutor, duration, accepted, tutorCancelled, studentCancelled, createdAt, endedAt
    }:{
        id: string, tutor: string, student: string, duration: number, accepted: boolean,
        tutorCancelled: boolean, studentCancelled: boolean, createdAt: Date, endedAt: Date
    }) {
        super();
        this.id = id
        this.tutor = tutor
        this.student = student
        this.duration = duration
        this.accepted = accepted
        this.tutorCancelled = tutorCancelled
        this.studentCancelled = studentCancelled
        this.createdAt = createdAt
        if(!endedAt){
            endedAt = new Date(createdAt.getTime())
            endedAt.setMinutes(endedAt.getMinutes() + (duration * 60))
        }
        this.endedAt = endedAt
    }
}

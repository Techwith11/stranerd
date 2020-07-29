import BaseModel  from '@data/models/base'
import CourseEntity from '@root/domains/entities/users'

export interface CourseModelI {  }

export class CourseModel extends CourseEntity implements BaseModel<CourseEntity, CourseModelI> {
    static fromJSON(json: CourseModelI) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}

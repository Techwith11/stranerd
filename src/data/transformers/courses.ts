import BaseTransformer from '@data/transformers/base'
import CourseEntity from '@root/domains/entities/courses'
import CourseModel from '@data/models/courses'

export class CourseTransformer implements BaseTransformer<CourseEntity, CourseModel> {
    public fromJSON(model: CourseModel) {
        return {  };
    }

    public toJSON() {
        return {  };
    }

}

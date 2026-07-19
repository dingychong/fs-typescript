export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface coursePartWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends coursePartWithDescription{
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends coursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends coursePartWithDescription {
    requirements: string[];
    kind: "special"
}
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

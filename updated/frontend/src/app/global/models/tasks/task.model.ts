export class TaskModel {

  public _id!: string;
  public title!: string;
  public description!: string;
  public createdAt!: Date;
  constructor(model?: any) {
    Object.assign(this, model);
  }

}

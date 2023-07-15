import { Task } from "./task.model";

export class Functionality {
  id: number | undefined;
  name: string | undefined;
  tasks: Task[] | undefined;
  noOfTasks: number = 0;
}

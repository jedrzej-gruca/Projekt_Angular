import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { Functionality } from '../models/functionality.model';

@Component({
  selector: 'app-task-kanban',
  templateUrl: './task-kanban.component.html',
  styleUrls: ['./task-kanban.component.scss']
})

export class TaskKanbanComponent {
  tasks: Task[] = [];
  functionalities: Functionality[] = [];
  selectedFunctionalityId: number | null = null;
  selectedTask: Task | null = null;
  filteredTasks: Task[] = [];
  selectedTaskName: string = '';
  selectedTaskStatus: string = '';



  constructor(private route: ActivatedRoute, private router: Router) {
    const savedTasks = localStorage.getItem('tasks');
    console.log(savedTasks)
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {
      this.tasks = [];
    }

    const savedFunctionalities = localStorage.getItem('functionalities');
    if (savedFunctionalities) {
      this.functionalities = JSON.parse(savedFunctionalities);
    } else {
      this.functionalities = [];
    }

    this.route.paramMap.subscribe(params => {
      const functionalityId = Number(params.get('functionalityId'));
      this.selectedFunctionalityId = functionalityId;
      this.filterTasksByFunctionality();
    });
    console.log(this.selectedFunctionalityId);
  }

  goBack() {
    this.router.navigate(['/functionalities']);
  }

  filterTasksByFunctionality(status?: string): Task[] {
    if (this.selectedFunctionalityId !== null) {
      this.filteredTasks = this.tasks.filter(task => task.functionalityId === this.selectedFunctionalityId);
      return this.filteredTasks = this.filteredTasks.filter(task => task.status === status);
    } else {
      return this.filteredTasks = this.tasks;
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  saveFunctionalitiesToLocalStorage() {
    localStorage.setItem('functionalities', JSON.stringify(this.functionalities));
  }

  onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer?.setData('task', JSON.stringify(task));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('task');
    if (taskData) {
      const task: Task = JSON.parse(taskData);
      const oldStatus = task.status;
      if (oldStatus !== status) {
        this.updateTaskStatus(task, status);
        this.saveTasksToLocalStorage();
        this.filterTasksByFunctionality();
      }
    }
  }

  updateTaskStatus(task: Task, newStatus: string) {
    const oldStatus = task.status;

    // If the status remains the same, no need to update
    if (oldStatus === newStatus) {
      return;
    }

    // Remove the task from the old status column
    const oldStatusTasks = this.getTasksByFunctionalityAndStatus(task.functionalityId || undefined, oldStatus);
    const oldIndex = oldStatusTasks.findIndex(t => t.id === task.id);
    if (oldIndex !== -1) {
      oldStatusTasks.splice(oldIndex, 1);
    }

    // Update the task status and add it to the new status column
    task.status = newStatus;
    const newStatusTasks = this.getTasksByFunctionalityAndStatus(task.functionalityId || undefined, newStatus);
    newStatusTasks.push(task);

    // Update the task in the tasks array
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].status = newStatus;
    }
  }

  getTasksByFunctionalityAndStatus(functionalityId: number | undefined, status?: string): Task[] {
    if (functionalityId !== null) {
      const functionality = this.functionalities.find(f => f.id === functionalityId);
      return functionality?.tasks?.filter(task => task.status === status) || [];
    } else {
      return this.tasks.filter(task => task.status === status);
    }
  }

  createTask(functionalityId?: number) {
    const newId = this.tasks.length + 1;
    const newTask: Task = {
      id: newId,
      name: '',
      status: 'todo',
      functionalityId: functionalityId || null
    };

      this.tasks.push(newTask);

      if (functionalityId) {
        const functionality = this.functionalities.find(f => f.id === functionalityId);
        if (functionality) {
          functionality.tasks = functionality.tasks || [];
          functionality.tasks.push(newTask); // Add the new task to functionality tasks
          const index = this.functionalities.findIndex(f => f.id === functionalityId);
          if (index !== -1) {
            this.functionalities[index].noOfTasks += 1;
          }
        }
      }
      this.saveFunctionalitiesToLocalStorage();
      this.saveTasksToLocalStorage();
  }


  deleteTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      const functionalityId = task.functionalityId;
      if (task.functionalityId !== null) {
        const functionality = this.functionalities.find(f => f.id === task.functionalityId);
        if (functionality && functionality.tasks) {
          const taskIndex = functionality.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {

            functionality.tasks.splice(taskIndex, 1); // Remove the task from functionality tasks
          }
        }
        const index = this.functionalities.findIndex(f => f.id === functionalityId);
        if (index !== -1) {
          this.functionalities[index].noOfTasks -= 1;
        }
      }
      this.saveFunctionalitiesToLocalStorage();
      this.saveTasksToLocalStorage();
    }
  }



  editTask(task: Task) {
    this.selectedTask = task;
  }

  saveTask() {
    if (this.selectedTask) {
      const index = this.tasks.findIndex(t => t.id === this.selectedTask?.id);
      if (index !== -1) {
        // Update the task details with the edited values
        this.tasks[index].name = this.selectedTaskName;
        this.tasks[index].status = this.selectedTaskStatus;

        // If the task is associated with a functionality, update the corresponding functionalities task as well
        if (this.selectedTask.functionalityId !== null) {
          const functionality = this.functionalities.find(f => f.id === this.selectedTask?.functionalityId);
          if (functionality && functionality.tasks) {
            const taskIndex = functionality.tasks.findIndex(t => t.id === this.selectedTask!.id);
            if (taskIndex !== -1) {
              functionality.tasks[taskIndex].name = this.selectedTaskName;
              functionality.tasks[taskIndex].status = this.selectedTaskStatus;
            }
          }
        }
        // Clear the selected task
        this.selectedTask = null;
        this.saveTasksToLocalStorage();
        this.saveFunctionalitiesToLocalStorage();
      }
    }
  }
}

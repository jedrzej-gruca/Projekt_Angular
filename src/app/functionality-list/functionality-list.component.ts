import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functionality } from '../models/functionality.model';
import {Task} from "../models/task.model";

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss']
})
export class FunctionalityListComponent implements OnInit {
  functionalities: Functionality[] = [];
  tasks: Task[] = [];
  selectedFunctionality: Functionality | null = null;
  isNewFunctionality = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedFunctionalities = localStorage.getItem('functionalities');
    if (savedFunctionalities) {
      this.functionalities = JSON.parse(savedFunctionalities);
    }

    const savedTasks = localStorage.getItem('tasks');
    console.log(savedTasks)
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {
      this.tasks = [];
    }
  }

  saveFunctionalities() {
    localStorage.setItem('functionalities', JSON.stringify(this.functionalities));
  }

  createFunctionality() {
    this.selectedFunctionality = new Functionality();
    this.isNewFunctionality = true;
  }

  editFunctionality(functionality: Functionality) {
    this.selectedFunctionality = functionality;
    this.isNewFunctionality = false;
  }

  saveFunctionality() {
    if (this.selectedFunctionality) {
      if (this.isNewFunctionality) {
        const newId = Math.random()*10000000000000000;
        const newFunctionality: Functionality = {
          id: newId,
          name: this.selectedFunctionality.name || '',
          tasks: [],
          noOfTasks: 0
        };
        this.functionalities.push(newFunctionality);
      } else {
        const index = this.functionalities.findIndex(f => f.id === this.selectedFunctionality!.id);
        if (index !== -1) {
          this.functionalities[index].name = this.selectedFunctionality.name || '';
        }
      }

      this.saveFunctionalities();
      console.log(this.functionalities);
      this.selectedFunctionality = null;
      this.isNewFunctionality = false;
    }
  }

  deleteFunctionality(functionality: Functionality) {
    const index = this.functionalities.findIndex(f => f.id === functionality.id);
    if (index !== -1) {
      this.functionalities.splice(index, 1);

      // Update the number of tasks in the corresponding functionality
      const functionalityTasks = this.getTasksByFunctionality(functionality.id);
      if (functionalityTasks) {
        functionalityTasks.forEach(task => {
          const taskIndex = this.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
          }
        });
      }
      this.removeTasksByFunctionalityId(functionality.id);
      this.saveFunctionalities();
    }
  }

  getTasksByFunctionality(functionalityId: number | undefined): Task[] {
    if (functionalityId !== null) {
      return this.tasks.filter(task => task.functionalityId === functionalityId);
    } else {
      return this.tasks;
    }
  }

  navigateToKanban(functionalityId?: number) {
    if (functionalityId) {
      this.router.navigate(['/kanban', functionalityId]);
    }
  }

  removeTasksByFunctionalityId(functionalityId: number | undefined) {
    this.tasks = this.tasks.filter(task => task.functionalityId !== functionalityId);
    // Update tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

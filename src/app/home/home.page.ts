import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [
    {id : '1', task: 'Buy Milk', completed: false},
    {id : '2', task: 'Pick up laundry',completed:true},
    {id : '3', task: 'Learn Ionic', completed:false},
  ];

  constructor(private alertController: AlertController){}

  addTask(taskName:string) {
    const id = Math.random().toString();
    this.todos.push({
      id : id,
      task : taskName,
      completed : false,
    });
  }

  removeTask(id:string){
    this.todos = this.todos.filter(todo => todo.id !== id )
  }

  async showAddTaskAlert(){
    const alert = await this.alertController.create({
      header : 'New Task',
      inputs : [
        {
          name : 'task',
          type : 'text',
          placeholder : 'Task name'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Add',
          handler : data => {
            this.addTask(data.task)
          }
        }
      ]
    });
    await alert.present()
  }

}

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Todo } from '../todo.model';
import { getDatabase, ref, set, onValue } from 'firebase/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  todos: Todo[] = [
    {id : '1', task: 'Buy Milk', completed: false, dueDate : new Date(2023, 4, 18)},
    {id : '2', task: 'Pick up laundry',completed:false, dueDate :new Date(2023, 4, 10)},
    {id : '3', task: 'Learn Ionic', completed:false,dueDate : new Date(2023, 4, 17)},
  ];
  
  filter : 'all' | 'completed' | 'uncompleted' = 'uncompleted';
  todosRef: any;

  constructor(private alertController: AlertController){
    const db = getDatabase();
    this.todosRef = ref(db, 'todos');
    // Load todos from Firebase
    this.loadTodosFromFirebase();
  }

  loadTodosFromFirebase() {
    onValue(this.todosRef, (snapshot) => {
      this.todos = snapshot.val() || [];
    });
  }


  addTask(taskName:string,dueDate:Date) {
    const id = Math.random().toString();
    this.todos.push({
      id : id,
      task : taskName,
      completed : false,
      dueDate : dueDate,
    });
  }

  removeTask(id:string){
    this.todos = this.todos.filter(todo => todo.id !== id )
  }

  markAsDone(id:string){
    this.todos = this.todos.map(
      todo => {
        if (todo.id === id){
          return {...todo,
          completed : true
          };
        } else {
          return todo;
        }
      });
  }

  changeFilter(filter: 'all' | 'completed' | 'uncompleted'){
    this.filter = filter;
  }

  get filteredTodos() {
    this.todos.sort((a,b)=>a.dueDate.getTime()-b.dueDate.getTime());
    if (this.filter === 'completed') {
      return this.todos.filter(t => t.completed);
    } else if (this.filter === 'uncompleted') {
      return this.todos.filter(t => !t.completed);
    } else {
      return this.todos
    }
  }

  async showAddTaskAlert(){
    const alert = await this.alertController.create({
      header : 'New Task',
      inputs : [
        {
          name : 'task',
          type : 'text',
          placeholder : 'Task name'
        },
        {
          name : 'dueDate',
          type : 'date',
          placeholder : 'Due Date'
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
            console.log(typeof(data.dueDate))
            console.log(data.dueDate)
            this.addTask(data.task,new Date(data.dueDate.split('-')[0], data.dueDate.split('-')[1], data.dueDate.split('-')[2]))
          }
        }
      ]
    });
    await alert.present()
  }

}

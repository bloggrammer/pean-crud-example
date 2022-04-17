import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
export class Item {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public tag: string,
    public dueDate: Date
  ) {
  }
}
@Component({
  selector: 'app-board-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  content = '';
  bForm!: FormGroup;
  title?: string;
  description?: string;
  tag?: string;
  dueDate?: Date;
  errorMessage = '';
  items!: Item[] ;
  tags = ['High', 'Medium', 'Low'];
  selectedTag?: string;
  constructor(private fb: FormBuilder,  private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.createForm();
  }
  createForm() {
    this.bForm = this.fb.group({
      title: ['', Validators.required ],
      tag: ['', Validators.required ],
      description: ['', Validators.required ],
      dueDate: ['', Validators.required ]
    });
  }
  ngOnInit() {
    this.userService.getItems().subscribe(
      data => {
        this.items = data;
        console.log(this.items);
      },
      err => {
        // this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(data: { title: any; description: any; tag: any; dueDate: any}) {
    const arg = {
      title: data.title,
      description: data.description,
      tag: this.selectedTag,
      dueDate: data.dueDate,
    }
    this.userService.postItems(arg).subscribe(
      data => {
        const arg = {
          id: data.id,
          title: data.title,
          description: data.description,
          tag: data.tag,
          dueDate: data.dueDate,
        } as Item;
        this.items.push(arg)
        
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }
  deleteItem(id: number){
    this.userService.deleteItem(id).subscribe(
      data => {
        for(let i = 0; i < this.items.length; ++i){
          if (this.items[i].id === id) {
              this.items.splice(i,1);
          }
      }
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
}
public selectCategory(event: Event): any {
  this.selectedTag = (event.target as HTMLInputElement).value;
}
  logout() {
   this.tokenStorageService.signOut();
   window.location.href ="/login";
  }
}
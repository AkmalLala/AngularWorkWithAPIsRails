import { Component, OnInit, Input, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AuthorsService } from '../authors.service';

import { Author } from '../author';
@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  @Input() oneAuthor: Author;
  editAuthorForm: FormGroup;

  constructor(private http: Http, private formBuilder: FormBuilder, private AuthorsService: AuthorsService) { }

  ngOnChanges() {
    this.editAuthorForm = this.formBuilder.group({
      id: [this.oneAuthor ? this.oneAuthor.id : null, Validators.required],
      name: [this.oneAuthor ? this.oneAuthor.name : null, Validators.required],
      email: [this.oneAuthor ? this.oneAuthor.email : null, Validators.required]
    });
  }

  ngOnInit() {
  }
  
  private prepareSave(): any {
    let input = new FormData();
    input.append('author[name]', this.editAuthorForm.get('name').value);
    input.append('author[email]', this.editAuthorForm.get('email').value);
    return input;
  }
  
  onSubmit = function () {
    const value = this.prepareSave();
    const id = this.editAuthorForm.get('id').value;
    this.AuthorsService.editAuthor(value,id).subscribe(res => console.log(res.json()));
    this.editAuthorForm.reset();
  }

}

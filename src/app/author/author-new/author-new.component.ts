import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-author-new',
  templateUrl: './author-new.component.html',
  styleUrls: ['./author-new.component.css']
})
export class AuthorNewComponent implements OnInit {
  newAuthorForm: FormGroup;

  constructor(private http: Http, private formBuilder: FormBuilder, private AuthorsService: AuthorsService) { }

  ngOnInit() {
    this.newAuthorForm = this.formBuilder.group({
        name: [null, Validators.required],
        email: [null, Validators.required],
    });
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('author[name]', this.newAuthorForm.get('name').value);
    input.append('author[email]', this.newAuthorForm.get('email').value);
    return input;
  }

  onSubmit = function () {
    const value = this.prepareSave();
    this.AuthorsService.addAuthor(value).subscribe(res => console.log(res.json()));
    this.newAuthorForm.reset();
  }

}

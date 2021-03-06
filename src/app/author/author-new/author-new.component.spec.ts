import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNewComponent } from './author-new.component';

describe('AuthorNewComponent', () => {
  let component: AuthorNewComponent;
  let fixture: ComponentFixture<AuthorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

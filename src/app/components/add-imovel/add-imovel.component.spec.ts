import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImovelComponent } from './add-imovel.component';

describe('AddImovelComponent', () => {
  let component: AddImovelComponent;
  let fixture: ComponentFixture<AddImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

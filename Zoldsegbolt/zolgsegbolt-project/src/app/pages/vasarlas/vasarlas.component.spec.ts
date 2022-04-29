import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VasarlasComponent } from './vasarlas.component';

describe('VasarlasComponent', () => {
  let component: VasarlasComponent;
  let fixture: ComponentFixture<VasarlasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VasarlasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VasarlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

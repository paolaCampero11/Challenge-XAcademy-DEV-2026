import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerChart } from './player-chart';

describe('PlayerChart', () => {
  let component: PlayerChart;
  let fixture: ComponentFixture<PlayerChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

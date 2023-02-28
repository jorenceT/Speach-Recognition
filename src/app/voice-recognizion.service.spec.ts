import { TestBed } from '@angular/core/testing';

import { VoiceRecognizionService } from './voice-recognizion.service';

describe('VoiceRecognizionService', () => {
  let service: VoiceRecognizionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceRecognizionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

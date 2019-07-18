import { TestBed } from '@angular/core/testing';

import { CommentaryService } from './commentary.service';

describe('CommentaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentaryService = TestBed.get(CommentaryService);
    expect(service).toBeTruthy();
  });
});

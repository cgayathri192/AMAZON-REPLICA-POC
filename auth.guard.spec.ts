import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { SellerService } from './services/seller.service';
describe('AuthGuard', () => {
  let guard: AuthGuard;
  
  const sellerServiceStub = {
    isSellerLoggedIn: true 
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: SellerService, useValue: sellerServiceStub }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if seller is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someValue');
    expect(guard.canActivate(null as any, null as any)).toBeTrue();
  });
  

  it('should return result from sellerService if seller is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    expect(guard.canActivate(null as any, null as any)).toBe(sellerServiceStub.isSellerLoggedIn);
  });


});

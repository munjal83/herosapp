import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Hero } from 'src/app/_models/hero';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { HeroesService } from 'src/app/_services/heroes.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styles: [],
})
export class HeroEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  hero: Hero;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    $event.returnValue = true;
  }

  constructor(
    private accountService: AccountService,
    private heroService: HeroesService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero() {
    this.heroService.getHero(this.user.username).subscribe((hero) => {
      this.hero = hero;
    });
  }

  updateHero() {
    this.heroService.updateHero(this.hero).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.hero);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { ActuService } from '../../service/actu.service';
import { CommentaryService } from '../../service/commentary.service';
import { Router } from '@angular/router';
import { Actu } from '../../class/actu';
import { Commentary } from '../../class/commentary';
import { OrderPipe } from 'ngx-order-pipe';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actu',
  templateUrl: './actu.component.html',
  styleUrls: ['./actu.component.scss']
})
export class ActuComponent implements OnInit {

  color = 'warn';
  diameter = 50;
  public isLoading = false;
  mode = 'indeterminate';
  actus: Actu[];
  order: 'id';
  loading: boolean;
  commentForm: FormGroup;
  public apiUrl = Globals.APP_API + 'actu';

  constructor(private actuService: ActuService,
              private router: Router,
              private orderPipe: OrderPipe,
              private auth: AuthService,
              private fb: FormBuilder,
              private commentService: CommentaryService) {}

  ngOnInit() {
    this.getAllActus();
    this.commentForm = this.fb.group({
      commentary: ['', Validators.required]
    });
  }

  publishComment(actu: Actu) {
    const val = this.commentForm.value;
    this.loading = true;
    this.actuService.publishComment(actu, val.commentary)
    .subscribe(() => {
      this.loading = false;
      this.commentForm.reset();
      this.getAllActus();
    });
  }

  deleteComment(commentary: Commentary) {
    this.commentService.deleteCommentary(commentary).subscribe(() => {
      this.getAllActus();
    });
  }

  toggleCommentBox(actu: Actu) {
    actu.boxComment = !actu.boxComment;
  }
  getAllActus(): void {
    this.isLoading = true;
    const currentUser = this.auth.currentUser;
    this.actuService.getAllActus().subscribe(data => {
      this.actus = data;
      this.isLoading = false;
      this.orderPipe.transform(this.actus, this.order, true, false);
      data.forEach((actu) => {
        console.log(actu);
        actu.lovedBy.forEach((element) => {
          console.log(element);
          const name = element['username'];
          if (name === currentUser.username) {
            actu.liked = true;
          }
        });
        actu.commentaries.forEach((commentary: Commentary) => {
          const user = commentary['user'];
          console.log(user);
          const username = user['username'];
          if (username === currentUser.username) {
            commentary.canDelete = true;
          }
        });
    });
    });
  }

  setLike(actu: Actu) {
    this.actuService.likeActu(actu).subscribe(data => {
      actu.liked = true;
      this.getAllActus();
    }, err => {
      console.log(err);
    });
  }

  setDislike(actu: Actu) {
    this.actuService.dislikeActu(actu).subscribe(data => {
      actu.liked = false;
      this.getAllActus();
    }, err => {
      console.log(err);
    });
  }
}


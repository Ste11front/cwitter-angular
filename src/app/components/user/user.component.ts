import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cwit } from 'src/app/model/cwit';
import { User } from 'firebase/auth';
import { OurUser } from 'src/app/model/our-user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  fireUser?: User;
  ourUser?: OurUser;

  userCwits: Cwit[] = [];

  constructor(private authServ: AuthService, private firestoreServ: FirestoreService){

    this.authServ.firebaseUser.subscribe(fUser => {
      if (fUser) {
        this.fireUser = fUser;
        //this.loadUserCwits(this.fireUser.uid)
      }
    })

    this.authServ.ourUser.subscribe(oUser => {
      if (oUser) {
        this.ourUser = oUser
      }
    })

  }


  // loadUserCwits(uid: string){
  //   this.firestoreServ.loadUserCwits(uid).then(cwits => this.userCwits = cwits)
  // }

}

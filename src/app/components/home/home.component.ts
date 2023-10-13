import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cwit } from 'src/app/model/cwit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  cwits: Cwit[] = [];

  constructor(private firestore: FirestoreService){}

  ngOnInit(): void {
    this.firestore.getCwits((data: any)=> {
      const newCwits = data.docs.map((doc: any) => {
          return {
            text: doc.data()['text'],
            url: doc.data()['url'],
            author: doc.data()['author'],
            authorName: doc.data()['authorName'],
            creationTime: doc.data()['creationTime'].toDate(),
          }
        });
      this.cwits = newCwits;
    })
    // .then(data => {
    //   console.log(data)
    //   this.cwits = data as Cwit[]
    // })
  }

}

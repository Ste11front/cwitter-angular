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
            creationTime: doc.data()['creationTime']?.toDate(),
          }
        });
      this.cwits = newCwits;
    })
    // .then(data => {
    //   console.log(data)
    //   this.cwits = data as Cwit[]
    // })

    // const text = 'ciao a tutti gli amici del club di #deltaplano di #genova'
    // const url = 'http://deltaplano-genova.org'

    // const newCwit = {
    //   text: text,
    //   url: url,
    //   author: firebaseUser.uid,
    //   authorName: ourUser.username,
    //   creationTime: new Date(),
    //   tags: parseForTags(text)
    // }
  }

  // parseForTags(text:string){
  //   const splitted = text.split(' ');
  //   const tags = splitted.filter(string => string[0] === '#')
  //   return tags;
  // }
}

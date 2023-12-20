import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.page.html',
  styleUrls: ['./films-list.page.scss'],
})
export class FilmsListPage implements OnInit {
  films = [
    { 
      id: 1,
      title: 'Film 1',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 2,
      title: 'Film 2',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 3,
      title: 'Film 3',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 4,
      title: 'Film 4',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}

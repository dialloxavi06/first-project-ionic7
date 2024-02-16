import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../article.service';
import { Chart } from 'chart.js';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  articleCount: number = 0 ;
  articles!: Product [];
@ViewChild('myChart') myChart: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement> ;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticleCount().subscribe(count => {
      this.articleCount = count;
      this.createChart();
    });
  }


  createChart() {
    new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Articles'],
        datasets: [{
          label: 'Nombre d\'articles',
          data: [this.articleCount],
          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

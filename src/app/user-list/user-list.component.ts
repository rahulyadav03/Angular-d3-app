import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as d3 from 'd3';
import { DataModel } from '../data/data.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export default class UserListComponent implements OnInit {
  @ViewChild('barChart', {static: true})
  private chartContainer: ElementRef;
  id: number;
  userDetail: any = [];
  alphabetCountArr: any = [];
  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  showChart: boolean = false;

  constructor(private route: ActivatedRoute, 
              private dataService: DataService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
   this.dataService.getSelectedUsers(this.id).subscribe((data) => {
      this.userDetail = data;
      this.totalCharacterCount(this.userDetail);
    });
  }


  totalCharacterCount(data){
    let charaterCount = {};
    let maxCount = 0;
    
    data.map((item) => {
      for(let i=0;i<item.title.length;i++){
        const char = item.title[i];

        charaterCount[char] = charaterCount[char] + 1 || 1;
        if(charaterCount[char] > maxCount){
          maxCount = charaterCount[char];
        }
      }
      for(let i=0;i<item.body.length;i++){
        const char = item.body[i];

        charaterCount[char] = charaterCount[char] + 1 || 1;
        if(charaterCount[char] > maxCount){
          maxCount = charaterCount[char];
        }
      }
    })
    for (var key in charaterCount) {
      if (charaterCount.hasOwnProperty(key)) {
          var a = {'letter':key,'frequency':charaterCount[key]};
          this.alphabetCountArr.push(a);
      }
    }
  }

  openBarChartModal() {
    this.showChart = !this.showChart;
    this.createChart(); 
  }


  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;

    //const data = this.alphabetCountArr;
    const data = [{"letter":"s","frequency":127},
    {"letter":"u","frequency":151},
    {"letter":"n","frequency":75},
    {"letter":"t","frequency":154},
    {"letter":" ","frequency":257},
    {"letter":"a","frequency":146},
    {"letter":"f","frequency":7},
    {"letter":"c","frequency":51},
    {"letter":"e","frequency":211},
    {"letter":"r","frequency":91},
    {"letter":"p","frequency":58},
    {"letter":"l","frequency":66},
    {"letter":"o","frequency":114},
    {"letter":"v","frequency":30},
    {"letter":"i","frequency":180},
    {"letter":"d","frequency":59},
    {"letter":"x","frequency":6},
    {"letter":"h","frequency":10},
    {"letter":"q","frequency":48},
    {"letter":"\n","frequency":30},
    {"letter":"m","frequency":91},
    {"letter":"b","frequency":12},
    {"letter":"g","frequency":9}];
    
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));
  }

}
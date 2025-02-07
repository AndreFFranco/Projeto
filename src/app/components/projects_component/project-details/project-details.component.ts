import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}

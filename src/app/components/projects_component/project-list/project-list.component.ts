import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/interfaces';
import { ApiService } from '../../../api-service/api-service.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() projectWasSelected = new EventEmitter<Project>();

  idProj: any;
  nameProj: any;
  issuesProj: any;
  starcountProj: any;
  pieChart: any = []
  barChart: any = []

  public projectList = [];
  subscription: Subscription;

  constructor(private apiService: ApiService) { Chart.register(...registerables) }

  ngOnInit() {
    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
          console.log(projectList);
          this.idProj = this.projectList.map((proj: any) => proj.id)
          this.nameProj = this.projectList.map((proj: any) => proj.name)
          this.issuesProj = this.projectList.map((proj: any) => proj.open_issues_count)
          this.starcountProj = this.projectList.map((proj: any) => proj.star_count)

          //PIE CHART

          this.pieChart = new Chart('piecanvas', {
            type: 'pie',
            data: {
              labels: this.nameProj,
              datasets: [
                {
                  label: 'IDs',
                  data: this.issuesProj,
                  borderWidth: 3,
                  backgroundColor: 'rgba(93, 175, 89, 0.1)',
                  borderColor: '#3e95cd',
                },
              ],
            },
          });

          //BAR CHART

          this.barChart = new Chart('barcanvas', {
            type: 'bar',
            data: {
              labels: this.nameProj,
              datasets: [
                {
                  label: 'StarCount',
                  data: this.starcountProj,
                  borderWidth: 3,
                  backgroundColor: 'rgba(93, 175, 89, 0.1)',
                  borderColor: '#3e95cd',
                },
              ],
            },
          });

        }
      );

  }

  onProjectSelected(project_item: Project) {
    this.projectWasSelected.emit(project_item);
  }

}

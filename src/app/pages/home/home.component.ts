import { DataApiService } from './../../services/http/data-api.service';
import { Component, OnInit, HostListener } from '@angular/core';
import {DownloadData} from '../../interfaces/resume.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  skills;
  featuredProjects;
  workExperience;
  profile;

  showMobileImages = false;

  constructor(
    public dataApi: DataApiService
  ) { }

  @HostListener('window:resize', ['$event'])
  onresize(event): void {
    console.log('WINDOW_RESIZE_EVENT', event);
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    window.innerWidth <= 768
      ? this.showMobileImages = true
      : this.showMobileImages = false;
  }

  async ngOnInit(): Promise<void> {
    this.checkWindowSize();


    this.skills = await this.dataApi.getTopSkills();
    console.log('SKILLS', this.skills);

    this.featuredProjects = await this.dataApi.getFeaturedProjects();
    console.log('PROJECTS', this.featuredProjects);

    this.workExperience = await this.dataApi.getWorkHistory();
    console.log('WORK', this.workExperience);


    this.profile = await this.dataApi.getProfile();
    console.log('PROFILE', this.profile);

  }
  // tslint:disable-next-line:typedef
  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  // tslint:disable-next-line:typedef
  onClickDownloadPdf(){
    const base64String = DownloadData.CV;
    this.downloadPdf(base64String, `${this.profile.name} _CV`.replace(/\s/g, ''));
  }

  // tslint:disable-next-line:typedef
  onClickDownloadDiplome(){
    const base64String = DownloadData.diplome;
    this.downloadPdf(base64String, `${this.profile.name} _Diplome`.replace(/\s/g, ''));
  }

  // tslint:disable-next-line:typedef
  onClickDownloadattestation(){
    const base64String = DownloadData.attestation;
    this.downloadPdf(base64String, `${this.profile.name} _Attestation`.replace(/\s/g, ''));
  }

}

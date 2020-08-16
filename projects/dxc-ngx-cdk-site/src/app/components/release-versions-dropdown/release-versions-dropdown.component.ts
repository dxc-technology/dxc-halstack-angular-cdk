import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
@Component({
  selector: 'app-release-versions-dropdown',
  templateUrl: './release-versions-dropdown.component.html',
  styleUrls: ['./release-versions-dropdown.component.scss']
})
export class ReleaseVersionsDropdownComponent implements OnInit {

  options: Array<any> = [];
  currentVersion;

  optionsWithoutIcon = [
    {
      value: 1,
      label: "Facebook"
    },
    {
      value: 2,
      label: "Twitter"
    },
    {
      value: 3,
      label: "Linkedin"
    }
  ];

  constructor(private http: HttpClient, @Inject(APP_BASE_HREF) public baseHref: string) { 
    console.log('getting json file');

    this.http.get<[]>('assets/versions.json').subscribe(resp => {
      this.options = resp.map((version)=>  { 
        return { value: version['version'], label: '' + version['version']  }
      } 
      );
      this.currentVersion = ''+ resp.filter( version => version['current'] === true )[0]['version'];
      console.log(this.currentVersion);
    },  
    err=> {
      console.log('An error has ocurred');
    });

  }

  onUncontrolledChange(value) {
    document.location.href = 'http://localhost:4200/tools/angular/' + value;
    console.log("Uncontrolled change: " + value);
  }

  ngOnInit() {
  }

}

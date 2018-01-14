//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateOrganization }          from '../../interfaces'
import { OrganizationService }    from '../../services/organizations.service';

@Component({
  moduleId: module.id,
  selector: 'grab-organization',
  templateUrl: './grab-organization-info.component.html',
  styleUrls: ['./grab-organization-info.component.css']
})

export class GrabOrganizationComponent implements OnInit
{

  constructor(private router: Router,
              private orgService: OrganizationService) {}
  
  ngOnInit() {
    this.orgService.getOrganizations()
  }
  
  //----------Properties-----------//


  //----------Methods-----------//

  get organizations() {
    return this.orgService.organizations
  }
  

}
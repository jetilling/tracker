//----Angular Imports----//
import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';

//----Other Imports----//
import { ICreateOrganization, IOrganization }                  from '../../interfaces'
import { OrganizationService }                  from '../../services/organizations.service';

@Component({
  moduleId: module.id,
  selector: 'switch-organization',
  templateUrl: './switch-organization.component.html',
  styleUrls: ['./switch-organization.component.css']
})

export class SwitchOrganizationComponent
{

  constructor(private router: Router,
              private orgService: OrganizationService) {}

  
  //----------Properties-----------//


  //----------Methods-----------//

  get organizations() {
    return this.orgService.organizations
  }

  get activeOrganization() {
    return this.orgService.activeOrganization
  }

  switchOrganization(organizationId: string) {
    this.orgService.setActiveOrganization(organizationId)
  }

}
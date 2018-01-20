//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';

//----Other Imports----//
import { ICreateOrganization, IOrganization }                  from '../../interfaces'
import { OrganizationService }                  from '../../services/organizations.service';

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

  get organizations(): IOrganization[] {
    return this.orgService.organizations
  }

  get activeOrganization(): IOrganization {
    return this.orgService.activeOrganization
  }

  get openSwitchOrganization(): boolean {
    return this.orgService.openSwitchOrganization
  }

  /**
   * Trigger to open and close Create Organization component
   */
  get openCreateOrganization() {
    return this.orgService.openCreateOrganization
  }

  get askForActiveOrganization(): boolean {

    return this.orgService.askForActiveOrganization
  }

  setAsActive(organizationId: string) {
    this.orgService.setActiveOrganization(organizationId)
  }

  toggleCreateOrganization() {
    this.orgService.changeOpenCreateProperty()
  }

  switchOrganizations() {
    this.orgService.changeOpenSwitchProperty()
  }

  closeCreateOrgModal(event: any) {
    if (event.target.className === "orgModal") 
      this.orgService.openCreateOrganization = false
  }
  

}
//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';

//----Other Imports----//
import { ICreateOrganization, IOrganization }                  from '../../interfaces'
import { OrganizationService }                  from '../../services/organizations.service';
import { AppStateService }                      from '../../services/appState.service';
import { SetUpService }                         from '../../services/setUp.service';

@Component({
  moduleId: module.id,
  selector: 'grab-organization',
  templateUrl: './grab-organization-info.component.html',
  styleUrls: ['./grab-organization-info.component.css']
})

export class GrabOrganizationComponent implements OnInit
{

  constructor(private router: Router,
              private orgService: OrganizationService,
              private setUpService: SetUpService,
              private state: AppStateService) {}
  
  ngOnInit() {
    // this.orgService.getOrganizations()
  }
  
  //----------Properties-----------//


  //----------Methods-----------//

  get organizations(): IOrganization[] {
    return this.state.organizations
  }

  get activeOrganization(): IOrganization {
    return this.state.activeOrganization
  }

  get showSwitchOrganization(): boolean {
    return this.state.showSwitchOrganization
  }

  /**
   * Trigger to show and close Create Organization component
   */
  get showCreateOrganization() {
    return this.state.showCreateOrganization
  }

  get askForActiveOrganization(): boolean {
    return this.state.askForActiveOrganization
  }

  setAsActive(organizationId: string) {
    this.setUpService.setActiveOrganization(organizationId)
  }

  toggleCreateOrganization() {
    this.orgService.changeOpenCreateProperty()
  }

  switchOrganizations() {
    this.orgService.changeOpenSwitchProperty()
  }

  closeCreateOrgModal(event: any) {
    if (event.target.className === "orgModal") 
      this.state.showCreateOrganization = false
  }
  

}
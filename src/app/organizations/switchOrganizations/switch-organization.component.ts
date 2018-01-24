//----Angular Imports----//
import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';

//----Other Imports----//
import { ICreateOrganization, IOrganization }                  from '../../interfaces'
import { OrganizationService }                  from '../../services/organizations.service';
import { AppStateService }                      from '../../services/appState.service';
import { SetUpService }                         from '../../services/setUp.service';

@Component({
  moduleId: module.id,
  selector: 'switch-organization',
  templateUrl: './switch-organization.component.html',
  styleUrls: ['./switch-organization.component.css']
})

export class SwitchOrganizationComponent
{

  constructor(private router: Router,
              private orgService: OrganizationService,
              private setUpService: SetUpService,
              private state: AppStateService) {}

  
  //----------Properties-----------//


  //----------Methods-----------//

  get organizations() {
    return this.state.organizations
  }

  get activeOrganization() {
    return this.state.activeOrganization
  }

  switchOrganization(organizationId: string) {
    this.setUpService.setActiveOrganization(organizationId)
  }

}
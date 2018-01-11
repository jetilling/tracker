//----Angular Imports----//
import { Component }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { ICreateOrganization }          from '../../interfaces'
import { OrganizationService }    from '../../services/organizations.service';

@Component({
  moduleId: module.id,
  selector: 'create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})

export class CreateOrganizationComponent 
{

  constructor(private router: Router,
              private orgService: OrganizationService) {}
  
  //----------Properties-----------//

    /**
   * Registering user's information
   */
  model: ICreateOrganization = <any>{};

  //----------Methods-----------//

  createOrganization() {
    this.orgService.createOrganization(this.model)
  }
  

}
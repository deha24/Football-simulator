import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';

export const FORMS_IMPORTS = [
  ReactiveFormsModule,
  FormsModule,
  InputTextModule,
  InputNumberModule,
  CardModule,
  ButtonModule,
  InputGroupModule,
  InputGroupAddonModule,
  DatePickerModule,
  SelectModule,
  PanelModule,
  ToggleButtonModule,
  ToastModule
];

export { FormGroup, FormControl, Validators } from '@angular/forms';
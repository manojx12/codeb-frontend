import { Routes } from '@angular/router';
import { ClientList } from './components/client-list/client-list';
import { ClientForm } from './components/client-form/client-form';
import { ChainList } from './components/chain-list/chain-list';
import { ChainForm } from './components/chain-form/chain-form';
import { BrandList } from './components/brand-list/brand-list';
import { BrandForm } from './components/brand-form/brand-form';
import { SubzoneList } from './components/subzone-list/subzone-list';
import { SubzoneForm } from './components/subzone-form/subzone-form';
import { GroupList } from './components/group-list/group-list';
import { GroupForm } from './components/group-form/group-form';
import { InvoiceList } from './components/invoice-list/invoice-list';
import { InvoiceForm } from './components/invoice-form/invoice-form';
import { EstimateList } from './components/estimate-list/estimate-list';
import { EstimateForm } from './components/estimate-form/estimate-form';
import { PaymentList } from './components/payment-list/payment-list';
import { PaymentForm } from './components/payment-form/payment-form';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { AttendanceList } from './components/attendance-list/attendance-list';
import { AttendanceForm } from './components/attendance-form/attendance-form';
import { LeaveList } from './components/leave-list/leave-list';
import { LeaveForm } from './components/leave-form/leave-form';
import { PayrollList } from './components/payroll-list/payroll-list';
import { PayrollForm } from './components/payroll-form/payroll-form';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: Login },
  { path: 'register', component: Register },


  { path: 'clients', component: ClientList, canActivate: [AuthGuard] },
  { path: 'clients/add', component: ClientForm, canActivate: [AuthGuard] },
  { path: 'clients/edit/:id', component: ClientForm, canActivate: [AuthGuard] },
  { path: 'chains', component: ChainList, canActivate: [AuthGuard] },
  { path: 'chains/add', component: ChainForm, canActivate: [AuthGuard] },
  { path: 'chains/edit/:id', component: ChainForm, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandList, canActivate: [AuthGuard] },
  { path: 'brands/add', component: BrandForm, canActivate: [AuthGuard] },
  { path: 'brands/edit/:id', component: BrandForm, canActivate: [AuthGuard] },
  { path: 'subzones', component: SubzoneList, canActivate: [AuthGuard] },
  { path: 'subzones/add', component: SubzoneForm, canActivate: [AuthGuard] },
  { path: 'subzones/edit/:id', component: SubzoneForm, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupList, canActivate: [AuthGuard] },
  { path: 'groups/add', component: GroupForm, canActivate: [AuthGuard] },
  { path: 'groups/edit/:id', component: GroupForm, canActivate: [AuthGuard] },
  { path: 'invoices', component: InvoiceList, canActivate: [AuthGuard] },
  { path: 'invoices/add', component: InvoiceForm, canActivate: [AuthGuard] },
  { path: 'invoices/edit/:id', component: InvoiceForm, canActivate: [AuthGuard] },
  { path: 'estimates', component: EstimateList, canActivate: [AuthGuard] },
  { path: 'estimates/add', component: EstimateForm, canActivate: [AuthGuard] },
  { path: 'estimates/edit/:id', component: EstimateForm, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentList, canActivate: [AuthGuard] },
  { path: 'payments/add', component: PaymentForm, canActivate: [AuthGuard] },
  { path: 'payments/edit/:id', component: PaymentForm, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeList, canActivate: [AuthGuard] },
  { path: 'employees/add', component: EmployeeForm, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeForm, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceList, canActivate: [AuthGuard] },
  { path: 'attendance/add', component: AttendanceForm, canActivate: [AuthGuard] },
  { path: 'attendance/edit/:id', component: AttendanceForm, canActivate: [AuthGuard] },
  { path: 'leaves', component: LeaveList, canActivate: [AuthGuard] },
  { path: 'leaves/add', component: LeaveForm, canActivate: [AuthGuard] },
  { path: 'leaves/edit/:id', component: LeaveForm, canActivate: [AuthGuard] },
  { path: 'payrolls', component: PayrollList, canActivate: [AuthGuard] },
  { path: 'payrolls/add', component: PayrollForm, canActivate: [AuthGuard] },
  { path: 'payrolls/edit/:id', component: PayrollForm, canActivate: [AuthGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },


  { path: '', component: Dashboard, pathMatch: 'full', canActivate: [AuthGuard] },


  { path: '**', redirectTo: '/login' }
];

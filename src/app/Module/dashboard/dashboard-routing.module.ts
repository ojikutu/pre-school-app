import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Modern Dashboard',
      status: false
    },
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'school',
        loadChildren: () => import('./school/all-schools/all-schools.module').then(m => m.AllSchoolsModule)
      },
      {
        path: 'school/details/:id',
        loadChildren: () => import('./school/school-details/school-details.module').then(m => m.SchoolDetailsModule)
      },
      {
        path: 'school/teachers/:id',
        loadChildren: () => import('./teacher/all-teachers/all-teachers.module').then(m => m.AllTeachersModule)
      },
      {
        path: 'school/teachers/:id/profile/:teacherUid',
        loadChildren: () => import('./teacher/teacher-profile/teacher-profile.module').then(m => m.TeacherProfileModule)
      },
      {
        path: 'school/classes/:id',
        loadChildren: () => import('./class/all-class/all-class.module').then(m => m.AllClassModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('./class/assigned-class/assigned-class.module').then(m => m.AssignedClassModule)
      },
      {
        path: 'classes/students/:id',
        loadChildren: () => import('./student/all-students/all-students.module').then(m => m.AllStudentsModule)
      },
      {
        path: 'classes/students/:id/profile/:studentUid',
        loadChildren: () => import('./student/student-profile/student-profile.module').then(m => m.StudentProfileModule)
      },
      {
        path: 'invites',
        loadChildren: () => import('./invitations/pending-invites/pending-invites.module').then(m => m.PendingInvitesModule)
      },
      {
        path: 'parent/children',
        loadChildren: () => import('./children/all-children/all-children.module').then(m => m.AllChildrenModule)
      },
      {
        path: 'parent/child/:id/profile',
        loadChildren: () => import('./children/child-profile/child-profile.module').then(m => m.ChildProfileModule)
      },
      {
        path: 'parent/child/:id/edit',
        loadChildren: () => import('./children/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

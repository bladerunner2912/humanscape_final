import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { AboutComponent } from './screens/about/about.component';
import { ContactComponent } from './screens/contact/contact.component';
import { ProjectComponent } from './screens/project/project.component';
import { ArchitectureComponent } from './screens/architecture/architecture.component';
import { InitiativeComponent } from './screens/initiative/initiative.component';
import { StudyComponent } from './screens/study/study.component';
import { BlogComponent } from './screens/blog/blog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
  {
    path: 'architecture',
    component: ArchitectureComponent,
  },
  {
    path: 'initiative',
    component: InitiativeComponent,
  },
  {
    path: 'study',
    component: StudyComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
];

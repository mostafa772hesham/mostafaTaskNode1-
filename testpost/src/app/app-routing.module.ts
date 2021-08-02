import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditpostComponent } from './views/editpost/editpost.component';
import { PostsComponent } from './views/posts/posts.component';

const routes: Routes = [
  {path:"",component:PostsComponent},
 { path : 'editePost/:id',component:EditpostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

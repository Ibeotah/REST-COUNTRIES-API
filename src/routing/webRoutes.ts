import { HomePage } from "../pages/homePage";
import type { Routes } from "../types";
import { Details } from "../view/details";
import { PageNotFound } from "../view/PageNotFound";
import { absolutePaths, paths } from "./paths";

export const routes: Routes = [
  {
    path: paths.homePage,
    component: HomePage,
  },
  {
    path: absolutePaths.detail,
    component: Details,
  },
  {
    path: paths.noMatch,
    component: PageNotFound
  }
];

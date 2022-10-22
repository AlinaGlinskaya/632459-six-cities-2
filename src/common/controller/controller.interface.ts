import { Router, Response } from 'express';
import { RouteInterface } from '../../types/route.interface.js';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  ok<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
  created<T>(res: Response, data?: T): void;
}

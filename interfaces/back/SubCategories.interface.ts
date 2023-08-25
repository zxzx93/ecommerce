import { ICategories } from './Categories.interface';

export interface ISubCategories extends ICategories {
  parent: ICategories;
}

import { ValidationError } from 'class-validator';

export type ValidationErrorField = {
  property: string;
  value: string;
  messages: string[];
  children: ValidationError[];
}

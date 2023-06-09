import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserService from './user.service.js';
import { Component } from '../../types/component.types.js';
import UserController from './user.controller.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}

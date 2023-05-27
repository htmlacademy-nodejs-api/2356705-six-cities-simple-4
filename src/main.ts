import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { createApplicationContainer } from './app/application.container.js';
import { Component } from './types/component.types.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';
import { createCommentContainer } from './modules/comment/comment.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();

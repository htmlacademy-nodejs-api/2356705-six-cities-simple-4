import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.types.js';
import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferController from './offer.controller.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}

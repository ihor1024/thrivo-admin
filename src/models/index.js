// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const StatusType = {
  "INIT": "INIT",
  "NO_ACCESS": "NO_ACCESS",
  "ACCESS": "ACCESS",
  "READY": "READY"
};

const UserType = {
  "CLIENT": "Client",
  "STYLIST": "Stylist",
  "MANAGER": "Manager",
  "SALON_OWNER": "SalonOwner",
  "ADMIN": "Admin"
};

const { AccessCode, SubscriptionPlan, Salon, User, Client, Formula, Component, Mixture, MixTrace, BatchInfo, IssueTracking, CycleInfo, Device, Company, ColorLine, Color, Location, Log, Comment, Photo, Shipment } = initSchema(schema);

export {
  AccessCode,
  SubscriptionPlan,
  Salon,
  User,
  Client,
  Formula,
  Component,
  Mixture,
  MixTrace,
  BatchInfo,
  IssueTracking,
  CycleInfo,
  Device,
  Company,
  ColorLine,
  Color,
  StatusType,
  UserType,
  Location,
  Log,
  Comment,
  Photo,
  Shipment
};
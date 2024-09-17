import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum StatusType {
  INIT = "INIT",
  NO_ACCESS = "NO_ACCESS",
  ACCESS = "ACCESS",
  READY = "READY"
}

export enum UserType {
  CLIENT = "Client",
  STYLIST = "Stylist",
  MANAGER = "Manager",
  SALON_OWNER = "SalonOwner",
  ADMIN = "Admin"
}

type EagerLocation = {
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly address3?: string | null;
  readonly locality?: string | null;
  readonly region?: string | null;
  readonly postalCode?: string | null;
  readonly country?: string | null;
  readonly geo?: string | null;
  readonly raw?: string | null;
}

type LazyLocation = {
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly address3?: string | null;
  readonly locality?: string | null;
  readonly region?: string | null;
  readonly postalCode?: string | null;
  readonly country?: string | null;
  readonly geo?: string | null;
  readonly raw?: string | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location)

type EagerLog = {
  readonly dateTime?: string | null;
  readonly msg?: string | null;
}

type LazyLog = {
  readonly dateTime?: string | null;
  readonly msg?: string | null;
}

export declare type Log = LazyLoading extends LazyLoadingDisabled ? EagerLog : LazyLog

export declare const Log: (new (init: ModelInit<Log>) => Log)

type EagerComment = {
  readonly id: string;
  readonly content: string;
  readonly authorId: string;
  readonly dateTime?: string | null;
}

type LazyComment = {
  readonly id: string;
  readonly content: string;
  readonly authorId: string;
  readonly dateTime?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment)

type EagerPhoto = {
  readonly id: string;
  readonly url?: string | null;
  readonly caption?: Comment | null;
  readonly dateTime?: string | null;
}

type LazyPhoto = {
  readonly id: string;
  readonly url?: string | null;
  readonly caption?: Comment | null;
  readonly dateTime?: string | null;
}

export declare type Photo = LazyLoading extends LazyLoadingDisabled ? EagerPhoto : LazyPhoto

export declare const Photo: (new (init: ModelInit<Photo>) => Photo)

type EagerShipment = {
  readonly raw?: string | null;
  readonly shipId?: string | null;
  readonly tracking?: string | null;
  readonly carrier?: string | null;
  readonly status?: string | null;
  readonly fromLocation?: Location | null;
  readonly toLocation?: Location | null;
}

type LazyShipment = {
  readonly raw?: string | null;
  readonly shipId?: string | null;
  readonly tracking?: string | null;
  readonly carrier?: string | null;
  readonly status?: string | null;
  readonly fromLocation?: Location | null;
  readonly toLocation?: Location | null;
}

export declare type Shipment = LazyLoading extends LazyLoadingDisabled ? EagerShipment : LazyShipment

export declare const Shipment: (new (init: ModelInit<Shipment>) => Shipment)

































type EagerAccessCode = {
  readonly id: string;
  readonly multiUse: boolean;
  readonly allowedGroups: (string | null)[];
  readonly salon?: Salon | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyAccessCode = {
  readonly id: string;
  readonly multiUse: boolean;
  readonly allowedGroups: (string | null)[];
  readonly salon: AsyncItem<Salon | undefined>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type AccessCode = LazyLoading extends LazyLoadingDisabled ? EagerAccessCode : LazyAccessCode

export declare const AccessCode: (new (init: ModelInit<AccessCode>) => AccessCode) & {
  copyOf(source: AccessCode, mutator: (draft: MutableModel<AccessCode>) => MutableModel<AccessCode> | void): AccessCode;
}

type EagerSubscriptionPlan = {
  readonly id: string;
  readonly monthlyKits: number;
  readonly startDate: string;
  readonly historicalKits?: (number | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly kitPrice?: number | null;
  readonly monthlyPrice?: number | null;
  readonly salon?: Salon | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazySubscriptionPlan = {
  readonly id: string;
  readonly monthlyKits: number;
  readonly startDate: string;
  readonly historicalKits?: (number | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly kitPrice?: number | null;
  readonly monthlyPrice?: number | null;
  readonly salon: AsyncItem<Salon | undefined>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type SubscriptionPlan = LazyLoading extends LazyLoadingDisabled ? EagerSubscriptionPlan : LazySubscriptionPlan

export declare const SubscriptionPlan: (new (init: ModelInit<SubscriptionPlan>) => SubscriptionPlan) & {
  copyOf(source: SubscriptionPlan, mutator: (draft: MutableModel<SubscriptionPlan>) => MutableModel<SubscriptionPlan> | void): SubscriptionPlan;
}

type EagerSalon = {
  readonly id: string;
  readonly placeId?: string | null;
  readonly name: string;
  readonly type?: string | null;
  readonly phone?: string | null;
  readonly location?: Location | null;
  readonly comments?: (Comment | null)[] | null;
  readonly defaultSalonGroups?: (string | null)[] | null;
  readonly defaultSalonAdminGroups?: (string | null)[] | null;
  readonly privileges?: string | null;
  readonly shipping?: string | null;
  readonly users?: (User | null)[] | null;
  readonly devices?: (Device | null)[] | null;
  readonly subscription?: (SubscriptionPlan | null)[] | null;
  readonly accessCodes?: (AccessCode | null)[] | null;
  readonly preferences?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazySalon = {
  readonly id: string;
  readonly placeId?: string | null;
  readonly name: string;
  readonly type?: string | null;
  readonly phone?: string | null;
  readonly location?: Location | null;
  readonly comments?: (Comment | null)[] | null;
  readonly defaultSalonGroups?: (string | null)[] | null;
  readonly defaultSalonAdminGroups?: (string | null)[] | null;
  readonly privileges?: string | null;
  readonly shipping?: string | null;
  readonly users: AsyncCollection<User>;
  readonly devices: AsyncCollection<Device>;
  readonly subscription: AsyncCollection<SubscriptionPlan>;
  readonly accessCodes: AsyncCollection<AccessCode>;
  readonly preferences?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Salon = LazyLoading extends LazyLoadingDisabled ? EagerSalon : LazySalon

export declare const Salon: (new (init: ModelInit<Salon>) => Salon) & {
  copyOf(source: Salon, mutator: (draft: MutableModel<Salon>) => MutableModel<Salon> | void): Salon;
}

type EagerUser = {
  readonly id: string;
  readonly type?: UserType | keyof typeof UserType | null;
  readonly tenantClaims?: (string | null)[] | null;
  readonly name: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly photos?: (Photo | null)[] | null;
  readonly salon?: Salon | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdmins?: (string | null)[] | null;
  readonly comments?: (Comment | null)[] | null;
  readonly status?: StatusType | keyof typeof StatusType | null;
  readonly clients?: (Client | null)[] | null;
  readonly preferences?: string | null;
  readonly appVersion?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyUser = {
  readonly id: string;
  readonly type?: UserType | keyof typeof UserType | null;
  readonly tenantClaims?: (string | null)[] | null;
  readonly name: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly photos?: (Photo | null)[] | null;
  readonly salon: AsyncItem<Salon | undefined>;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdmins?: (string | null)[] | null;
  readonly comments?: (Comment | null)[] | null;
  readonly status?: StatusType | keyof typeof StatusType | null;
  readonly clients: AsyncCollection<Client>;
  readonly preferences?: string | null;
  readonly appVersion?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerClient = {
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly stylist?: User | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly formulas?: (Formula | null)[] | null;
  readonly location?: Location | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyClient = {
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly stylist: AsyncItem<User | undefined>;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly formulas: AsyncCollection<Formula>;
  readonly location?: Location | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Client = LazyLoading extends LazyLoadingDisabled ? EagerClient : LazyClient

export declare const Client: (new (init: ModelInit<Client>) => Client) & {
  copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}

type EagerFormula = {
  readonly id: string;
  readonly client?: Client | null;
  readonly title?: string | null;
  readonly components?: (Component | null)[] | null;
  readonly comments?: (Comment | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly mixtures?: (Mixture | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyFormula = {
  readonly id: string;
  readonly client: AsyncItem<Client | undefined>;
  readonly title?: string | null;
  readonly components: AsyncCollection<Component>;
  readonly comments?: (Comment | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly mixtures: AsyncCollection<Mixture>;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Formula = LazyLoading extends LazyLoadingDisabled ? EagerFormula : LazyFormula

export declare const Formula: (new (init: ModelInit<Formula>) => Formula) & {
  copyOf(source: Formula, mutator: (draft: MutableModel<Formula>) => MutableModel<Formula> | void): Formula;
}

type EagerComponent = {
  readonly id: string;
  readonly amount?: number | null;
  readonly amountFloat?: number | null;
  readonly color?: Color | null;
  readonly comments?: (Comment | null)[] | null;
  readonly formula?: Formula | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly componentColorId?: string | null;
}

type LazyComponent = {
  readonly id: string;
  readonly amount?: number | null;
  readonly amountFloat?: number | null;
  readonly color: AsyncItem<Color | undefined>;
  readonly comments?: (Comment | null)[] | null;
  readonly formula: AsyncItem<Formula | undefined>;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly componentColorId?: string | null;
}

export declare type Component = LazyLoading extends LazyLoadingDisabled ? EagerComponent : LazyComponent

export declare const Component: (new (init: ModelInit<Component>) => Component) & {
  copyOf(source: Component, mutator: (draft: MutableModel<Component>) => MutableModel<Component> | void): Component;
}

type EagerMixture = {
  readonly id: string;
  readonly mixTrace?: (MixTrace | null)[] | null;
  readonly waste?: number | null;
  readonly bowl?: number | null;
  readonly leftOver?: number | null;
  readonly bowlWeight?: number | null;
  readonly status?: string | null;
  readonly title?: string | null;
  readonly comments?: (Comment | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly formula?: Formula | null;
  readonly properties?: string | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyMixture = {
  readonly id: string;
  readonly mixTrace: AsyncCollection<MixTrace>;
  readonly waste?: number | null;
  readonly bowl?: number | null;
  readonly leftOver?: number | null;
  readonly bowlWeight?: number | null;
  readonly status?: string | null;
  readonly title?: string | null;
  readonly comments?: (Comment | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly formula: AsyncItem<Formula | undefined>;
  readonly properties?: string | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Mixture = LazyLoading extends LazyLoadingDisabled ? EagerMixture : LazyMixture

export declare const Mixture: (new (init: ModelInit<Mixture>) => Mixture) & {
  copyOf(source: Mixture, mutator: (draft: MutableModel<Mixture>) => MutableModel<Mixture> | void): Mixture;
}

type EagerMixTrace = {
  readonly id: string;
  readonly mixture?: Mixture | null;
  readonly pouredAmount?: number | null;
  readonly amount?: number | null;
  readonly color?: Color | null;
  readonly component?: Component | null;
  readonly comments?: (Comment | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly mixTraceColorId?: string | null;
  readonly mixTraceComponentId?: string | null;
}

type LazyMixTrace = {
  readonly id: string;
  readonly mixture: AsyncItem<Mixture | undefined>;
  readonly pouredAmount?: number | null;
  readonly amount?: number | null;
  readonly color: AsyncItem<Color | undefined>;
  readonly component: AsyncItem<Component | undefined>;
  readonly comments?: (Comment | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly mixTraceColorId?: string | null;
  readonly mixTraceComponentId?: string | null;
}

export declare type MixTrace = LazyLoading extends LazyLoadingDisabled ? EagerMixTrace : LazyMixTrace

export declare const MixTrace: (new (init: ModelInit<MixTrace>) => MixTrace) & {
  copyOf(source: MixTrace, mutator: (draft: MutableModel<MixTrace>) => MutableModel<MixTrace> | void): MixTrace;
}

type EagerBatchInfo = {
  readonly id: string;
  readonly dateTime?: string | null;
  readonly msg?: string | null;
  readonly cycleCount?: number | null;
  readonly cancelCount?: number | null;
  readonly meta?: string | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly deviceBatchedCyclesId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyBatchInfo = {
  readonly id: string;
  readonly dateTime?: string | null;
  readonly msg?: string | null;
  readonly cycleCount?: number | null;
  readonly cancelCount?: number | null;
  readonly meta?: string | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly deviceBatchedCyclesId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type BatchInfo = LazyLoading extends LazyLoadingDisabled ? EagerBatchInfo : LazyBatchInfo

export declare const BatchInfo: (new (init: ModelInit<BatchInfo>) => BatchInfo) & {
  copyOf(source: BatchInfo, mutator: (draft: MutableModel<BatchInfo>) => MutableModel<BatchInfo> | void): BatchInfo;
}

type EagerIssueTracking = {
  readonly id: string;
  readonly msg?: string | null;
  readonly obj?: string | null;
  readonly origin?: string | null;
  readonly user?: User | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly issueTrackingUserId?: string | null;
}

type LazyIssueTracking = {
  readonly id: string;
  readonly msg?: string | null;
  readonly obj?: string | null;
  readonly origin?: string | null;
  readonly user: AsyncItem<User | undefined>;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly issueTrackingUserId?: string | null;
}

export declare type IssueTracking = LazyLoading extends LazyLoadingDisabled ? EagerIssueTracking : LazyIssueTracking

export declare const IssueTracking: (new (init: ModelInit<IssueTracking>) => IssueTracking) & {
  copyOf(source: IssueTracking, mutator: (draft: MutableModel<IssueTracking>) => MutableModel<IssueTracking> | void): IssueTracking;
}

type EagerCycleInfo = {
  readonly id: string;
  readonly dateTime?: string | null;
  readonly msg?: string | null;
  readonly formula?: Formula | null;
  readonly mixture?: Mixture | null;
  readonly stylist?: User | null;
  readonly shipment?: Shipment | null;
  readonly cycleCount?: number | null;
  readonly price?: number | null;
  readonly tags?: (string | null)[] | null;
  readonly properties?: string | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly deviceTaggedCyclesId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly cycleInfoFormulaId?: string | null;
  readonly cycleInfoMixtureId?: string | null;
  readonly cycleInfoStylistId?: string | null;
}

type LazyCycleInfo = {
  readonly id: string;
  readonly dateTime?: string | null;
  readonly msg?: string | null;
  readonly formula: AsyncItem<Formula | undefined>;
  readonly mixture: AsyncItem<Mixture | undefined>;
  readonly stylist: AsyncItem<User | undefined>;
  readonly shipment?: Shipment | null;
  readonly cycleCount?: number | null;
  readonly price?: number | null;
  readonly tags?: (string | null)[] | null;
  readonly properties?: string | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly deviceTaggedCyclesId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly cycleInfoFormulaId?: string | null;
  readonly cycleInfoMixtureId?: string | null;
  readonly cycleInfoStylistId?: string | null;
}

export declare type CycleInfo = LazyLoading extends LazyLoadingDisabled ? EagerCycleInfo : LazyCycleInfo

export declare const CycleInfo: (new (init: ModelInit<CycleInfo>) => CycleInfo) & {
  copyOf(source: CycleInfo, mutator: (draft: MutableModel<CycleInfo>) => MutableModel<CycleInfo> | void): CycleInfo;
}

type EagerDevice = {
  readonly id: string;
  readonly serial?: string | null;
  readonly status?: string | null;
  readonly properties?: string | null;
  readonly salon?: Salon | null;
  readonly log?: (Log | null)[] | null;
  readonly taggedCycles?: (CycleInfo | null)[] | null;
  readonly batchedCycles?: (BatchInfo | null)[] | null;
  readonly curatedData?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyDevice = {
  readonly id: string;
  readonly serial?: string | null;
  readonly status?: string | null;
  readonly properties?: string | null;
  readonly salon: AsyncItem<Salon | undefined>;
  readonly log?: (Log | null)[] | null;
  readonly taggedCycles: AsyncCollection<CycleInfo>;
  readonly batchedCycles: AsyncCollection<BatchInfo>;
  readonly curatedData?: (string | null)[] | null;
  readonly salonAdminGroups?: (string | null)[] | null;
  readonly salonGroups?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Device = LazyLoading extends LazyLoadingDisabled ? EagerDevice : LazyDevice

export declare const Device: (new (init: ModelInit<Device>) => Device) & {
  copyOf(source: Device, mutator: (draft: MutableModel<Device>) => MutableModel<Device> | void): Device;
}

type EagerCompany = {
  readonly id: string;
  readonly key: string;
  readonly name: string;
  readonly lines?: (ColorLine | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyCompany = {
  readonly id: string;
  readonly key: string;
  readonly name: string;
  readonly lines: AsyncCollection<ColorLine>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Company = LazyLoading extends LazyLoadingDisabled ? EagerCompany : LazyCompany

export declare const Company: (new (init: ModelInit<Company>) => Company) & {
  copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

type EagerColorLine = {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly description?: string | null;
  readonly type?: string | null;
  readonly statements?: (string | null)[] | null;
  readonly size?: string | null;
  readonly units?: string | null;
  readonly photos?: (Photo | null)[] | null;
  readonly photoIds?: (string | null)[] | null;
  readonly childrenIds?: (string | null)[] | null;
  readonly parentIds?: (string | null)[] | null;
  readonly colors?: (Color | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly companyLinesId?: string | null;
}

type LazyColorLine = {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly description?: string | null;
  readonly type?: string | null;
  readonly statements?: (string | null)[] | null;
  readonly size?: string | null;
  readonly units?: string | null;
  readonly photos?: (Photo | null)[] | null;
  readonly photoIds?: (string | null)[] | null;
  readonly childrenIds?: (string | null)[] | null;
  readonly parentIds?: (string | null)[] | null;
  readonly colors: AsyncCollection<Color>;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly companyLinesId?: string | null;
}

export declare type ColorLine = LazyLoading extends LazyLoadingDisabled ? EagerColorLine : LazyColorLine

export declare const ColorLine: (new (init: ModelInit<ColorLine>) => ColorLine) & {
  copyOf(source: ColorLine, mutator: (draft: MutableModel<ColorLine>) => MutableModel<ColorLine> | void): ColorLine;
}

type EagerColor = {
  readonly id: string;
  readonly level?: string | null;
  readonly colorKey: string;
  readonly altKey?: string | null;
  readonly segment?: string | null;
  readonly colorType: string;
  readonly colorLine: string;
  readonly material?: string | null;
  readonly size?: string | null;
  readonly units?: string | null;
  readonly line?: ColorLine | null;
  readonly company: string;
  readonly ingredients?: (string | null)[] | null;
  readonly description?: string | null;
  readonly hexColor?: string | null;
  readonly photoIds?: (string | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyColor = {
  readonly id: string;
  readonly level?: string | null;
  readonly colorKey: string;
  readonly altKey?: string | null;
  readonly segment?: string | null;
  readonly colorType: string;
  readonly colorLine: string;
  readonly material?: string | null;
  readonly size?: string | null;
  readonly units?: string | null;
  readonly line: AsyncItem<ColorLine | undefined>;
  readonly company: string;
  readonly ingredients?: (string | null)[] | null;
  readonly description?: string | null;
  readonly hexColor?: string | null;
  readonly photoIds?: (string | null)[] | null;
  readonly photos?: (Photo | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Color = LazyLoading extends LazyLoadingDisabled ? EagerColor : LazyColor

export declare const Color: (new (init: ModelInit<Color>) => Color) & {
  copyOf(source: Color, mutator: (draft: MutableModel<Color>) => MutableModel<Color> | void): Color;
}
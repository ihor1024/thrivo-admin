/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccessCode = /* GraphQL */ `
  query GetAccessCode($id: ID!) {
    getAccessCode(id: $id) {
      id
      multiUse
      allowedGroups
      salon {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      salonAccessCodesId
      __typename
    }
  }
`;
export const listAccessCodes = /* GraphQL */ `
  query ListAccessCodes(
    $filter: ModelAccessCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccessCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        multiUse
        allowedGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonAccessCodesId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAccessCodes = /* GraphQL */ `
  query SyncAccessCodes(
    $filter: ModelAccessCodeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAccessCodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        multiUse
        allowedGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonAccessCodesId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSubscriptionPlan = /* GraphQL */ `
  query GetSubscriptionPlan($id: ID!) {
    getSubscriptionPlan(id: $id) {
      id
      monthlyKits
      startDate
      historicalKits
      salonGroups
      kitPrice
      monthlyPrice
      salon {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      salonSubscriptionId
      owner
      __typename
    }
  }
`;
export const listSubscriptionPlans = /* GraphQL */ `
  query ListSubscriptionPlans(
    $filter: ModelSubscriptionPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        monthlyKits
        startDate
        historicalKits
        salonGroups
        kitPrice
        monthlyPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonSubscriptionId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSubscriptionPlans = /* GraphQL */ `
  query SyncSubscriptionPlans(
    $filter: ModelSubscriptionPlanFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubscriptionPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        monthlyKits
        startDate
        historicalKits
        salonGroups
        kitPrice
        monthlyPrice
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonSubscriptionId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSalon = /* GraphQL */ `
  query GetSalon($id: ID!) {
    getSalon(id: $id) {
      id
      placeId
      name
      type
      phone
      location {
        address1
        address2
        address3
        locality
        region
        postalCode
        country
        geo
        raw
        __typename
      }
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      defaultSalonGroups
      defaultSalonAdminGroups
      privileges
      shipping
      users {
        nextToken
        startedAt
        __typename
      }
      devices {
        nextToken
        startedAt
        __typename
      }
      subscription {
        nextToken
        startedAt
        __typename
      }
      accessCodes {
        nextToken
        startedAt
        __typename
      }
      preferences
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listSalons = /* GraphQL */ `
  query ListSalons(
    $filter: ModelSalonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSalons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSalons = /* GraphQL */ `
  query SyncSalons(
    $filter: ModelSalonFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSalons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      type
      tenantClaims
      name
      email
      phone
      photos {
        id
        url
        dateTime
        __typename
      }
      salon {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      salonGroups
      salonAdmins
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      status
      clients {
        nextToken
        startedAt
        __typename
      }
      preferences
      appVersion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      salonUsersId
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      email
      phone
      stylist {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      salonGroups
      salonAdminGroups
      formulas {
        nextToken
        startedAt
        __typename
      }
      location {
        address1
        address2
        address3
        locality
        region
        postalCode
        country
        geo
        raw
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userClientsId
      owner
      __typename
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userClientsId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncClients = /* GraphQL */ `
  query SyncClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        phone
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userClientsId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getFormula = /* GraphQL */ `
  query GetFormula($id: ID!) {
    getFormula(id: $id) {
      id
      client {
        id
        name
        email
        phone
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userClientsId
        owner
        __typename
      }
      title
      components {
        nextToken
        startedAt
        __typename
      }
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      photos {
        id
        url
        dateTime
        __typename
      }
      tags
      mixtures {
        nextToken
        startedAt
        __typename
      }
      salonGroups
      salonAdminGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      clientFormulasId
      owner
      __typename
    }
  }
`;
export const listFormulas = /* GraphQL */ `
  query ListFormulas(
    $filter: ModelFormulaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormulas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        tags
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        clientFormulasId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncFormulas = /* GraphQL */ `
  query SyncFormulas(
    $filter: ModelFormulaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFormulas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        tags
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        clientFormulasId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getComponent = /* GraphQL */ `
  query GetComponent($id: ID!) {
    getComponent(id: $id) {
      id
      amount
      amountFloat
      color {
        id
        level
        colorKey
        altKey
        segment
        colorType
        colorLine
        material
        size
        units
        company
        ingredients
        description
        hexColor
        photoIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        colorLineColorsId
        __typename
      }
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      formula {
        id
        title
        tags
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        clientFormulasId
        owner
        __typename
      }
      salonGroups
      salonAdminGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      formulaComponentsId
      componentColorId
      owner
      __typename
    }
  }
`;
export const listComponents = /* GraphQL */ `
  query ListComponents(
    $filter: ModelComponentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComponents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        amountFloat
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaComponentsId
        componentColorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncComponents = /* GraphQL */ `
  query SyncComponents(
    $filter: ModelComponentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComponents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        amount
        amountFloat
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaComponentsId
        componentColorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMixture = /* GraphQL */ `
  query GetMixture($id: ID!) {
    getMixture(id: $id) {
      id
      mixTrace {
        nextToken
        startedAt
        __typename
      }
      waste
      bowl
      leftOver
      bowlWeight
      status
      title
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      photos {
        id
        url
        dateTime
        __typename
      }
      formula {
        id
        title
        tags
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        clientFormulasId
        owner
        __typename
      }
      properties
      salonGroups
      salonAdminGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      formulaMixturesId
      owner
      __typename
    }
  }
`;
export const listMixtures = /* GraphQL */ `
  query ListMixtures(
    $filter: ModelMixtureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMixtures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        waste
        bowl
        leftOver
        bowlWeight
        status
        title
        properties
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaMixturesId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMixtures = /* GraphQL */ `
  query SyncMixtures(
    $filter: ModelMixtureFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMixtures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        waste
        bowl
        leftOver
        bowlWeight
        status
        title
        properties
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaMixturesId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMixTrace = /* GraphQL */ `
  query GetMixTrace($id: ID!) {
    getMixTrace(id: $id) {
      id
      mixture {
        id
        waste
        bowl
        leftOver
        bowlWeight
        status
        title
        properties
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaMixturesId
        owner
        __typename
      }
      pouredAmount
      amount
      color {
        id
        level
        colorKey
        altKey
        segment
        colorType
        colorLine
        material
        size
        units
        company
        ingredients
        description
        hexColor
        photoIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        colorLineColorsId
        __typename
      }
      component {
        id
        amount
        amountFloat
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaComponentsId
        componentColorId
        owner
        __typename
      }
      comments {
        id
        content
        authorId
        dateTime
        __typename
      }
      salonGroups
      salonAdminGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      mixtureMixTraceId
      mixTraceColorId
      mixTraceComponentId
      owner
      __typename
    }
  }
`;
export const listMixTraces = /* GraphQL */ `
  query ListMixTraces(
    $filter: ModelMixTraceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMixTraces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pouredAmount
        amount
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        mixtureMixTraceId
        mixTraceColorId
        mixTraceComponentId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMixTraces = /* GraphQL */ `
  query SyncMixTraces(
    $filter: ModelMixTraceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMixTraces(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        pouredAmount
        amount
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        mixtureMixTraceId
        mixTraceColorId
        mixTraceComponentId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getBatchInfo = /* GraphQL */ `
  query GetBatchInfo($id: ID!) {
    getBatchInfo(id: $id) {
      id
      dateTime
      msg
      cycleCount
      cancelCount
      meta
      salonAdminGroups
      salonGroups
      deviceBatchedCyclesId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listBatchInfos = /* GraphQL */ `
  query ListBatchInfos(
    $filter: ModelBatchInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBatchInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateTime
        msg
        cycleCount
        cancelCount
        meta
        salonAdminGroups
        salonGroups
        deviceBatchedCyclesId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBatchInfos = /* GraphQL */ `
  query SyncBatchInfos(
    $filter: ModelBatchInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBatchInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dateTime
        msg
        cycleCount
        cancelCount
        meta
        salonAdminGroups
        salonGroups
        deviceBatchedCyclesId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getIssueTracking = /* GraphQL */ `
  query GetIssueTracking($id: ID!) {
    getIssueTracking(id: $id) {
      id
      msg
      obj
      origin
      user {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      issueTrackingUserId
      owner
      __typename
    }
  }
`;
export const listIssueTrackings = /* GraphQL */ `
  query ListIssueTrackings(
    $filter: ModelIssueTrackingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIssueTrackings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        msg
        obj
        origin
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        issueTrackingUserId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncIssueTrackings = /* GraphQL */ `
  query SyncIssueTrackings(
    $filter: ModelIssueTrackingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIssueTrackings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        msg
        obj
        origin
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        issueTrackingUserId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCycleInfo = /* GraphQL */ `
  query GetCycleInfo($id: ID!) {
    getCycleInfo(id: $id) {
      id
      dateTime
      msg
      formula {
        id
        title
        tags
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        clientFormulasId
        owner
        __typename
      }
      mixture {
        id
        waste
        bowl
        leftOver
        bowlWeight
        status
        title
        properties
        salonGroups
        salonAdminGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        formulaMixturesId
        owner
        __typename
      }
      stylist {
        id
        type
        tenantClaims
        name
        email
        phone
        salonGroups
        salonAdmins
        status
        preferences
        appVersion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonUsersId
        owner
        __typename
      }
      shipment {
        raw
        shipId
        tracking
        carrier
        status
        __typename
      }
      cycleCount
      price
      tags
      properties
      salonAdminGroups
      salonGroups
      deviceTaggedCyclesId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      cycleInfoFormulaId
      cycleInfoMixtureId
      cycleInfoStylistId
      owner
      __typename
    }
  }
`;
export const listCycleInfos = /* GraphQL */ `
  query ListCycleInfos(
    $filter: ModelCycleInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCycleInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateTime
        msg
        cycleCount
        price
        tags
        properties
        salonAdminGroups
        salonGroups
        deviceTaggedCyclesId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        cycleInfoFormulaId
        cycleInfoMixtureId
        cycleInfoStylistId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCycleInfos = /* GraphQL */ `
  query SyncCycleInfos(
    $filter: ModelCycleInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCycleInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dateTime
        msg
        cycleCount
        price
        tags
        properties
        salonAdminGroups
        salonGroups
        deviceTaggedCyclesId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        cycleInfoFormulaId
        cycleInfoMixtureId
        cycleInfoStylistId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
      id
      serial
      status
      properties
      salon {
        id
        placeId
        name
        type
        phone
        defaultSalonGroups
        defaultSalonAdminGroups
        privileges
        shipping
        preferences
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      log {
        dateTime
        msg
        __typename
      }
      taggedCycles {
        nextToken
        startedAt
        __typename
      }
      batchedCycles {
        nextToken
        startedAt
        __typename
      }
      curatedData
      salonAdminGroups
      salonGroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      salonDevicesId
      owner
      __typename
    }
  }
`;
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serial
        status
        properties
        curatedData
        salonAdminGroups
        salonGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonDevicesId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDevices = /* GraphQL */ `
  query SyncDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDevices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        serial
        status
        properties
        curatedData
        salonAdminGroups
        salonGroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        salonDevicesId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      key
      name
      lines {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCompanies = /* GraphQL */ `
  query SyncCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCompanies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        key
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getColorLine = /* GraphQL */ `
  query GetColorLine($id: ID!) {
    getColorLine(id: $id) {
      id
      name
      company
      description
      type
      statements
      size
      units
      photos {
        id
        url
        dateTime
        __typename
      }
      photoIds
      childrenIds
      parentIds
      colors {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      companyLinesId
      __typename
    }
  }
`;
export const listColorLines = /* GraphQL */ `
  query ListColorLines(
    $filter: ModelColorLineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listColorLines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        company
        description
        type
        statements
        size
        units
        photoIds
        childrenIds
        parentIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyLinesId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncColorLines = /* GraphQL */ `
  query SyncColorLines(
    $filter: ModelColorLineFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncColorLines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        company
        description
        type
        statements
        size
        units
        photoIds
        childrenIds
        parentIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyLinesId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getColor = /* GraphQL */ `
  query GetColor($id: ID!) {
    getColor(id: $id) {
      id
      level
      colorKey
      altKey
      segment
      colorType
      colorLine
      material
      size
      units
      line {
        id
        name
        company
        description
        type
        statements
        size
        units
        photoIds
        childrenIds
        parentIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        companyLinesId
        __typename
      }
      company
      ingredients
      description
      hexColor
      photoIds
      photos {
        id
        url
        dateTime
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      colorLineColorsId
      __typename
    }
  }
`;
export const listColors = /* GraphQL */ `
  query ListColors(
    $filter: ModelColorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listColors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        level
        colorKey
        altKey
        segment
        colorType
        colorLine
        material
        size
        units
        company
        ingredients
        description
        hexColor
        photoIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        colorLineColorsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncColors = /* GraphQL */ `
  query SyncColors(
    $filter: ModelColorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncColors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        level
        colorKey
        altKey
        segment
        colorType
        colorLine
        material
        size
        units
        company
        ingredients
        description
        hexColor
        photoIds
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        colorLineColorsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

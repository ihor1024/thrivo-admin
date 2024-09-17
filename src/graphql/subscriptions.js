/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccessCode = /* GraphQL */ `
  subscription OnCreateAccessCode(
    $filter: ModelSubscriptionAccessCodeFilterInput
  ) {
    onCreateAccessCode(filter: $filter) {
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
export const onUpdateAccessCode = /* GraphQL */ `
  subscription OnUpdateAccessCode(
    $filter: ModelSubscriptionAccessCodeFilterInput
  ) {
    onUpdateAccessCode(filter: $filter) {
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
export const onDeleteAccessCode = /* GraphQL */ `
  subscription OnDeleteAccessCode(
    $filter: ModelSubscriptionAccessCodeFilterInput
  ) {
    onDeleteAccessCode(filter: $filter) {
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
export const onCreateSubscriptionPlan = /* GraphQL */ `
  subscription OnCreateSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onCreateSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onUpdateSubscriptionPlan = /* GraphQL */ `
  subscription OnUpdateSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onUpdateSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onDeleteSubscriptionPlan = /* GraphQL */ `
  subscription OnDeleteSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onDeleteSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onCreateSalon = /* GraphQL */ `
  subscription OnCreateSalon(
    $filter: ModelSubscriptionSalonFilterInput
    $owner: String
  ) {
    onCreateSalon(filter: $filter, owner: $owner) {
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
export const onUpdateSalon = /* GraphQL */ `
  subscription OnUpdateSalon(
    $filter: ModelSubscriptionSalonFilterInput
    $owner: String
  ) {
    onUpdateSalon(filter: $filter, owner: $owner) {
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
export const onDeleteSalon = /* GraphQL */ `
  subscription OnDeleteSalon(
    $filter: ModelSubscriptionSalonFilterInput
    $owner: String
  ) {
    onDeleteSalon(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onCreateClient(filter: $filter, owner: $owner) {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onUpdateClient(filter: $filter, owner: $owner) {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient(
    $filter: ModelSubscriptionClientFilterInput
    $owner: String
  ) {
    onDeleteClient(filter: $filter, owner: $owner) {
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
export const onCreateFormula = /* GraphQL */ `
  subscription OnCreateFormula(
    $filter: ModelSubscriptionFormulaFilterInput
    $owner: String
  ) {
    onCreateFormula(filter: $filter, owner: $owner) {
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
export const onUpdateFormula = /* GraphQL */ `
  subscription OnUpdateFormula(
    $filter: ModelSubscriptionFormulaFilterInput
    $owner: String
  ) {
    onUpdateFormula(filter: $filter, owner: $owner) {
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
export const onDeleteFormula = /* GraphQL */ `
  subscription OnDeleteFormula(
    $filter: ModelSubscriptionFormulaFilterInput
    $owner: String
  ) {
    onDeleteFormula(filter: $filter, owner: $owner) {
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
export const onCreateComponent = /* GraphQL */ `
  subscription OnCreateComponent(
    $filter: ModelSubscriptionComponentFilterInput
    $owner: String
  ) {
    onCreateComponent(filter: $filter, owner: $owner) {
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
export const onUpdateComponent = /* GraphQL */ `
  subscription OnUpdateComponent(
    $filter: ModelSubscriptionComponentFilterInput
    $owner: String
  ) {
    onUpdateComponent(filter: $filter, owner: $owner) {
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
export const onDeleteComponent = /* GraphQL */ `
  subscription OnDeleteComponent(
    $filter: ModelSubscriptionComponentFilterInput
    $owner: String
  ) {
    onDeleteComponent(filter: $filter, owner: $owner) {
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
export const onCreateMixture = /* GraphQL */ `
  subscription OnCreateMixture(
    $filter: ModelSubscriptionMixtureFilterInput
    $owner: String
  ) {
    onCreateMixture(filter: $filter, owner: $owner) {
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
export const onUpdateMixture = /* GraphQL */ `
  subscription OnUpdateMixture(
    $filter: ModelSubscriptionMixtureFilterInput
    $owner: String
  ) {
    onUpdateMixture(filter: $filter, owner: $owner) {
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
export const onDeleteMixture = /* GraphQL */ `
  subscription OnDeleteMixture(
    $filter: ModelSubscriptionMixtureFilterInput
    $owner: String
  ) {
    onDeleteMixture(filter: $filter, owner: $owner) {
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
export const onCreateMixTrace = /* GraphQL */ `
  subscription OnCreateMixTrace(
    $filter: ModelSubscriptionMixTraceFilterInput
    $owner: String
  ) {
    onCreateMixTrace(filter: $filter, owner: $owner) {
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
export const onUpdateMixTrace = /* GraphQL */ `
  subscription OnUpdateMixTrace(
    $filter: ModelSubscriptionMixTraceFilterInput
    $owner: String
  ) {
    onUpdateMixTrace(filter: $filter, owner: $owner) {
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
export const onDeleteMixTrace = /* GraphQL */ `
  subscription OnDeleteMixTrace(
    $filter: ModelSubscriptionMixTraceFilterInput
    $owner: String
  ) {
    onDeleteMixTrace(filter: $filter, owner: $owner) {
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
export const onCreateBatchInfo = /* GraphQL */ `
  subscription OnCreateBatchInfo(
    $filter: ModelSubscriptionBatchInfoFilterInput
    $owner: String
  ) {
    onCreateBatchInfo(filter: $filter, owner: $owner) {
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
export const onUpdateBatchInfo = /* GraphQL */ `
  subscription OnUpdateBatchInfo(
    $filter: ModelSubscriptionBatchInfoFilterInput
    $owner: String
  ) {
    onUpdateBatchInfo(filter: $filter, owner: $owner) {
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
export const onDeleteBatchInfo = /* GraphQL */ `
  subscription OnDeleteBatchInfo(
    $filter: ModelSubscriptionBatchInfoFilterInput
    $owner: String
  ) {
    onDeleteBatchInfo(filter: $filter, owner: $owner) {
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
export const onCreateIssueTracking = /* GraphQL */ `
  subscription OnCreateIssueTracking(
    $filter: ModelSubscriptionIssueTrackingFilterInput
    $owner: String
  ) {
    onCreateIssueTracking(filter: $filter, owner: $owner) {
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
export const onUpdateIssueTracking = /* GraphQL */ `
  subscription OnUpdateIssueTracking(
    $filter: ModelSubscriptionIssueTrackingFilterInput
    $owner: String
  ) {
    onUpdateIssueTracking(filter: $filter, owner: $owner) {
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
export const onDeleteIssueTracking = /* GraphQL */ `
  subscription OnDeleteIssueTracking(
    $filter: ModelSubscriptionIssueTrackingFilterInput
    $owner: String
  ) {
    onDeleteIssueTracking(filter: $filter, owner: $owner) {
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
export const onCreateCycleInfo = /* GraphQL */ `
  subscription OnCreateCycleInfo(
    $filter: ModelSubscriptionCycleInfoFilterInput
    $owner: String
  ) {
    onCreateCycleInfo(filter: $filter, owner: $owner) {
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
export const onUpdateCycleInfo = /* GraphQL */ `
  subscription OnUpdateCycleInfo(
    $filter: ModelSubscriptionCycleInfoFilterInput
    $owner: String
  ) {
    onUpdateCycleInfo(filter: $filter, owner: $owner) {
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
export const onDeleteCycleInfo = /* GraphQL */ `
  subscription OnDeleteCycleInfo(
    $filter: ModelSubscriptionCycleInfoFilterInput
    $owner: String
  ) {
    onDeleteCycleInfo(filter: $filter, owner: $owner) {
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
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onCreateDevice(filter: $filter, owner: $owner) {
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
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onUpdateDevice(filter: $filter, owner: $owner) {
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
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice(
    $filter: ModelSubscriptionDeviceFilterInput
    $owner: String
  ) {
    onDeleteDevice(filter: $filter, owner: $owner) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
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
export const onCreateColorLine = /* GraphQL */ `
  subscription OnCreateColorLine(
    $filter: ModelSubscriptionColorLineFilterInput
  ) {
    onCreateColorLine(filter: $filter) {
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
export const onUpdateColorLine = /* GraphQL */ `
  subscription OnUpdateColorLine(
    $filter: ModelSubscriptionColorLineFilterInput
  ) {
    onUpdateColorLine(filter: $filter) {
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
export const onDeleteColorLine = /* GraphQL */ `
  subscription OnDeleteColorLine(
    $filter: ModelSubscriptionColorLineFilterInput
  ) {
    onDeleteColorLine(filter: $filter) {
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
export const onCreateColor = /* GraphQL */ `
  subscription OnCreateColor($filter: ModelSubscriptionColorFilterInput) {
    onCreateColor(filter: $filter) {
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
export const onUpdateColor = /* GraphQL */ `
  subscription OnUpdateColor($filter: ModelSubscriptionColorFilterInput) {
    onUpdateColor(filter: $filter) {
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
export const onDeleteColor = /* GraphQL */ `
  subscription OnDeleteColor($filter: ModelSubscriptionColorFilterInput) {
    onDeleteColor(filter: $filter) {
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

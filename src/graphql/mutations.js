/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccessCode = /* GraphQL */ `
  mutation CreateAccessCode(
    $input: CreateAccessCodeInput!
    $condition: ModelAccessCodeConditionInput
  ) {
    createAccessCode(input: $input, condition: $condition) {
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
export const updateAccessCode = /* GraphQL */ `
  mutation UpdateAccessCode(
    $input: UpdateAccessCodeInput!
    $condition: ModelAccessCodeConditionInput
  ) {
    updateAccessCode(input: $input, condition: $condition) {
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
export const deleteAccessCode = /* GraphQL */ `
  mutation DeleteAccessCode(
    $input: DeleteAccessCodeInput!
    $condition: ModelAccessCodeConditionInput
  ) {
    deleteAccessCode(input: $input, condition: $condition) {
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
export const createSubscriptionPlan = /* GraphQL */ `
  mutation CreateSubscriptionPlan(
    $input: CreateSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    createSubscriptionPlan(input: $input, condition: $condition) {
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
export const updateSubscriptionPlan = /* GraphQL */ `
  mutation UpdateSubscriptionPlan(
    $input: UpdateSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    updateSubscriptionPlan(input: $input, condition: $condition) {
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
export const deleteSubscriptionPlan = /* GraphQL */ `
  mutation DeleteSubscriptionPlan(
    $input: DeleteSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    deleteSubscriptionPlan(input: $input, condition: $condition) {
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
export const createSalon = /* GraphQL */ `
  mutation CreateSalon(
    $input: CreateSalonInput!
    $condition: ModelSalonConditionInput
  ) {
    createSalon(input: $input, condition: $condition) {
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
export const updateSalon = /* GraphQL */ `
  mutation UpdateSalon(
    $input: UpdateSalonInput!
    $condition: ModelSalonConditionInput
  ) {
    updateSalon(input: $input, condition: $condition) {
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
export const deleteSalon = /* GraphQL */ `
  mutation DeleteSalon(
    $input: DeleteSalonInput!
    $condition: ModelSalonConditionInput
  ) {
    deleteSalon(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createFormula = /* GraphQL */ `
  mutation CreateFormula(
    $input: CreateFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    createFormula(input: $input, condition: $condition) {
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
export const updateFormula = /* GraphQL */ `
  mutation UpdateFormula(
    $input: UpdateFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    updateFormula(input: $input, condition: $condition) {
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
export const deleteFormula = /* GraphQL */ `
  mutation DeleteFormula(
    $input: DeleteFormulaInput!
    $condition: ModelFormulaConditionInput
  ) {
    deleteFormula(input: $input, condition: $condition) {
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
export const createComponent = /* GraphQL */ `
  mutation CreateComponent(
    $input: CreateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    createComponent(input: $input, condition: $condition) {
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
export const updateComponent = /* GraphQL */ `
  mutation UpdateComponent(
    $input: UpdateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    updateComponent(input: $input, condition: $condition) {
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
export const deleteComponent = /* GraphQL */ `
  mutation DeleteComponent(
    $input: DeleteComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    deleteComponent(input: $input, condition: $condition) {
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
export const createMixture = /* GraphQL */ `
  mutation CreateMixture(
    $input: CreateMixtureInput!
    $condition: ModelMixtureConditionInput
  ) {
    createMixture(input: $input, condition: $condition) {
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
export const updateMixture = /* GraphQL */ `
  mutation UpdateMixture(
    $input: UpdateMixtureInput!
    $condition: ModelMixtureConditionInput
  ) {
    updateMixture(input: $input, condition: $condition) {
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
export const deleteMixture = /* GraphQL */ `
  mutation DeleteMixture(
    $input: DeleteMixtureInput!
    $condition: ModelMixtureConditionInput
  ) {
    deleteMixture(input: $input, condition: $condition) {
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
export const createMixTrace = /* GraphQL */ `
  mutation CreateMixTrace(
    $input: CreateMixTraceInput!
    $condition: ModelMixTraceConditionInput
  ) {
    createMixTrace(input: $input, condition: $condition) {
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
export const updateMixTrace = /* GraphQL */ `
  mutation UpdateMixTrace(
    $input: UpdateMixTraceInput!
    $condition: ModelMixTraceConditionInput
  ) {
    updateMixTrace(input: $input, condition: $condition) {
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
export const deleteMixTrace = /* GraphQL */ `
  mutation DeleteMixTrace(
    $input: DeleteMixTraceInput!
    $condition: ModelMixTraceConditionInput
  ) {
    deleteMixTrace(input: $input, condition: $condition) {
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
export const createBatchInfo = /* GraphQL */ `
  mutation CreateBatchInfo(
    $input: CreateBatchInfoInput!
    $condition: ModelBatchInfoConditionInput
  ) {
    createBatchInfo(input: $input, condition: $condition) {
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
export const updateBatchInfo = /* GraphQL */ `
  mutation UpdateBatchInfo(
    $input: UpdateBatchInfoInput!
    $condition: ModelBatchInfoConditionInput
  ) {
    updateBatchInfo(input: $input, condition: $condition) {
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
export const deleteBatchInfo = /* GraphQL */ `
  mutation DeleteBatchInfo(
    $input: DeleteBatchInfoInput!
    $condition: ModelBatchInfoConditionInput
  ) {
    deleteBatchInfo(input: $input, condition: $condition) {
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
export const createIssueTracking = /* GraphQL */ `
  mutation CreateIssueTracking(
    $input: CreateIssueTrackingInput!
    $condition: ModelIssueTrackingConditionInput
  ) {
    createIssueTracking(input: $input, condition: $condition) {
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
export const updateIssueTracking = /* GraphQL */ `
  mutation UpdateIssueTracking(
    $input: UpdateIssueTrackingInput!
    $condition: ModelIssueTrackingConditionInput
  ) {
    updateIssueTracking(input: $input, condition: $condition) {
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
export const deleteIssueTracking = /* GraphQL */ `
  mutation DeleteIssueTracking(
    $input: DeleteIssueTrackingInput!
    $condition: ModelIssueTrackingConditionInput
  ) {
    deleteIssueTracking(input: $input, condition: $condition) {
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
export const createCycleInfo = /* GraphQL */ `
  mutation CreateCycleInfo(
    $input: CreateCycleInfoInput!
    $condition: ModelCycleInfoConditionInput
  ) {
    createCycleInfo(input: $input, condition: $condition) {
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
export const updateCycleInfo = /* GraphQL */ `
  mutation UpdateCycleInfo(
    $input: UpdateCycleInfoInput!
    $condition: ModelCycleInfoConditionInput
  ) {
    updateCycleInfo(input: $input, condition: $condition) {
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
export const deleteCycleInfo = /* GraphQL */ `
  mutation DeleteCycleInfo(
    $input: DeleteCycleInfoInput!
    $condition: ModelCycleInfoConditionInput
  ) {
    deleteCycleInfo(input: $input, condition: $condition) {
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
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
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
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
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
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createColorLine = /* GraphQL */ `
  mutation CreateColorLine(
    $input: CreateColorLineInput!
    $condition: ModelColorLineConditionInput
  ) {
    createColorLine(input: $input, condition: $condition) {
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
export const updateColorLine = /* GraphQL */ `
  mutation UpdateColorLine(
    $input: UpdateColorLineInput!
    $condition: ModelColorLineConditionInput
  ) {
    updateColorLine(input: $input, condition: $condition) {
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
export const deleteColorLine = /* GraphQL */ `
  mutation DeleteColorLine(
    $input: DeleteColorLineInput!
    $condition: ModelColorLineConditionInput
  ) {
    deleteColorLine(input: $input, condition: $condition) {
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
export const createColor = /* GraphQL */ `
  mutation CreateColor(
    $input: CreateColorInput!
    $condition: ModelColorConditionInput
  ) {
    createColor(input: $input, condition: $condition) {
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
export const updateColor = /* GraphQL */ `
  mutation UpdateColor(
    $input: UpdateColorInput!
    $condition: ModelColorConditionInput
  ) {
    updateColor(input: $input, condition: $condition) {
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
export const deleteColor = /* GraphQL */ `
  mutation DeleteColor(
    $input: DeleteColorInput!
    $condition: ModelColorConditionInput
  ) {
    deleteColor(input: $input, condition: $condition) {
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

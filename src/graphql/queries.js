/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNfbBrother = /* GraphQL */ `
  query GetNfbBrother($id: ID!) {
    getNfbBrother(id: $id) {
      id
      email
      city
      commindu
      country
      dutycomm
      fname
      hasPimg
      highscho
      homecity
      homestat
      jersey
      lname
      notes
      phone
      pimg
      positio
      pw
      servcomp
      specposi
      stat
      street
      tickets
      tsAgreement
      tsupdate
      yea
      yearlett
      zip
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNfbBrothers = /* GraphQL */ `
  query ListNfbBrothers(
    $filter: ModelNfbBrotherFilterInput
    $nextToken: String
  ) {
    listNfbBrothers(filter: $filter, limit: 1000, nextToken: $nextToken) {
      items {
        id
        email
        city
        commindu
        country
        dutycomm
        fname
        hasPimg
        highscho
        homecity
        homestat
        jersey
        lname
        notes
        phone
        pimg
        positio
        pw
        servcomp
        specposi
        stat
        street
        tickets
        tsAgreement
        tsupdate
        yea
        yearlett
        zip
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNfbBrothers } from "./graphql/queries";
import {
  createNfbBrother as createNfbBrotherMutation,
  deleteNfbBrother as deleteNfbBrotherMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [nfbBrothers, setNfbBrothers] = useState([]);

  useEffect(() => {
    fetchNfbBrothers();
  }, []);

  async function fetchNfbBrothers() {
    const apiData = await API.graphql({ query: listNfbBrothers });
    const nfbBrothersFromAPI = apiData.data.listNfbBrothers.items;
    await Promise.all(
      nfbBrothersFromAPI.map(async (nfbBrother) => {
        if (nfbBrother.image) {
          const url = await Storage.get(nfbBrother.id);
          nfbBrother.image = url;
        }
        return nfbBrother;
      })
    );
    setNfbBrothers(nfbBrothersFromAPI);
  }

  async function createNfbBrother(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image")
    const data = {
      lname: form.get("lname"),
      fname: form.get("fname"),
      email: form.get("email"),
      yea: form.get("yea"),
      phone: form.get("phone"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.lname, image);
    await API.graphql({
      query: createNfbBrotherMutation,
      variables: { input: data },
    });
    fetchNfbBrothers();
    event.target.reset();
  }

  async function deleteNfbBrother({ id }) {
    const newNfbBrothers = nfbBrothers.filter((nfbBrother) => nfbBrother.id !== id);
    setNfbBrothers(newNfbBrothers);
    await Storage.remove(id);
    await API.graphql({
      query: deleteNfbBrotherMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>Navy Football Brotherhood</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNfbBrother}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="lname"
            placeholder="Last Name"
            label="Last Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="fname"
            placeholder="First Name"
            label="First Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="email"
            placeholder="Email"
            label="Email"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="yea"
            placeholder="Class Year"
            label="Class Year"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="phone"
            placeholder="Phone"
            label="Phone"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end"}}
          />
          <Button type="submit" variation="primary">
            Create Brother
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Brothers</Heading>
      <View margin="3rem 0">
        {nfbBrothers.map((nfbBrother) => (
          <Flex
            key={nfbBrother.id || nfbBrother.lname}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {nfbBrother.lname}
            </Text>
            <Text as="span">{nfbBrother.fname}</Text>
            <Text as="span">{nfbBrother.email}</Text>
            <Text as="span">{nfbBrother.yea}</Text>
            <Text as="span">{nfbBrother.phone}</Text>
            {nfbBrother.image && (
              <Image
                src={nfbBrother.image}
                alt={`visual aid for ${nfbBrother.id}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteNfbBrother(nfbBrother)}>
              Delete Brother
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

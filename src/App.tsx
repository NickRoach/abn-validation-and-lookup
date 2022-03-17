import { ChangeEvent, useState } from "react";
import "./App.css";
import isValidABN from "is-valid-abn";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import constants from "./constants.json";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

function App() {
  const [isValid, setIsValid] = useState<Boolean | undefined>(undefined);
  const [entityName, setEntityName] = useState<string>("...");
  const [entityNameToSave, setEntityNameToSave] = useState<string>("");
  const [businessName, setBusinessName] = useState<[string]>([""]);
  const [wasModified, setWasModified] = useState<Boolean>(false);
  const [reachedElevenChars, setReachedElevenChars] = useState<Boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(false);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.replace(/\s/g, "").length >= 11) {
      setReachedElevenChars(true);
    }
    if (isValidABN(e.target.value)) {
      setIsValid(true);
      const data = await ABNLookup(e.target.value);
      setBusinessName(data.BusinessName);
      setEntityName(data.EntityName);
      setEntityNameToSave(data.EntityName);
      setWasModified(false);
    } else {
      setIsValid(false);
      setEntityName("...");
    }
  };

  const initialStep = 0;
  const steps = [
    {
      element: ".ABNField",
      intro: "Enter a valid ABN in this box",
    },
    {
      element: ".entityName",
      intro:
        "The name of the entity associated with that ABN will appear in this box. You can edit it!",
    },
    {
      element: ".businessNames",
      intro:
        "The registered business names associated with that ABN will appear in this box. Please select one",
    },
  ];

  const ABNLookup = async (ABN: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_ABN_LOOKUP_URL}?guid=${process.env.REACT_APP_API_GUID}&abn=${ABN}`
    );
    return JSON.parse(response.data.slice(9, response.data.length - 1));
  };

  return (
    <div className="App">
      <Steps
        enabled={showSteps}
        steps={steps}
        initialStep={initialStep}
        onExit={() => setShowSteps(false)}
        options={{ hideNext: false }}
      />
      <Stack width="500px" alignSelf={"center"}>
        <Stack mb="10px" spacing="3">
          <Heading>ABN Lookup Demo</Heading>
          <Button onClick={() => setShowSteps(true)}>Take a tour</Button>
          <Text fontWeight={600}>Sample ABNs:</Text>
          <Text>Capilano Honey: 55 009 686 435</Text>
          <Text>GoSource: 41 161 080 146</Text>
          <Text>Woolworths: 88 000 014 675</Text>
        </Stack>
        <Stack width="500px">
          <Heading>Look Up an ABN</Heading>
          <Text fontWeight={600}>Enter an ABN:</Text>
          <input
            autoComplete="off"
            name="ABNField"
            className="ABNField"
            onChange={handleOnChange}
          ></input>
          {isValid !== undefined ? (
            <Text color={isValid ? "black" : "red"} name="textOutput">
              {isValid
                ? `ABN is valid and belongs to ${entityName}`
                : reachedElevenChars && "ABN is not valid"}
            </Text>
          ) : (
            ""
          )}
          <Text></Text>
          <Text fontWeight={600}>Entity Name:</Text>
          <input
            className="entityName"
            name="entityName"
            value={entityNameToSave}
            onChange={(e) => {
              setEntityNameToSave(e.target.value);
              setWasModified(true);
            }}
          />
          <Text name="isModified">
            Was modified: {wasModified ? "true" : "false"}
          </Text>
          <Text fontWeight={600}>Business names:</Text>
          <select className="businessNames">
            {businessName.map((name) => {
              return <option value={name || ""}>{name || ""}</option>;
            })}
            ;
          </select>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;

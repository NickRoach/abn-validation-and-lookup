
import { ChangeEvent, useState } from 'react';
import './App.css';
import isValidABN from 'is-valid-abn';
import { Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import constants from './constants.json'

function App() {

  const [isValid, setIsValid] = useState<Boolean | undefined>(undefined);
  const [entityName, setEntityName] = useState<string>('...');
  const [entityNameToSave, setEntityNameToSave] = useState<string>('');
  const [wasModified, setWasModified] = useState<Boolean>(false);
  const [reachedElevenChars, setReachedElevenChars] = useState<Boolean>(false);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.replace(/\s/g, '').length >= 11){
      setReachedElevenChars(true);
    }
    if(isValidABN(e.target.value)){
      setIsValid(true);
      ABNLookup(e.target.value);
    } else {
      setIsValid(false);
      setEntityName('...');
    }
  }

  const ABNLookup = async (ABN: string) => {
    const response = await axios.get(`${constants["ABN_LOOKUP_URL"]}?guid=${constants.API_GUID}&abn=${ABN}`)
    const slicedData = response.data.slice(9, response.data.length - 1);
    setEntityName(JSON.parse(slicedData).EntityName);
    setEntityNameToSave(JSON.parse(slicedData).EntityName);
    setWasModified(false);
  }

  return (
    <div className='App'>
      <Stack width='500px' alignSelf={'center'}>
        <Stack mb='10px' spacing='3'>
          <Heading>ABN Lookup API Test Harness</Heading>
          <Text fontWeight={600}>Sample ABNs:</Text>
          <Text>Capilano Honey: 55 009 686 435</Text>
          <Text>GoSource: 41 161 080 146</Text>
          <Text>Woolworths: 88 000 014 675</Text>
        </Stack>
        <Stack width="500px">
          <Heading>Look Up an ABN</Heading>
          <Text fontWeight={600}>Enter an ABN:</Text>
          <input autoComplete='off' name='ABNField' className="inputBox" onChange={handleOnChange}></input>
          {isValid !== undefined ? (
            <Text color={isValid ? 'black':'red'} name="textOutput">{isValid ? `ABN is valid and belongs to ${entityName}` : reachedElevenChars && 'ABN is not valid'}
          </Text>) : ''}
          <Text></Text>
          <Text fontWeight={600}>Entity Name:</Text>
          <input className="inputBox" name="entityName" value={entityNameToSave} onChange={(e) => {
              setEntityNameToSave(e.target.value);
              setWasModified(true);
            }
          } />
          <Text name="isModified">Was modified: {wasModified ? 'true' : 'false'}</Text>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;

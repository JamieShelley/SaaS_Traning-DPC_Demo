import { Autocomplete, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { JsonComponentProcessor } from '~components/organisms/JsonComponentProcessor/JsonComponentProcessor';

import { CallbackFunctionNames } from '~constants/functionNames.callbacks';

import { useGlobalState } from '~contexts/Global/GlobalProvider';
import { useUser } from '~contexts/User/UserProvider';

import { switchGotDataToType } from '~utils/WidgetDataFunctions';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

import { DropdownAutocompleteCallbacks } from './DropdownAutocomplete.callbacks';

const {
  BROADCAST_SELECTED,
  SET_TO_DATA_CACHE,
  GET_FROM_DATA_CACHE,
  ADD_NEW_ENTRY_TO_TABLE,
  UPDATE_TABLE_ENTRY,
  GET_DATA,
  ON_LOAD,
  ON_NEW_OR_UPDATE_ENTRY_ENABLED
} = CallbackFunctionNames;


export interface IDropdownAutocompleteProps {
  itemName: string;
  label: string;
  dataProcessingConfig?: { key };
  dynamicButton?: any;
  styles?: { [key: string]: string };
  focusedEntityTypeStr: 'Matter' | 'FileInfo' | 'NewFolder' | 'Client' | 'Case' //Add more as needed
}

export const DropdownAutocomplete = ({
  itemName,
  label,
  dataProcessingConfig,
  dynamicButton,
  styles,
  focusedEntityTypeStr
}: IDropdownAutocompleteProps) => {


  if (focusedEntityTypeStr === undefined) {
    throw Error('ERROR: the prop \'focusedEntityTypeStr\' must be supplied from itemName: ' +itemName);
  }


  const user = useUser();
  const global = useGlobalState();
  const { sessionId, sessionToken } = useUser();

  const { doNotifyMessage } = global;
  const functionCallbacks = DropdownAutocompleteCallbacks(dataProcessingConfig, user, global, sessionId, sessionToken );
  const [options, setOptions] = useState<any[]>([]);
  const [displayKey, setDisplayKey] = useState<string>();
  const [currentEntity, setCurrentEntity] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [newOrUpdateAction, setNewOrUpdateAction] = useState<'update' | 'new' | null>(null);
  const [existingEntry, setExistingEntry] = useState<any | null>(null);
  const [newOrUpdateEntryEnabled, setNewOrUpdateEntryEnabled] = useState<boolean | null>(null);


  const onGetDataComplete = (resp: any, labelKey: string) => {
    const opts = [];
    setDisplayKey(labelKey);
    const { value: valArr } = resp.data;
    //AZURE
    if (valArr) {
      valArr.forEach((val) => {
        const parsedData = JSON.parse(val.Data);

        if (parsedData[labelKey]) {
          opts.push({ [labelKey]: parsedData[labelKey], rowKey: val.RowKey });
        }
        //return opts;
      });
    }
    else   //AWS
    {
      resp.data.forEach((val) => {

        const parsedData = val;
        if (parsedData[labelKey]) {
          opts.push({ [labelKey]: parsedData[labelKey], rowKey: val.id });
        }
      });

    }

    setOptions(opts);
  };

  useEffect(() => {

    function onGetFromGlobalCacheDataComplete(data, config: { 'rootKey': string, 'subKey': string }) {
      if (!Object.is(currentEntity, data) || currentEntity === null) {
        const keys = Object.keys(data);
        if (keys.includes(config.subKey)) {
          const curVal = data[config.subKey];
          if (curVal !== undefined && curVal !== null) {
            setDisplayKey(config.subKey);
            setCurrentEntity(switchGotDataToType(focusedEntityTypeStr, data, config));
          }
        }
        else {
          setDisplayKey(config.subKey);
          data = {};
          data[config.subKey] = '';
          setCurrentEntity(switchGotDataToType(focusedEntityTypeStr, data, config));
        }
      }
    }


    if (currentEntity === null || currentEntity === undefined) {
      {
        const getFromGlobalDataCachefn: Function | undefined = functionCallbacks.get(GET_FROM_DATA_CACHE);
        if (getFromGlobalDataCachefn !== undefined) {
          getFromGlobalDataCachefn(onGetFromGlobalCacheDataComplete);
        }
      }
    }

    if (newOrUpdateEntryEnabled === null) {
      GetNewOrUpdateEntryEnabled();
    }

  }, [currentEntity, displayKey, focusedEntityTypeStr, functionCallbacks, newOrUpdateEntryEnabled]);

  const broadcastChanges = (value: any) => {



    const broadcastFn: Function | undefined = functionCallbacks.get(BROADCAST_SELECTED);
    if (broadcastFn !== undefined) {
      if (options.includes(value)) {
        broadcastFn(value);
      }
    }

    const setCacheFn: Function | undefined = functionCallbacks.get(SET_TO_DATA_CACHE);
    if (setCacheFn !== undefined) {
      if (options.includes(value)) {
        setCacheFn(value);
      }
    }
  };

  const fetchOptions = () => {
    const getDataFn = functionCallbacks.get(GET_DATA);
    if (getDataFn !== undefined) {
      getDataFn(onGetDataComplete);
    }

    const onLoadFn = functionCallbacks.get(ON_LOAD);
    if (onLoadFn !== undefined) {
      onLoadFn(onGetDataComplete);
    }



  };

  const onEntryCreateFailure = () => {
    fetchOptions();
    setExistingEntry(currentEntity);
  };


  const onEntryUpdateComplete = (success) => {
    if (success === true) {
      doNotifyMessage('Create new entry success!');
    } else {
      doNotifyMessage('Create new entry failed!');
    }
    fetchOptions();
    setExistingEntry(currentEntity);
  };


  const onEntryCreateSuccess = () => {
    fetchOptions();
    setExistingEntry(currentEntity);
  };

  const onSelectionChange = (value: any) => {
    if (!value) {
      setExistingEntry(null);
    } else {
      if (options.includes(value)) {
        setExistingEntry(value);
      }
    }

    setCurrentEntity(value);
    broadcastChanges(value); //this is the root cause of the bug!
  };

  const onInputChange = (value: string) => {

    let currSelection = value ? options.find((opt) => opt[displayKey] === value) : undefined;
    if (currSelection !== undefined) {
      if (!existingEntry) {
        setExistingEntry(currSelection);
      }
    } else {
      currSelection = { [displayKey]: value };
      setCurrentEntity(currSelection);
    }

  };

  const onEnterKey = () => {
    if (currentEntity) {
      const alreadyExist = options.includes(currentEntity);
      let existingWithKeySame = false;
      if (existingWithKeySame !== undefined) {
        existingWithKeySame = (currentEntity[displayKey] === existingWithKeySame[displayKey]);
      }
      if (
        !alreadyExist && !existingWithKeySame) {
        if (newOrUpdateEntryEnabled === true) {
          setNewOrUpdateAction('update');
          setConfirmOpen(true);
        }
        else
        {
          setNewOrUpdateAction('new');
          setConfirmOpen(true);
        }
      } else {
        console.log('newOrUpdateEntryEnabled is null or false, new /update existing entry is disabled');
      }
    }
  };

  const GetNewOrUpdateEntryEnabled = () => {
    function onResult(result) {
      setNewOrUpdateEntryEnabled(result);
    }
    const onNewEntryOrUpdateEnabled: Function | undefined = functionCallbacks.get(ON_NEW_OR_UPDATE_ENTRY_ENABLED);
    if (onNewEntryOrUpdateEnabled !== undefined) {
      onNewEntryOrUpdateEnabled(onResult);
    } else {
      setNewOrUpdateEntryEnabled(false); //Default is false
    }
  };

  const onCloseNewOrUpdateEntryDialog = (isConfirmed: boolean, config: 'update' | 'new' | null) => {
    setConfirmOpen(false);

    if (!isConfirmed) {
      setCurrentEntity(existingEntry);
      broadcastChanges(existingEntry);
      return;
    }

    if (config === 'update') {
      const updateTableEntryFn: Function | undefined = functionCallbacks.get(UPDATE_TABLE_ENTRY);
      if (updateTableEntryFn !== undefined) {
        updateTableEntryFn(existingEntry.rowKey, currentEntity[displayKey], onEntryUpdateComplete);
      }
    } else if (config === 'new') {
      const addNewTableEntryFn: Function | undefined = functionCallbacks.get(ADD_NEW_ENTRY_TO_TABLE);
      if (addNewTableEntryFn !== undefined) {
        addNewTableEntryFn(currentEntity[displayKey], onEntryCreateFailure, onEntryCreateSuccess);
      }
    }
  };


  const labelContent = currentEntity === undefined || currentEntity === null ? 'N/A' : (currentEntity[displayKey]);
  if (!(typeof labelContent === 'string')) {
    doNotifyMessage('currentEntity not assigned, possbile error detected');
    //throw Error('ERROR: labelContent is of type:' + (typeof labelContent) + ' should be string type');
  }
  return (
    <div
      id={itemName}
      className="my-4"
    >
      <div className="flex flex-row justify-between items-end">
        <div className="flex-1">
          <label className="mb-2 block">{label}: {labelContent}</label>
          <Autocomplete
         
            disablePortal
            id={`autocomplete-${itemName}`}
            options={options}
            getOptionLabel={(option) => option[displayKey] ?? ''}
            renderInput={(params) => <TextField {...params} />}
            onFocus={fetchOptions}
            sx={{ ...styles }}
            onChange={(_, v) => onSelectionChange(v)}
            onInputChange={(_, v) => onInputChange(v)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onEnterKey();
              }
            }}
            value={(currentEntity !== null && currentEntity !== undefined) ? currentEntity : ''}
            isOptionEqualToValue={(option, value) => option === value}

          />
        </div>

        {dynamicButton && JsonComponentProcessor(dynamicButton)}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        config={newOrUpdateAction}
        onCloseCb={(isConfirmed, config) => {
          onCloseNewOrUpdateEntryDialog(isConfirmed, config);
        }}
      >
        {newOrUpdateAction === 'update' && (
          <>
            <DialogTitle>Changed data alert</DialogTitle>
            <div> Would you like to update this entry?</div>
          </>
        )}
        {newOrUpdateAction === 'new' && (
          <>
            <DialogTitle>New Entry!</DialogTitle>
            <div> Would you like to add this as a new entry?</div>
          </>
        )}
      </ConfirmDialog>
    </div>
  );
};
import { CallbackFunctionNames } from '~constants/functionNames.callbacks';


import {
  BroadcastSelectedAs,
  SetToGlobalDataCache,
  DoNewEntryAddToTable,
  OnChangeEntryUpdateTable,
  GetData,
  GetDataFromlocalCache,
  GetFromGlobalDataCache,
  IsNewEntryEnabled
} from '~utils/WidgetDataFunctions';




export const DropdownAutocompleteCallbacks = (
  dataProcessingConfig: any,
  user: any,
  global: 'any',
  sessionId: string,
  sessionToken : string
): Map<string, Function> => {
  const functionMap = new Map<string, Function>();

  const {
    ON_CHANGE,
    ON_LOAD_PLACEHOLDER,
    ON_LOAD,
    GET_DATA,
    BROADCAST_SELECTED,
    SET_TO_DATA_CACHE,
    GET_FROM_DATA_CACHE,
    ADD_NEW_ENTRY_TO_TABLE,
    UPDATE_TABLE_ENTRY,
    ON_NEW_OR_UPDATE_ENTRY_ENABLED
  } = CallbackFunctionNames;

  const dpc: string[] = Object.keys(dataProcessingConfig);
  
  const cloudProvider = 'AWS'; //Hardcoded


  if (dpc.includes(ON_NEW_OR_UPDATE_ENTRY_ENABLED)) {
    functionMap.set(ON_NEW_OR_UPDATE_ENTRY_ENABLED, (onResult: Function) =>
      IsNewEntryEnabled(dataProcessingConfig[ON_NEW_OR_UPDATE_ENTRY_ENABLED], onResult)
    );
  }

  if (dpc.includes(ON_CHANGE)) {
    const subKeys = Object.keys(dataProcessingConfig[ON_CHANGE]);

    if (subKeys.includes(BROADCAST_SELECTED)) {
      functionMap.set(BROADCAST_SELECTED, (value: any) =>
        BroadcastSelectedAs(dataProcessingConfig[ON_CHANGE][BROADCAST_SELECTED], value, global)
      );
    }
    if (subKeys.includes(SET_TO_DATA_CACHE)) {
      functionMap.set(SET_TO_DATA_CACHE, (value: any) =>
        SetToGlobalDataCache(dataProcessingConfig[ON_CHANGE][SET_TO_DATA_CACHE], value, global)
      );
    }
    if (subKeys.includes(ADD_NEW_ENTRY_TO_TABLE)) {
      functionMap.set(ADD_NEW_ENTRY_TO_TABLE, (value: any, onFailure: Function, onSuccess: Function) =>
        DoNewEntryAddToTable(
          'MOCKUSERNAME',
          'MOCKUSERLEVEL',
          value,
          dataProcessingConfig[ON_CHANGE][ADD_NEW_ENTRY_TO_TABLE],
          cloudProvider,
          global,
          onFailure,
          onSuccess
        )
      );
    }
    if (subKeys.includes(UPDATE_TABLE_ENTRY)) {
      functionMap.set(
        UPDATE_TABLE_ENTRY,
        (recordRowKey: any, newValue: any, entity: any, onComplete: Function) =>
          OnChangeEntryUpdateTable(
            'MOCKUSERNAME',
            'MOCKUSERLEVEL',
            recordRowKey,
            newValue,
            entity,
            dataProcessingConfig[ON_CHANGE][UPDATE_TABLE_ENTRY],
            cloudProvider,
            onComplete,
          )
      );
    }
  }

  if (dpc.includes(GET_DATA)) {
    functionMap.set(GET_DATA, (onGetDataCompleteCallback: Function) =>
      GetData(
        'MOCKUSERNAME',
        'MOCKUSERLEVEL',
        dataProcessingConfig[GET_DATA],
        onGetDataCompleteCallback,
        cloudProvider,
        global,
        sessionId,
        sessionToken

      )
    );
  }

  if (dpc.includes(ON_LOAD)) {
    const subKeys = Object.keys(dataProcessingConfig[ON_LOAD]);

    if (subKeys.includes(GET_FROM_DATA_CACHE)) {
      functionMap.set(GET_FROM_DATA_CACHE, (onGotData: Function) =>
        GetFromGlobalDataCache(dataProcessingConfig[ON_LOAD][GET_FROM_DATA_CACHE], global, onGotData)
      );
    }
  }


  if (dpc.includes(ON_LOAD_PLACEHOLDER)) {
    functionMap.set(ON_LOAD_PLACEHOLDER, () =>
      GetDataFromlocalCache(dataProcessingConfig[ON_LOAD_PLACEHOLDER])
    );
  }

  return functionMap;
};
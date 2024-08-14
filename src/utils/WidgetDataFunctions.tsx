import { format } from 'date-fns';

import { MockDataSync } from '~components/MockDataSync';



import { IClient } from '~entities/CIlient';
import { ICase } from '~entities/Case';
import { IFileInfoEntry } from '~entities/FileInfoEntry.interface';
import { IMatter } from '~entities/Matter.interface';
import { INewFolder } from '~entities/NewFolder.interface';
import { IRenameFolder } from '~entities/RenameFolder.interface';


const ds: MockDataSync = new MockDataSync('');

export function GenHash(seed: string) {
  return ds.GenHash(seed);
}

export function switchGotDataToType(focusedEntityTypeStr, data, config) {
  let currentEntity = {};
  try {
    switch (focusedEntityTypeStr) {
      case ('Matter'): {
        const ent: IMatter = {
          Name: '',
          Goal: '',
          CurrentStatusInfo: '',
          ToDo_Notes: '',
          Summary: '',
          Status_ActiveOrDeadfiled: '',
          LinkedCaseNos: [],
          AssignedAssociate: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
      case ('FileInfo'): {
        const ent: IFileInfoEntry = {
          fileUID: '',
          fileName: '',
          usernameOwner: '',
          userLevel: '',
          otherUsersCanRead: [],
          otherUsersCanWrite: [],
          therUsersCanDelete: [],
          dateAdded: {
            MM: 0,
            DD: 0,
            YYYY: 0
          },
          timeAdded: {
            hh: 0,
            mm: 0
          },
          associatedMatterName: '',
          virtualFolder: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
      case ('NewFolder'): {

        const ent: INewFolder = {
          Name: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
      case ('RenameFolder'): {

        const ent: IRenameFolder = {
          Name: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
      case ('Client'): {
        const ent: IClient = {
          Name: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
      case ('Case'): {
        const ent: ICase = {
          Name: ''
        };
        ent[config.subKey] = data[config.subKey];
        currentEntity = ent;
        break;
      }
    }
  }
  catch {
    return currentEntity;
  }
  return currentEntity;
}

//property spec: https://docs.microsoft.com/en-us/rest/api/storageservices/understanding-the-table-service-data-model
export function GetData(
  username,
  userLevel: string,
  doGetDataCommand: any,
  onGetDataCompleteCallback: Function,
  cloudProvider: string,
  globalContext: any,
  sessionId: string,
  sessionToken: string,
) {

  const tableName = doGetDataCommand['TableName'] ?? doGetDataCommand['tableName'];

  if (cloudProvider === 'AZURE') {
    const password: string = ds.GenHash(ds.GetAPPUID());
    const partitionKey = username;
    const rowkey = doGetDataCommand['RowKey'] ?? doGetDataCommand['rowKey'];
    const maxEntries = 1000000;

    return ds.GetDataAzure(
      partitionKey,
      rowkey,
      maxEntries,
      tableName,
      password,
      userLevel,
      onGetDataCompleteCallback,
      doGetDataCommand['DisplayKey'] ?? doGetDataCommand['displayKey'],
      globalContext
    );
  }

  if (cloudProvider === 'AWS') {

    const awsPassword = 'C3Ufkesg?-y%26rT]qx4()KG@Ucp_Gn/';

    const queryMetaData = 'Some query data';
    return ds.GetDataAWS(
      queryMetaData,
      tableName.toLowerCase(),
      awsPassword,
      userLevel,
      onGetDataCompleteCallback,
      doGetDataCommand['DisplayKey'] ?? doGetDataCommand['displayKey'],
      globalContext,
      sessionId,
      sessionToken
    );

  }
}

export function doCustomButtonClick(config: any) {
  /* eslint-disable no-console */
  console.log('doCustomButton Clicked', config);
}

//In this case, the function is directly included in the data, and doesn't need further processing/setup
export function doDirectFunctionCall(functionEntry: any, index: number) {
  try {
    functionEntry(index);
  } catch (e) {
    console.log('doDirectFunctionCall.ERROR functionEntry is not valid');
  }
}

export function SetData(
  username,
  userLevel: string,
  doSetDataCommand: {
    rowKey: string;
    validFromDate: string;
    tableName: string;
    data: unknown;
    associatedMatterName: string;
  },
  cloudProvider
) {

  const password: string = ds.GenHash(ds.GetAPPUID());

  if (cloudProvider === 'AZURE') {
    const partitionKey = username;
    let rowkey = doSetDataCommand['rowKey'];
    const tableName = doSetDataCommand['tableName'];
    const password: string = ds.GenHash(ds.GetAPPUID());

    if (rowkey === undefined || rowkey.length === 0) {
      rowkey = format(new Date(), 'dd:MM:yyyy:HH:mm');
    }

    if (password.length > 0) {
      const res = ds.SetDataAzure(
        partitionKey,
        rowkey,
        doSetDataCommand['validFromDate'],
        doSetDataCommand['data'],
        tableName,
        password,
        userLevel,
        doSetDataCommand['associatedMatterName']
      );
      return {
        result: res,
        'rowKey': rowkey
      };
    }
  }

  if (cloudProvider === 'AWS') {
    const awsPassword = 'C3Ufkesg?-y%26rT]qx4()KG@Ucp_Gn/';
    const partitionKey = username;
    let rowkey = doSetDataCommand['rowKey'];
    const tableName = doSetDataCommand['tableName'];

    if (rowkey === undefined || rowkey.length === 0) {
      rowkey = format(new Date(), 'dd:MM:yyyy:HH:mm');
    }

    if (password.length > 0) {

      const queryMetaData = 'Some query data';

      const res = ds.SetDataAws(
        queryMetaData,
        doSetDataCommand['validFromDate'],
        doSetDataCommand['data'],
        tableName,
        awsPassword,
        userLevel,
        doSetDataCommand['associatedMatterName']
      );
      return {
        result: res,
        'rowKey': rowkey
      };
    }
  }

}

//Never really tested/used ..thus far.. may be redundant
export function DeleteData(username: string, userLevel: string, dodeleteDataCommand: any) {
  const partitionKey = username;
  const rowkey = dodeleteDataCommand['RowKey'];
  const tableName = dodeleteDataCommand['TableName'];

  const password: string = ds.GenHash(ds.GetAPPUID());
  const awsPassword = 'C3Ufkesg?-y%26rT]qx4()KG@Ucp_Gn/';

  console.log('TODO FOR AWS...');
  if (password.length > 0) {
    return ds.DeleteData(partitionKey, rowkey, tableName, password, userLevel);
  }
}

export function DoTestFunction(doTestFunctionClickCammnd: any, allAccountDetails) {
  if (doTestFunctionClickCammnd === 'DoAzureStorageTests') {
    //doDownloadTests(allAccountDetails);
  }
}

export function DoGoto(gotoCommand: any) {
  console.log('gotoCommand:', gotoCommand);
  new BroadcastChannel('tabCommand_Channel').postMessage(gotoCommand.goTo);
}

export function GetDataFromlocalCache(config: { rootKey: string; subKey: string }) {
  try {
    const localData = localStorage.getItem(config.rootKey);
    if (localData === undefined) {
      return '';
    } else {
      return JSON.parse(localData); //If found, convert to object
    }
  } catch {
    return '';
  }
}

export function DoFunctionCall(functionToCall: Function, index = -1) {
  functionToCall(index);
}

export function IsNewEntryEnabled(newEntryCmd: { enabled: boolean }, onResult: Function) {
  onResult(newEntryCmd.enabled);
}

export function BroadcastSelectedAs(
  broadcastCmd: { channelName: string; payloadKey: string },
  value,
  globalContext
) {
  try {
    if (window) {
      const pKeyLen = broadcastCmd.payloadKey.length;
      //If payload key entry, get subtype and send
      if (pKeyLen > 0) {
        if (value.hasOwnProperty(broadcastCmd.payloadKey)) {
          const payload = value[broadcastCmd.payloadKey];
          if (!(typeof payload === 'string')) {
            throw Error('BroadcastSelectedAs.ERROR: payload is not string type!');
          }
          const channel = new BroadcastChannel(broadcastCmd.channelName);
          channel.postMessage(payload);
        } else {
          //globalContext.doNotifyMessage(`BroadcastSelectedAs -> ${broadcastCmd.payloadKey} not found in ${JSON.stringify(value)}`);
          console.log(`BroadcastSelectedAs -> ${broadcastCmd.payloadKey} not found in ${JSON.stringify(value)}`);
        }

      } else //Else send whole payload 
      {
        const payload = value;
        const channel = new BroadcastChannel(broadcastCmd.channelName);
        channel.postMessage(payload);
      }
    }
  } catch (e) {
    //globalContext.doNotifyMessage(`BroadcastSelectedAs -> ${broadcastCmd.payloadKey} not found in ${JSON.stringify(value)}`);
    console.log(`BroadcastSelectedAs -> ${broadcastCmd.payloadKey} not found in ${JSON.stringify(value)}`);
  }
}

export function SetToGlobalDataCache(
  config: { rootKey: string; subKey: string },
  data,
  globalContext: any
) {
  try {
    // globalContext.doNotifyMessage('Mock SetToGlobalDataCache executed');
    console.log('Mock SetToGlobalDataCache executed');
  } catch (e) {
    // globalContext.doNotifyMessage('SetToGlobalDataCache -> unhandled exception!');
    console.log('SetToGlobalDataCache -> unhandled exception!');
  }
}

export function GetFromGlobalDataCache(config: { rootKey: string; subKey: string }, globalContext: any, onGotData: Function) {
  try {
    const retreivedData = undefined;
    //
    //globalContext.doNotifyMessage('Mock GetFromGlobalDataCache executed');
    console.log('Mock GetFromGlobalDataCache executed');
  } catch (e) {
    //globalContext.doNotifyMessage('GetFromGlobalDataCache -> unhandled exception!');
    console.log('GetFromGlobalDataCache -> unhandled exception!');
  }
}

export async function DoNewEntryAddToTable(
  username: string,
  userLevel: string,
  newdata,
  config: {
    tableName: string;
    entityToCreate: string;
    entryAssignsToField: string;
  },
  cloudProvider: string,
  globalContext,
  onFailure: Function,
  onSuccess: Function | null

) {
  const nowDate = new Date();
  let foundValidType = false;
  let newDataEntry = {};
  console.log('config:', config);
  switch (config['entityToCreate']) {

    case ('Matter'): {
      foundValidType = true;
      const newEntry: IMatter = {
        Name: '',
        Goal: '',
        CurrentStatusInfo: '',
        ToDo_Notes: '',
        Summary: '',
        Status_ActiveOrDeadfiled: '',
        LinkedCaseNos: [],
        AssignedAssociate: ''
      };
      newEntry[config['entryAssignsToField']] = newdata;
      newDataEntry = newEntry;
      break;
    }

    case ('FileInfo'): {
      foundValidType = true;
      const m = (nowDate.getMonth());
      const d = nowDate.getDate();
      const min = nowDate.getMinutes();
      const hr = nowDate.getHours();
      const newEntry: IFileInfoEntry = {
        fileUID: '',
        fileName: '',
        virtualFolder: '',
        usernameOwner: username,
        userLevel: userLevel,
        otherUsersCanRead: [],
        otherUsersCanWrite: [],
        therUsersCanDelete: [],
        dateAdded: {
          MM: m,
          DD: d,
          YYYY: nowDate.getFullYear()
        },
        timeAdded: {
          hh: hr,
          mm: min
        },
        associatedMatterName: ''

      };
      newEntry[config['entryAssignsToField']] = newdata.filename; //Should set fileName
      newEntry.fileUID = newdata.uid; //Should set uid
      newEntry.associatedMatterName = newdata.ascMatterName;
      newDataEntry = newEntry;
      break;
    }
  }

  if (foundValidType === true) {
    const doSetDataCommand = {
      rowKey: newdata.uid,
      validFromDate: format(nowDate, 'yyyy-MM-dd') + 'T' + format(nowDate, 'hh:mm:ss'),
      tableName: config['tableName'],
      data: newDataEntry,
      associatedMatterName: 'N/A'
    };
    //Mock
    const result = {
      result : true,
      rowKey : 'test'
    };// await SetData(username, userLevel, doSetDataCommand, cloudProvider);
    //globalContext.doNotifyMessage('Mock DoNewEntryAddToTable executed');
    console.log('Mock DoNewEntryAddToTable executed');

    if (result.result === true) {
      if (onSuccess !== null || onSuccess !== undefined) {
        await onSuccess(result.rowKey);
      } else {
        await onFailure();
      }
    }
  } else {
    await onFailure();
    // globalContext.doNotifyMessage(
    //   `${config['entityToCreate']}
    //     not supported, please update 'DoNewEntryAddToTable' function or the source config.json`
    // );
    console.log(
      `${config['entityToCreate']}
        not supported, please update 'DoNewEntryAddToTable' function or the source config.json`
    );

    return false;
  }
}

export async function OnChangeEntryUpdateTable(
  username: string,
  userLevel: string,
  recordRowKey: string,
  newValueOfEntity: any,
  entity: any,
  config: {
    tableName: string;
    entryUpdatesToField: string;
    openDialogToConfirm: boolean;
  },
  cloudProvider,
  onComplete: Function
) {
  try {
    if (recordRowKey) {

      const nowDate = new Date();
      entity[config['entryUpdatesToField']] = newValueOfEntity;

      const doSetDataCommand = {
        rowKey: recordRowKey,
        validFromDate: format(nowDate, 'yyyy-MM-dd') + 'T' + format(nowDate, 'hh:mm:ss'),
        tableName: config.tableName,
        data: entity,
        associatedMatterName: 'N/A'
      };
      console.log('Mock OnChangeEntryUpdateTable executed');
      //await SetData(username, userLevel, doSetDataCommand, cloudProvider);
      return onComplete(true);
    }
  } catch {
    return onComplete(false);
  }
}


export async function AuthCommand(
  commandName: string,
  data: any,
  cloudProvider: string,
  onCompleteCallback: Function
) {

  if (cloudProvider === 'AWS') {


    return await ds.DoAuthAWSCommand(
      data,
      commandName,
      onCompleteCallback
    );
  }
  else {
    return 'Only supports aws as cloud provider!';
  }
}

export async function UsersCommand(
  commandName: string,
  data: any,
  cloudProvider: string,
  onCompleteCallback: Function
) {

  if (cloudProvider === 'AWS') {

    return await ds.DoUsersAWSCommand(
      data,
      commandName,
      onCompleteCallback
    );
  }
  else {
    return 'Only supports aws as cloud provider!';
  }
}

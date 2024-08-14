//import axios, { AxiosRequestConfig } from 'axios';
import  { AxiosRequestConfig } from 'axios';
import Hashes from 'jshashes';
import { Component } from 'react';
import { format } from 'react-string-format';

const rootURLAzure = 'https://lomandataiofunction.azurewebsites.net/api/DataIOHttpTrigger';
const rootURLAWS = 'https://7d0giew5f7.execute-api.us-west-1.amazonaws.com/v1/lomanapi';

//Database entityInterfaces per table:

export const APPUID = '$2a$12$B/VsiRuQ1FjtuNhVMS4mzexTdcljXT4F9dtvhmUiNx7zy00iwOg5y';

export class MockDataSync extends Component {
  constructor(props: unknown | Readonly<unknown>) {
    super(props);
    this.state = {};
  }

  public GetAPPUID(): string {
    return APPUID;
  }

  public SetDataAzure(
    partitionkey: string,
    rowKey: string,
    validFromDate: string,
    data: unknown,
    tableName: string,
    password: string,
    permissionLevel: string,
    associatedMatterName: string
  ): boolean {
    return this.SetData_Azure(
      partitionkey,
      rowKey,
      validFromDate,
      data,
      tableName,
      password,
      permissionLevel,
      associatedMatterName
    );
  }

  public GetDataAzure(
    partitionkey: string,
    rowkey: string,
    Optional_MaxTopEntries = 10,
    tableName: string,
    password: string,
    permissionLevel: string,
    onCompleteCallback: Function,
    displayKey: string,
    globalContext?: any
  ): boolean {
    return this.GetData_Azure(
      partitionkey,
      rowkey,
      Optional_MaxTopEntries,
      tableName,
      password,
      permissionLevel,
      onCompleteCallback,
      displayKey,
      globalContext
    );
  }

  public SetDataAws(
    queryMetaData: string,
    validFromDate: string,
    data: unknown,
    tableName: string,
    password: string,
    permissionLevel: string,
    associatedMatterName: string
  ): boolean {
    return this.SetData_AWS(
      queryMetaData,
      validFromDate,
      data,
      tableName.toLowerCase(),
      password,
      permissionLevel,
      associatedMatterName
    );
  }


  public GetDataAWS(
    queryMetaData: string,
    tableName: string,
    password: string,
    permissionLevel: string,
    onCompleteCallback: Function,
    displayKey: string,
    globalContext: any,
    sessionId: string,
    sessionToken: string
  ): boolean {
    return this.GetData_AWS(
      queryMetaData,
      tableName,
      password,
      permissionLevel,
      onCompleteCallback,
      displayKey,
      globalContext,
      sessionId,
      sessionToken
    );
  }

  public DeleteData(
    partitionkey: string,
    rowkey: string,
    tableName: string,
    password: string,
    permissionLevel: string
  ): boolean {
    return this.DeleteData_Azure(partitionkey, rowkey, tableName, password, permissionLevel);
  }

  private DeleteData_Azure(
    partitionkey: string,
    rowkey: string,
    tableName: string,
    password: string,
    permissionLevel: string
  ): boolean {
    const payload = {
      PartitionKey: partitionkey,
      RowKey: rowkey,
      PermissionLevel: permissionLevel
    };
    const url = format(
      '{0}?FunctionCmd=DeleteData&TableName={1}&Password={2}',
      rootURLAzure,
      tableName,
      password
    );

    const options: AxiosRequestConfig = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };

    //try {
    //   axios(options).catch(function (error) {
    //     //eslint-disable-next-line
    //     console.error(error);
    //   });
    //   return true;
    // } catch (error) {
    //   return false;
    // }
    console.log('DeleteData_Azure MOCK CALLED');
  }


  private GetData_Azure(
    partitionkey: string,
    rowkey: string,
    Optional_MaxTopEntries = 10,
    tableName: string,
    password: string,
    permissionLevel: string,
    onCompleteCallback: Function,
    displayKey: string,
    globalContext?: any
  ): any {
    if (onCompleteCallback !== undefined) {
      const payload = {
        PartitionKey: partitionkey,
        Optional_MaxTopEntries: Optional_MaxTopEntries,
        RowKey: rowkey,
        PermissionLevel: permissionLevel
      };
      const url = format(
        '{0}?FunctionCmd=GetData&TableName={1}&Password={2}',
        rootURLAzure,
        tableName,
        password
      );

      const options: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: payload
      };
      //   try {
      //     axios(options)
      //       .then(function (response) {
      //         onCompleteCallback(response, displayKey, globalContext);
      //         return true;
      //       })
      //       .catch(function (error) {
      //         //eslint-disable-next-line
      //         console.error(error);
      //       });
      //   } catch (error) {
      //     return false;
      //   }

      console.log('GetData_Azure MOCK CALLED');
      const mockData = {

      };
      onCompleteCallback(mockData, displayKey, globalContext);
    }
  }

  private GetData_AWS(
    queryMetaData: string,
    tableName: string,
    password: string,
    permissionLevel: string,
    onCompleteCallback: Function,
    displayKey: string,
    globalContext: any,
    sessionId: string,
    sessionToken: string
  ): any {
    if (onCompleteCallback !== undefined) {
      const payload = {
        QueryMetaData: queryMetaData,
        PermissionLevel: permissionLevel,
        lmnss_session_id: sessionId,
        lmnss_session_token: sessionToken
      };
      const url = format(
        '{0}?FunctionCmd=GetData&TableName={1}',
        rootURLAWS,
        tableName,
      );

      const awsPassword = 'C3Ufkesg?-y&rT]qx4()KG@Ucp_Gn/';

      const options: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Password': awsPassword
        },
        data: payload
      };
      //   try {
      //     axios(options)
      //       .then(function (response) {
      //         onCompleteCallback(response, displayKey, globalContext);
      //         return true;
      //       })
      //       .catch(function (error) {
      //         //eslint-disable-next-line
      //         console.error(error);
      //       });
      //   } catch (error) {
      //     return false;
      //   }
    
      console.log('GetData_AWS MOCK CALLED');
      const mockData = {
        data: [
          {
            'matterName': 'A',
            'id': 0
          },
          {
            'matterName': 'B',
            'id': 1
            
          },
          {
            'matterName': 'C',
            'id': 2
            
          },
          {
            'matterName': 'D',
            'id': 3
          }
          
        ]
      };
      onCompleteCallback(mockData, displayKey, globalContext);
    }
  }

  private SetData_Azure(
    partitionkey: string,
    rowKey: string,
    validFromDate: string,
    data: unknown,
    tableName: string,
    password: string,
    permissionLevel: string,
    associatedMatterName: string
  ) {
    const payload = {
      PartitionKey: partitionkey,
      RowKey: rowKey,
      PermissionLevel: permissionLevel,
      ValidFromDate: validFromDate,
      Data: data,
      AssociatedMatterName: associatedMatterName
    };
    const url = format(
      '{0}?FunctionCmd=SetData&TableName={1}&Password={2}',
      rootURLAzure,
      tableName,
      password
    );

    const options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };

    // try {
    //   axios(options).catch(function (error) {
    //     //eslint-disable-next-line
    //     console.error(error);
    //     return false;
    //   });
    //   return true;
    // } catch (error) {
    //   return false;
    // }
    console.log('SetData_Azure MOCK CALLED');
  }

  private SetData_AWS(
    queryMetaData: string,
    validFromDate: string,
    data: unknown,
    tableName: string,
    password: string,
    permissionLevel: string,
    associatedMatterName: string
  ) {
    const payload = {
      PartitionKey: queryMetaData,
      PermissionLevel: permissionLevel,
      ValidFromDate: validFromDate,
      Data: data,
      AssociatedMatterName: associatedMatterName
    };
    const url = format(
      '{0}?FunctionCmd=SetData&TableName={1}&Password={2}',
      rootURLAWS,
      tableName,
      password
    );



    const options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };

    // try {
    //   axios(options).catch(function (error) {
    //     //eslint-disable-next-line
    //     console.error(error);
    //     return false;
    //   });
    //   return true;
    // } catch (error) {
    //   return false;
    // }
    console.log('SetData_Azure MOCK CALLED');
  }

  public GenHash(seedStr: string): string {
    const SHA256 = new Hashes.SHA256();
    return SHA256.hex(seedStr);
  }

  public DoAuthAWSCommand(
    payload,
    commandName,
    onCompleteCallback: Function,
  ): any {


    const awsPassword = 'C3Ufkesg?-y&rT]qx4()KG@Ucp_Gn/';
    const url = format(
      '{0}?FunctionCmd=AuthCommand&TableName={1}',
      rootURLAWS,
      commandName
    );

    //-----
    const methodType = 'POST';

    const options = {
      method: methodType,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Password': awsPassword
      },
      data: payload
    };

    // try {
    //   axios(options)
    //     .then(function (response) {
    //       onCompleteCallback(response);
    //       return true;
    //     })
    //     .catch(function (error) {
    //       //eslint-disable-next-line
    //       console.error(error);
    //     });
    // } catch (error) {
    //   return false;
    // }
    console.log('DoAuthAWSCommand MOCK CALLED');
  }

  public DoUsersAWSCommand(
    payload,
    commandName,
    onCompleteCallback: Function,
  ): any {


    const awsPassword = 'C3Ufkesg?-y&rT]qx4()KG@Ucp_Gn/';

    const url = format(
      '{0}?FunctionCmd=UsersCommand&TableName={1}',
      rootURLAWS,
      commandName
    );

    //-----
    const methodType = 'POST';

    const options = {
      method: methodType,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Password': awsPassword
      },
      data: payload
    };

    // try {
    //   axios(options)
    //     .then(function (response) {
    //       onCompleteCallback(response);
    //       return true;
    //     })
    //     .catch(function (error) {
    //       //eslint-disable-next-line
    //       console.error(error);
    //     });
    // } catch (error) {
    //   return false;
    // }

    console.log('DoUsersAWSCommand MOCK CALLED');
  }
}
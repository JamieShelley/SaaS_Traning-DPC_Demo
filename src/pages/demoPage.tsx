import { DropdownAutocomplete } from '~components/atoms/DropdownAutocomplete/DropdownAutocomplete';

export function mapFnConfig(dpc: any) {
  return dpc.reduce((agg, item) => {
    agg[item.functionName] = item.config;
    return agg;
  }, {});
}


function Dropdown_Mattername() {

  let featureAllowed = false;

    const dpc = mapFnConfig(
      [
        {
          'functionName': 'onChange',
          'config':
          {
            'broadcastSelectedAs': {
              'channelName': 'CurrentMatterData',
              'payloadKey': ''
            },
            'setToGlobalDataCache': {
              'rootKey': 'FocusedMatter',
              'subKey': 'Name'
            },
            'onNewOrUpdateEntryEnabled': true,
            'onNewEntryAddToTable': {
              'tableName': 'Matters',
              'entityToCreate': 'Matter',
              'entryAssignsToField': 'Name'
            },
            'onChangeEntryUpdateTable': {
              'tableName': 'Matters',
              'entityToCreate': 'Matter',
              'entryUpdatesToField': 'Name',
              'openDialogToConfirm': true
            }
            
          }
        },
        {
          'functionName': 'getData',
          'config': {
            'tableName': 'Matters',
            'rowKey': '',
            'displayKey': 'matterName',
          },
        },
        {
          'functionName': 'onLoadPlaceholderSet',
          'config': {
            'loadFromLocalData': 'SelectedMatter'
          }
        },
        {
          'functionName': 'onLoad',
          'config':
          {
            'getFromGlobalDataCache': {
              'rootKey': 'FocusedMatter',
              'subKey': 'Name'
            }
          }
        }
      ]
    );

    return <DropdownAutocomplete
      itemName='Matter_Name'
      label='Matter Name'
      dataProcessingConfig={dpc}
      dynamicButton={{}
      }
      styles={{
        'color': 'black',
        'backgroundColor': 'grey',
        'fontSize': 'p',
        'width': '600px'
      }}
      focusedEntityTypeStr='Matter'
    />;
  }
}

export default function DemoPage() {
  return (
    <div>
      <Dropdown_Mattername></Dropdown_Mattername>
    </div>
  );
}
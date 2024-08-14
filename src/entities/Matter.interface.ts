export interface IMatter {
  Name: string;
  Goal: string;
  CurrentStatusInfo: string;
  ToDo_Notes: string;
  Summary: string;
  Status_ActiveOrDeadfiled: 'Active' | 'DeadFiled' | '';
  LinkedCaseNos: string[];
  AssignedAssociate: string
}

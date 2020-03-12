import React from 'react';
import JsonTreeViewer from './JsonTreeViewer';

export interface IAuthContentProps {
  api: any;
  user: any;
}

const AuthContent: React.FC<IAuthContentProps> = (props) => {
  const shouldExpandNode = (keyPath: Array<string | number>, data: [any] | {}, level: number) => {
    return true;
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <JsonTreeViewer data={props.user} title="User Profile" shouldExpandNode={shouldExpandNode} />
      </div>
      <div className="col-md-6">
        <JsonTreeViewer data={props.api} title="Api Response" shouldExpandNode={shouldExpandNode} />
      </div>
    </div>
  );
}

export default AuthContent;
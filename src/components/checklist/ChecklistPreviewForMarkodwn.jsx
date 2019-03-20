import React from 'react';
import ChecklistLogicPreview from './markdown-preview/ChecklistLogicPreview';

const ChecklistPreviewForMarkdown = ({ checkListData }) => (
  <React.Fragment>
    {(checkListData && checkListData.sections_data.map(
      (elem, index) => (
        <ChecklistLogicPreview
          key={index.toString()}
          checklistIndex={index}
          checkListData={elem}
        />
      ),
    ))}
  </React.Fragment>
);

export default ChecklistPreviewForMarkdown;

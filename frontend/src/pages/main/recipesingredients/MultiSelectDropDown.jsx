import React from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const objectArray = [
  { key: 'Option 1', value: 'option1' },
  { key: 'Option 2', value: 'option2' },
  { key: 'Option 3', value: 'option3' },
  { key: 'Option 4', value: 'option4' }
];

const App = () => {
  return (
    <div>
    <ReactMultiSelectCheckboxes
      options={objectArray}
      displayValue="key"
      isMulti
      closeMenuOnSelect={false}
      showCheckbox={true}
    />
    </div>
  );
};

export default App;

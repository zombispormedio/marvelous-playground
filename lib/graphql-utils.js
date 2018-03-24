exports.getSelectedFields = ({
  fieldNodes: [{ selectionSet: { selections } }]
}) => selections.map(({ name: { value } }) => value);

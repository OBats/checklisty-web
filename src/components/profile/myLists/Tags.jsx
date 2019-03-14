import React from 'react';
import { Label } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

const getColor = (name, length, max) => {
  const min = (name, c, max) => Math.min(Math.round((name.charCodeAt(c) - 98) / 2), max);
  return Math.min(min(name, 0, 6) + min(name, name.length - 1, 6) - name.length, max);
};

const Tags = ({ tags }) => {
  tags = tags.length > 6 ? tags.splice(0, 5) : tags;
  return (
    <div style={{ marginLeft: '10px' }}>
      {tags.map(tag => (
        <Label key={tag} tag color={colors[getColor(tag, tag.length, colors.length)]}>
          {tag}
        </Label>
      ))}
    </div>
  );
};

export default Tags;

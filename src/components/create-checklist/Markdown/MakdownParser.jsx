export function mdParse(data) {
  const mdValue = data.split('\n');
  const parsedData = [];
  const fullyParsedData = { title: '', sections_data: [] };
  let sectionIndex = -1;
  let itemsDataIndex = -1;
  let isMdValid = false;
  let activeDetailsSection = false;

  for (let index = 0; index < mdValue.length; index += 1) {
    if (mdValue[index]) {
      if (activeDetailsSection === false) {
        if (mdValue[index].startsWith('# ') && fullyParsedData.title === '') {
          fullyParsedData.title = mdValue[index].slice(2).trim();
        }
        if (mdValue[index] && mdValue[index].startsWith('## ')) {
          sectionIndex += 1;
          itemsDataIndex = -1;
          isMdValid = false;

          parsedData.push({
            section_title: mdValue[index].slice(3).trim(),
            items_data: [],
          });
        }
      }

      if (mdValue[index] && parsedData[sectionIndex]) {
        if (activeDetailsSection === false) {
          if (mdValue[index].startsWith('### ')) {
            itemsDataIndex += 1;
            isMdValid = false;
            parsedData[sectionIndex].items_data[itemsDataIndex] = {
              item_title: mdValue[index].slice(4).trim() !== '' ? `${mdValue[index].slice(4).trim()}:` : mdValue[index].slice(4).trim(),
              tags: [],
              priority: 0,
              details: '',
            };
          }
        }
        if (parsedData[sectionIndex].items_data[itemsDataIndex]) {
          if (mdValue[index].startsWith('tags: ')) {
            const tags = mdValue[index].slice(6).trim().split(/[,]+/);
            tags.forEach((tag) => {
              if (tag !== '') parsedData[sectionIndex].items_data[itemsDataIndex].tags.push(tag);
            });
          }

          if (mdValue[index].startsWith('description: ')) {
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].description = mdValue[index].slice(13).trim();
          }
          if (mdValue[index].startsWith('priority: ')) {
            const priority = mdValue[index].slice(10);
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].priority = priority && priority >= 0 && priority < 3 ? priority : 0;
          }

          if (mdValue[index].trim().startsWith('|')) {
            activeDetailsSection = false;
          }
          if (activeDetailsSection) {
            parsedData[sectionIndex].items_data[itemsDataIndex].details
              += `\n${mdValue[index]}\n`;
          }
          if (mdValue[index].startsWith('details: ')) {
            activeDetailsSection = true;
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].details = `${mdValue[index].slice(9)}\n`;
            if (mdValue[index].endsWith('!') || mdValue[index].endsWith(' |')) {
              activeDetailsSection = false;
            }
          } else if ((mdValue[index].startsWith('details: ') && mdValue[(index + 1)] && mdValue[(index + 1)].startsWith('|'))) {
            activeDetailsSection = true;
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].details = mdValue[index];
            if (mdValue[index].endsWith('|') || mdValue[index].endsWith(' |')) {
              activeDetailsSection = false;
            }
          }
        }
        if (parsedData[sectionIndex] && fullyParsedData.title === '') {
          fullyParsedData.sections_data = parsedData;
          index -= 1;
          return {
            errorMsg: 'Main title can\'t be empty! Type some value after "# "', fullyParsedData, index, isMdValid,
          };
        } if (parsedData[sectionIndex].section_title === '') {
          fullyParsedData.sections_data = parsedData;
          return {
            errorMsg: 'Section title can\'t be empty! Type some value after "## "', fullyParsedData, index, isMdValid,
          };
        } if (
          parsedData[sectionIndex].items_data[itemsDataIndex]
          && parsedData[sectionIndex].items_data[itemsDataIndex].item_title === ''
        ) {
          fullyParsedData.sections_data = parsedData;
          return {
            errorMsg: 'Item title can\'t be empty! Type some value after "### "', fullyParsedData, index, isMdValid,
          };
        } if (
          parsedData[sectionIndex].items_data[itemsDataIndex]
          && parsedData[sectionIndex].items_data[itemsDataIndex].description === ''
        ) {
          if (
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].description.replace(/^\s+|\s+$/gm, '') === ''
          ) {
            fullyParsedData.sections_data = parsedData;
            return {
              errorMsg: 'Enter item description', fullyParsedData, index, isMdValid,
            };
          }
        } else if (mdValue[index].startsWith('# ') && fullyParsedData.title !== '' && !activeDetailsSection) {
          return {
            errorMsg: 'You already have declared checklist title (# )', fullyParsedData, index,
          };
        }
        if (parsedData[sectionIndex] && fullyParsedData.title !== '' && parsedData[sectionIndex].section_title !== '' && parsedData[sectionIndex].items_data[itemsDataIndex]
          && parsedData[sectionIndex].items_data[itemsDataIndex].item_title !== '' && parsedData[sectionIndex].items_data[itemsDataIndex].description && parsedData[sectionIndex].items_data[itemsDataIndex].description !== '') {
          isMdValid = true;
        }
      }
    }
  }
  fullyParsedData.sections_data = parsedData;
  return { fullyParsedData, isMdValid };
}

export { mdParse as default };

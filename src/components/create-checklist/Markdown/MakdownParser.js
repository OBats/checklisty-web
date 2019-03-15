export function mdParse(data) {
  const mdValue = data.split('\n');
  const parsedData = [];
  const fullyParsedData = { title: '', sections_data: [] };
  let sectionIndex = -1;
  let itemsDataIndex = -1;
  let isMdValid = false;
  const errorArr = [];
  let activeDetailsSection = false;

  for (let index = 0; index < mdValue.length; index += 1) {
    if (
      mdValue[index].startsWith('# ')
      || mdValue[index].startsWith('## ')
      || mdValue[index].startsWith('### ')
      || mdValue[index].startsWith('description: ')
      || mdValue[index].startsWith('tags: ')
      || mdValue[index].startsWith('priority: ')
    ) {
      activeDetailsSection = false;
    } else {
      activeDetailsSection = true;
    }

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
            item_title:
              mdValue[index].slice(4).trim() !== ''
                ? `${mdValue[index].slice(4).trim()}:`
                : mdValue[index].slice(4).trim(),
            tags: [],
            priority: 0,
            details: '',
          };
        }

        if (parsedData[sectionIndex].items_data[itemsDataIndex]) {
          if (mdValue[index].startsWith('tags: ')) {
            const tags = mdValue[index]
              .slice(6)
              .trim()
              .split(/[,]+/);
            tags.forEach((tag) => {
              if (tag !== '') {
                parsedData[sectionIndex].items_data[itemsDataIndex].tags.push(
                  tag,
                );
              }
            });
          }

          if (mdValue[index].startsWith('description: ')) {
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].description = mdValue[index].slice(13).trim();
          }
          if (mdValue[index].startsWith('priority: ')) {
            const priority = mdValue[index].slice(10).trim()[0] >= '0'
              && mdValue[index].slice(10).trim()[0] < '3'
              && !mdValue[index].slice(10).trim()[1]
              ? mdValue[index].slice(10).trim()[0]
              : 0;
            parsedData[sectionIndex].items_data[
              itemsDataIndex
            ].priority = priority;
          }
        }
      }

      if (
        activeDetailsSection
        && parsedData[sectionIndex].items_data[itemsDataIndex]
      ) {
        parsedData[sectionIndex].items_data[itemsDataIndex].details += `\n${
          mdValue[index]
        }\n`;
      }

      if (
        parsedData[sectionIndex]
        && fullyParsedData.title !== ''
        && parsedData[sectionIndex].section_title !== ''
        && parsedData[sectionIndex].items_data[itemsDataIndex]
        && parsedData[sectionIndex].items_data[itemsDataIndex].item_title !== ''
      ) {
        isMdValid = true;
      }
    }
  }

  for (let index = 0; index < mdValue.length; index += 1) {
    if (
      mdValue[index].startsWith('# ')
      && mdValue[index].slice(2).trim() === ''
    ) {
      errorArr.push({
        msg: 'Checklist title can\'t be empty! Type some value after "# "',
        indexError: index,
      });
    }
    if (
      mdValue[index].startsWith('## ')
      && mdValue[index].slice(3).trim() === ''
    ) {
      errorArr.push({
        msg: 'Section title can\'t be empty! Type some value after "## "',
        indexError: index,
      });
    }
    if (
      mdValue[index].startsWith('### ')
      && mdValue[index].slice(4).trim() === ''
    ) {
      errorArr.push({
        msg: 'Item title can\'t be empty! Type some value after "### "',
        indexError: index,
      });
    }
  }
  fullyParsedData.sections_data = parsedData;
  return { fullyParsedData, isMdValid, errorArr };
}

export { mdParse as default };

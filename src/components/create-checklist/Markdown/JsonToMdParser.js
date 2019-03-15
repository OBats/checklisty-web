export function jsonToMd(data) {
  let json = `# ${data.title}\n`;
  data.sections_data.map((section) => {
    json += `## ${section.section_title}\n`;
    section.items_data.map((item) => {
      json += `### ${item.item_title}\n`;
      if (item.description) {
        json += `description: ${item.description}\n`;
      }
      if (item.priority) {
        json += `priority: ${item.priority}\n`;
      }
      if (item.tags) {
        json += `tags: ${item.tags.join(', ')}\n`;
      }
      if (item.details) {
        json += `${item.details}\n`;
      }
    });
  });

  return json;
}

export { jsonToMd as default };

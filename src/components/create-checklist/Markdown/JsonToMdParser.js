export function jsonToMd(data) {
  let md = `# ${data.title}\n`;
  data.sections_data.map((section) => {
    md += `\n## ${section.section_title}\n`;
    section.items_data.map((item) => {
      md += `### ${item.item_title}\n`;
      if (item.description) {
        md += `description: ${item.description}\n`;
      }
      if (item.priority || item.priority === 0) {
        md += `priority: ${item.priority}\n`;
      }
      if (item.tags && item.tags.length > 0) {
        md += `tags: ${item.tags.join(', ')}\n`;
      }
      if (item.details) {
        md += `${item.details}\n`;
      }
      return md;
    });
    return md;
  });

  return md;
}

export { jsonToMd as default };

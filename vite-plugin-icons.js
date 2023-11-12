import reactIcons from 'react-icons';

export default {
  name: 'vite-plugin-icons',
  resolveId(id) {
    if (id.startsWith('react-icons/')) {
      return { id: id, external: true };
    }
    return null;
  },
  load(id) {
    if (id.startsWith('react-icons/')) {
      const iconName = id.replace('react-icons/', '');
      return `export { ${iconName} } from 'react-icons/${iconName}';`;
    }
    return null;
  },
};

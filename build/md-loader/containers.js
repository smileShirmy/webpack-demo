const mdContainer = require('markdown-it-container');

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--ava-demo: ${content}:ava-demo-->
        `;
      }
      return '</demo-block>';
    }
  });

  md.use(mdContainer, 'log', {
    validate(params) {
      return params.trim().match(/^log\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^log\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<log-block>
        ${content}
        `;
      }
      return '</log-block>';
    }
  })

  md.use(mdContainer, 'tip');
  md.use(mdContainer, 'warning');
};

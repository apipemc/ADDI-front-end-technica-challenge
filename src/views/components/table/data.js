import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import deepGet from 'utils/deep-get';
import capitalize from 'utils/capitalize';

class Data extends PureComponent {
  static propTypes = {
    // user props
    keyField: PropTypes.string.isRequired,
    column: PropTypes.shape({
      titles: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      ).isRequired,
      paths: PropTypes.arrayOf(PropTypes.string).isRequired,
      renderer: PropTypes.func,
    }).isRequired,

    // table props
    item: PropTypes.shape({}).isRequired,
  };

  renderData() {
    const {
      item,
      keyField,
      column: { titles, paths, renderer },
    } = this.props;

    const content = titles.map((title, idx) => {
      const path = paths[idx];
      const text = deepGet(item, path);

      if (renderer) {
        const Renderer = renderer;
        return (
          <div key={`td-render-${title}-${path}-${item[keyField]}`}>
            <Renderer {...this.props} />
          </div>
        );
      }
      return (
        <div key={`td-text-${title}-${path}-${item[keyField]}`}>
          {capitalize(text)}
        </div>
      );
    });

    return <div className="table__td-content">{content}</div>;
  }

  render() {
    return <td className="table__td">{this.renderData()}</td>;
  }
}

export default Data;

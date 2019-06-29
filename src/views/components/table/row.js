import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Data from './data';

class TableRow extends PureComponent {
  static propTypes = {
    // user props
    keyField: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        titles: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        ),
        paths: PropTypes.arrayOf(PropTypes.string).isRequired,
        formatters: PropTypes.arrayOf(PropTypes.func),
        renderer: PropTypes.func,
      }).isRequired
    ).isRequired,
    activeRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // table props
    item: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    activeRow: null,
  };

  renderColumns() {
    const { item, columns, keyField } = this.props;

    return columns.map(column => (
      <Data
        key={`td-${column.paths.join()}-${item[keyField]}`}
        item={item}
        keyField={keyField}
        column={column}
      />
    ));
  }

  render() {
    const { item, keyField, activeRow } = this.props;

    const classes = classnames('table__tbody-tr', {
      'table__tbody-tr--active': activeRow === item[keyField],
    });

    return <tr className={classes}>{this.renderColumns()}</tr>;
  }
}

export default TableRow;

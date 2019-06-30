import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

import Row from './row';

class Table extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        titles: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        ).isRequired,
        paths: PropTypes.arrayOf(PropTypes.string).isRequired,
        formatters: PropTypes.arrayOf(PropTypes.func),
        renderer: PropTypes.func,
      })
    ),
    keyField: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    keyField: 'id',
    columns: [],
    data: null,
  };

  renderEmptyState = () => {
    const { columns } = this.props;

    return (
      <tbody className="table__tbody">
        <tr className="table__tbody-tr">
          <td colSpan={columns.length} className="table__td">
            {'No elements'}
          </td>
        </tr>
      </tbody>
    );
  };

  renderLoading = () => {
    const { columns } = this.props;

    return (
      <tbody className="table__tbody">
        <tr className="table__tbody-tr">
          <td colSpan={columns.length} className="table__td">
            <ClipLoader />
          </td>
        </tr>
      </tbody>
    );
  };

  renderTableBody = () => {
    const { columns, data, keyField, loading } = this.props;

    if (!data || loading) {
      return this.renderLoading();
    }

    if (data.length <= 0) {
      return this.renderEmptyState();
    }

    const rows = data.map(item => (
      <Row
        key={`tr-${item[keyField]}`}
        item={item}
        keyField={keyField}
        columns={columns}
      />
    ));

    return <tbody className="table__tbody">{rows}</tbody>;
  };

  renderTableHeader = () => {
    const { columns } = this.props;

    const width = 100 / columns.length;
    const style = {
      width: `${width}%`,
    };

    const headers = columns.map(header => {
      const [title] = header.titles;

      return (
        <th
          key={`th-${header.paths.join()}`}
          scope="col"
          style={style}
          className="table__th--col"
        >
          {title}
        </th>
      );
    });

    return (
      <thead className="table__thead">
        <tr className="table__thead-tr">{headers}</tr>
      </thead>
    );
  };

  render() {
    return (
      <table className="table">
        {this.renderTableHeader()}
        {this.renderTableBody()}
      </table>
    );
  }
}

export default Table;

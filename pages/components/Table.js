import styles from './Table.module.css';
import formatter from '../../helperFunctions/formatter';

const Table = ({ className, data = [], columns = [] }) => {
  let tableClassName = styles.table;

  if (className) {
    tableClassName = `${tableClassName} ${className}`;
  }

  const rows = [...new Array(data.length)].map((item, index) => {
    return columns.map(({ columnId }) => data[index][columnId]);
  });

  console.log(data);

  return (
    <>
      {data.length <= 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className={tableClassName}>
          <thead>
            <tr>
              {columns.map(({ columnId, Header }) => {
                return <td key={columnId}>{Header}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((cell, index) => {
                    if (typeof cell === 'number') {
                      return <td key={index}>{formatter.format(cell)}</td>;
                    } else {
                      return <td key={index}>{cell}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
